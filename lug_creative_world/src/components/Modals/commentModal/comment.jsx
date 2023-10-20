import React, { useEffect, useState } from 'react';
import { GiCancel } from "react-icons/gi";
import "./comment.css";
import profilephoto from "../../../images/image2.jpg";
import { getComments, postComment } from "../../../api";
import Commentbox from '../../comment/commentbox';
import { useQuery } from 'react-query';
import Loading from '../loadingmodal/loading';


const CommentModal = (props) => {
  const [commentText, setCommenttext] = useState("");
  const [showlargeinput, setShowLargeInput] = useState(false);
  
  const {data, isloading, error} = useQuery(["commentData", props.articleid],()=> getComments(props.articleid),  { 
    enabled: props.articleid !== undefined});
    
    // useEffect(()=>{
    //   props.getComments(data);
    // },[props, data])

  const handlecomment = (e) => {
    setCommenttext(e.target.value);
  };
  const formData = {commentText};

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (commentText){
      // handle commenting post api
      const ans = await postComment(props.articleid, formData);
      console.log(ans);
    }
    props.onClose();
  };

  function handleInputClick(){
    setShowLargeInput(true);
  }
  if (isloading)
    return (<Loading />);
  return (
    <div className="comment_modal">
      <div className="modal_content">
        <div className="comment_top">
          <h4>{props.article.author} is commenting</h4>
          <button className="comment_cancel_button" onClick={props.onClose}>
            <GiCancel />
          </button>
        </div>
        {!showlargeinput && <input type="text" onClick={handleInputClick} name="" id="inputclick" placeholder="pin down your opinions"/>}
        {<form className={`comment_form ${showlargeinput ? "active" : ""}`} onSubmit={handleSubmit}>
          <div className="comment_owner_profile">
            <img src={profilephoto} alt="profile" />
            <span>{props.article.author}</span>
          </div>
            <textarea 
              className="comment_area"
              value={commentText}
              onChange={handlecomment}
              required
              placeholder="pin down your opinions"
            />
        
           <div className="comment_bottom_container">

                <span onClick={()=>{setShowLargeInput(false)}}>Cancel</span>
                <button type="submit" className="comment_button">
                    comment
                </button>
            </div>
        </form>}

        {data && data.map((val)=>(<Commentbox key={val._id} comment={val} postid={props.articleid}/>))}
      </div>
    </div>
  );
};

export default CommentModal;

