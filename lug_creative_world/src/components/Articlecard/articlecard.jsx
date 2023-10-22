import "./articlecard.css";
import { FaRegSave, FaShareSquare} from "react-icons/fa";
import { BiSolidEditAlt, BiLike } from "react-icons/bi";
import {MdDeleteForever} from "react-icons/md";
import {AiFillLike} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import profile_img from "../../images/profilevactor.jpg";
import article_img from "../../images/articlepic.jpg";
import { deleteArticle, getLikes, handleLikeClick, saveArticle} from "../../api";
import { useDispatch } from "react-redux/";
import { update } from "../../features/article";


const Articlecard = ({articles}) =>
{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userdatastring= localStorage.getItem("user");
    const user = JSON.parse(userdatastring);
    const rightUser = user._id === articles.authorId;
    // const [likeData, setLikeData] = useState({});
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [flagged, setFlaged] = useState("Not Flagged");

    useEffect(()=>{
        if (articles._id !== undefined) {
            const fetchData = async () => {
                try {
                const likesData = await getLikes(articles._id);
                
                setLikes(likesData.likes);
                setLiked(likesData.liked);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
        }
    },[articles._id]);

    async function handleLikes()
    {
     
            if (liked)
            {
                setLikes(likes - 1);
                setLiked(!liked);
            } else {
                setLikes(likes + 1);
                setLiked(!liked);
            }
            
            const ans = await handleLikeClick(articles._id);
            setLiked(ans.liked);
            setLikes(ans.likes);
    
    }

     function handleDelete()
    {
        deleteArticle(articles._id);
    }

    function handleSave()
    {
        saveArticle(articles._id);
    }

    function handleUpdate()
    {
        dispatch(update({ id: articles._id, title: articles.title, body: articles.body, timeTakenToReadPost: articles.timeTakenToReadPost , description: articles.description, categories: articles.categories[0], isUpdate: true}));
        navigate("/writepage");
    }

    function handleFlagg()
    {
        if (flagged === "Flagged")
            setFlaged("Not Flagged");
        else if (flagged === "Not Flagged")
            setFlaged("Flagged");
    }
    return (
        <>
            <div className="article_post">
            <div id="article_card_wrapper">

                <div className="article_card_about">
                    <ul>
                        <Link to={`/profile/${articles.authorId}` } className="article_card_linker">
                            <li>{articles.authorProfilePic ?<img src={`data:image/png;base64,${articles.authorProfilePic}`} alt="" /> :
                            <img src={profile_img} alt="profile" />
                            } <span>{articles.author}</span>
                            </li>
                        </Link>
                        <li>{new Date(articles.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</li>
                        <li className="show_on">
                            {articles.timeTakenToReadPost} min read  
                        </li>
                        <li className="show_on">
                            {flagged}
                        </li>
                    </ul>
                </div>
                <div className="article_card_mid">
                    <div className="letter_part">
                        <Link className="article_card_linker" to={`/article/${articles._id}`}>
                            <h2>{articles.title}</h2>
                        </Link>
                        <p>{articles.description}</p>                  
                    </div>
                    <div className="img_part">
                        {!articles.descPhoto ? <img src={article_img} alt="article_img" /> :
                        <img src={`data:image/png;base64,${articles.descPhoto}`} alt="article_img" />}
                    </div>
                </div>
                <div className="article_reactions">
                    <ul>
                        <li>
                            <span className="card_topic">{articles.categories[0]}</span>
                        </li>
                        <li>
                            <span className="show_of">{articles.timeTakenToReadPost} min read</span>   
                        </li>
                        <li>
                            <span className="show_of">{flagged}</span> 
                        </li>
                        <li>{likes} likes</li>
                    </ul>
                    <ul>
                        {<a href="/"><FaShareSquare className="article_card_icons hvr-float-shadow"/></a>  }
                        {liked ? (<li><AiFillLike onClick={handleLikes} className="article_card_icons hvr-float-shadow"/></li>): (<li><BiLike onClick={handleLikes} className="article_card_icons hvr-float-shadow"/></li>)}
                        {!rightUser && <li><FaRegSave onClick={handleSave} className="article_card_icons hvr-float-shadow"/></li>}
                        {rightUser && <li><MdDeleteForever onClick={handleDelete} className="article_card_icons hvr-float-shadow"/></li>}
                        {rightUser && <li><BiSolidEditAlt onClick={handleUpdate} className="article_card_icons hvr-float-shadow"/></li>}
                    </ul>
                  
                </div>
            </div>
            </div>
           
        </>
    );
}

export default Articlecard