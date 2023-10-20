import React, { useEffect, useState } from "react";
import "./topbar.css";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.jpg";
import { IoBookOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { fetchUserData } from "../../api";

export default function Topbar(props) {
  const [userinfo, setUserInfo] = useState({});

  // css classes specification
  const topbarClasses = [
    "topbar",
    props.showBottomBoxShadow ? "bottom-box-shadow" : "",
  ].join(" ");

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  useEffect(()=>{
    const userDataFromBackend = async() =>{
      const ans = await fetchUserData(user._id);
      setUserInfo(ans);
    }

    userDataFromBackend();
  },[user._id])

  return (
    <section className={topbarClasses}>
      <div className="container">
        <div className="logo-1">
          <Link to="/dashboard">
            <img className="img1" src={image1} alt="lancaster-logo" />
          </Link>
          {props.showText && (
            <span className="logo-text">{props.logoText}</span>
          )}
        </div>
        <ul className="navbar">
          {props.showButton ? (
            <li>
              <button className="publish-button hvr-wobble-top" onClick={props.publishClick}>Publish</button>
            </li>
          ) : (
            <li>
              <Link to="/writepage" className="write">
                <IoBookOutline className="write_icon" />
                <span className="write_link hvr-wobble-top">Write</span>
              </Link>
            </li>
          )}
          <li>
            <div className="notification">
              <IoIosNotifications className="notification-icon hvr-pulse-shrink" />
              <span>5</span>
            </div>
          </li>
          {!props.profile ? (
          <li>
            <Link to={`/profile/${user._id}`}>
             { !user.profilePicture ? (<img className="img4" src={image2} alt="" />) :
              (<img className="img4" src={`data:image/png;base64,${userinfo.profilePicture}`} alt="" />)
          }
            </Link>
          </li>) : ( 
          <li>
            <Link to="/">
              <button className="publish-button hvr-wobble-top" onClick={props.logoutClick}>Logout</button>
            </Link>
          </li>)
          }
        </ul>
      </div>
    </section>
  );
}
