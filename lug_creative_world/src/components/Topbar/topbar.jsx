import React, { useEffect, useState } from "react";
import "./topbar.css";
import image1 from "../../images/image1.png";
import image2 from "../../images/profilevactor.jpg";
import { IoBookOutline } from "react-icons/io5";
// import { IoIosNotifications } from "react-icons/io";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchUserData } from "../../api";
import { useDispatch } from "react-redux";
import { updateTheme } from "../../features/theme";

export default function Topbar(props) {
  const [userinfo, setUserInfo] = useState({});
  const [dark, setdarkMode] = useState(false);

  const dispach = useDispatch();
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

// taking care of changing themes

const handleBgChange = () =>{
  if(dark){
    dispach(updateTheme(dark));
  }else {
    dispach(updateTheme(dark));
  }
}

function handleThemeClick(){
  setdarkMode(!dark);
  handleBgChange();
}

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
            {/* <div className="notification">
              <IoIosNotifications className="notification-icon hvr-pulse-shrink" />
              <span>5</span>
            </div> */}
            <div className="bg__change">
                <input type="checkbox" className="checkbox" onClick={handleThemeClick}/>
                <label for="checkbox" className="checkbox__label">
                    <FaSun className="fa-sun" />
                    <FaMoon className="fa-moon"/>
                    <span class="check__ball"></span>
                </label>
            </div> 
          </li>
          {!props.profile ? (
          <li>
            <Link to={`/profile/${user._id}`}>
             { !userinfo.profilePicture ? (<img className="img4" src={image2} alt="" />) :
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
