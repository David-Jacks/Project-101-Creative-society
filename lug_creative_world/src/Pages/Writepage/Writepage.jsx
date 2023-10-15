import React, { useEffect, useRef, useState } from "react";
import "./writepage.css";
import "react-quill/dist/quill.snow.css";
import Topbar from "../../components/Topbar/topbar";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { preview, update } from "../../features/article";
import Articletext from "../../components/Articletext/articletext";
import { fetchUserData } from "../../api";
import PublishModal from "../../components/Modals/PublishModal/PublishModal"

const Writepage = () => {
  
  const articleUpdateData = useSelector((state)=>state.article.value);
  const QuillRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setHeading] = useState(articleUpdateData.title);
  const [description, setDesc] = useState(articleUpdateData.description);
  const [body, setText] = useState(articleUpdateData.body);
  const [timeTakenToReadPost, settimeTakenToReadPost] = useState(articleUpdateData.timeTakenToReadPost);
  const [categories, setcategories] = useState("Programming");
  const [reviewed, setReviewed] = useState(true);
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);


  const userdatastring= localStorage.getItem("user");//getting user info from the localstorage
  const user = JSON.parse(userdatastring);
  useEffect(()=>{
    const fetchUser = async()=>
    { 
        const userInfo = await fetchUserData(user._id);
        setUserData(userInfo);
    }

    fetchUser();
},[])

  const author = userData.username;
  const authorId = userData._id;

  const articleData = {title, body, author, description, timeTakenToReadPost, categories, authorId};
  
  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleTimeTaken = (e) => {
    settimeTakenToReadPost(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleCatChange = (e) => {
    setcategories(e.target.value);
  };
  const handleSave = () => {
    navigate("/profile");
  };

  const openModal = () => {
    if (title && body){
      setIsModalOpen(true);
    }
  };


  const handleReview = () => {
    dispatch(preview({body, title, isUpdate: articleUpdateData.isUpdate}));
    if (reviewed)
    {
      setReviewed(!reviewed);
    } else 
     {
      setReviewed(!reviewed);
     } 

  };

  const handleCustomUndo = () => {
    const quill = QuillRef.current.editor; // Get the Quill editor instance
    quill.history.undo(); // Trigger the undo action
  };

  const handleCustomRedo = () => {
    const quill = QuillRef.current.editor; // Get the Quill editor instance
    quill.history.redo(); // Trigger the undo action
  };

  return (
    <section className="writepage">
      <Topbar
        publishClick={openModal}
        showButton={true}
        showText={true}
        logoText={`Drafted by ${author}`}
      />
      <div className="writediv">
        <div id="toolbar">
                    {<button className="button-click " onClick={handleSave}>Draft</button>}
                    {reviewed && <button className="button-click " onClick={handleCustomRedo}>redo</button>}
                    {reviewed && <button className="button-click " onClick={handleCustomUndo}>undo</button>}
                    <button className="button-click" onClick={handleReview}> {reviewed ? "Preview": "back"}</button>
        </div>
        {reviewed ? (  
          <div className="Editor_container">
                <div className="article-write-header">
                  <textarea name="header" id="header" placeholder="Write your tittle" value={title} onChange={handleHeadingChange} required>
                  </textarea>
                </div>
              
                <ReactQuill theme="snow"
                placeholder="Write your best..."
                modules={Writepage.modules}
                onChange={setText}
                value={body}
                formats={Writepage.formats}
                ref={QuillRef}
                />    
        </div>)
        :
        (
          <div className="preview">
            <div className="preview_head">
              <h1>{title}</h1>
            </div>
          <Articletext body={body}/>
          </div>
        )
        }
        {isModalOpen && (
        <PublishModal
          handleCatChange={handleCatChange}
          handleDescChange={handleDescChange}
          handleTimeTaken={handleTimeTaken}
          onClose={() => setIsModalOpen(false)}
          transfer1={articleData}
          transfer2={articleUpdateData}
        />
      )}
      </div>
    </section>
  );
};

Writepage.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }], [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'align': [] }, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    [{'color': [] }, { 'background': [] }],
    ['clean']
  ],
  history: {
    delay: 2000, // Optional delay in milliseconds (default is 1000ms or 1 second)
    maxStack: 500, // Optional maximum undo/redo stack size (default is unlimited)
    userOnly: true, // Optional, restricts undo/redo to changes made by the current user
  }
};

Writepage.formats = [
  'header',
  'bold', 'italic', 'underline', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'font',
  'align', 'color', 'background', 'undo', 'redo'
]
export default Writepage;
