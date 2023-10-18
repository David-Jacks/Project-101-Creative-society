import "./commentbox.css";
import profilephoto from "../../images/image2.jpg";
import {AiFillLike} from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import {FaFlag, FaRegSave} from "react-icons/fa";
import { useState } from "react";
import moment from "moment";
import { delComment } from "../../api";

const Commentbox = ({comment, postid}) =>{
    const [showDrop, setShowDrop] = useState(false);

    const handleDrop = () =>{
        setShowDrop(!showDrop);
    }
    const handleDelete = async() =>{
        const ans = await delComment(postid, comment._id);
        console.log(ans);
    }
    return(<>
    <div id="comment_box">
        <div className="comment_box_head">
            <div className="comment_profile_contain">
                <img src={profilephoto} alt="profile" />
                <div className="profile_data">
                    <span>{comment.user.username}</span>
                    <span>{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
            <div className="drop_down_comment">
            {<BsThreeDots className="icon" onClick={handleDrop}/>}
            <ul className={`drop ${showDrop ? "showdrop" : ""}`}>
                <li onClick={handleDelete}>Delete</li>
                <li>Edit</li>
            </ul>
            </div>
        </div>
        <div className="comment_box_message">
            <p>{comment.commentText}</p>
        </div>
        <div className="comment_box_reactions">
            <div className="comment_icons">
                <BiLike className="icon" />
                <span>10</span>
            </div>
            {/* <span>reply</span> */}
        </div>
    </div>
    </>);
}

export default Commentbox;