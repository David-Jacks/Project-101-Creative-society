import React, { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import "./comment.css";
import profile_img from "../../../images/profilevactor.jpg";
import { fetchUserData, getComments, postComment } from "../../../api";
import Commentbox from "../../comment/commentbox";

const CommentModal = (props) => {
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user);
  const [commentText, setCommenttext] = useState("");
  const [comments, setComments] = useState([]);
  const [showlargeinput, setShowLargeInput] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function getUserCommenting() {
      const ans = await fetchUserData(userObject._id);
      setUserDetails(ans);
    }
    getUserCommenting();

    async function getAllComments() {
      const ans = await getComments(props.articleid);
      props.setCommentsCount(ans.length);
      setComments(ans);
    }

    getAllComments();
  }, [commentText]);
  console.log(comments.length);
  // getting number of comments

  // handling onchange and keeping comment text
  const handlecomment = (e) => {
    setCommenttext(e.target.value);
  };
  const formData = { commentText };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentText) {
      setShowLargeInput(false);
      // handle commenting post api
      const ans = await postComment(props.articleid, formData);
    }
    // props.onClose();
  };

  function handleInputClick() {
    setShowLargeInput(true);
  }
  // if (isloading){
  //   return (<Loading />);
  // }
  return (
    <div className="comment_modal">
      <div className="modal_content">
        <div className="comment_top">
          <h4>{userDetails.username} is commenting</h4>
          <button className="comment_cancel_button" onClick={props.onClose}>
            <GiCancel />
          </button>
        </div>
        {!showlargeinput && (
          <input
            type="text"
            onClick={handleInputClick}
            name=""
            id="inputclick"
            placeholder="pin down your opinions"
          />
        )}
        {
          <form
            className={`comment_form ${showlargeinput ? "active" : ""}`}
            onSubmit={handleSubmit}
          >
            <div className="comment_owner_profile">
              {userDetails.profilePicture ? (
                <img
                  src={`data:image/png;base64,${userDetails.profilePicture}`}
                  alt="profile"
                />
              ) : (
                <img src={profile_img} alt="default_profile" />
              )}
              <span>{userDetails.username}</span>
            </div>
            <textarea
              className="comment_area"
              value={commentText}
              onChange={handlecomment}
              required
              placeholder="pin down your opinions"
            />

            <div className="comment_bottom_container">
              <span
                onClick={() => {
                  setShowLargeInput(false);
                }}
              >
                Cancel
              </span>
              <button type="submit" className="comment_button">
                comment
              </button>
            </div>
          </form>
        }

        {comments &&
          comments.map((val) => (
            <Commentbox key={val._id} comment={val} postid={props.articleid} />
          ))}
      </div>
    </div>
  );
};

export default CommentModal;
