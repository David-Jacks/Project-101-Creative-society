import React from "react";
import { GiCancel } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import "./Followerlist.css"

const FollowerList = ({ title, followers, buttonText, onClose }) => {
  return (
    <div className="follower-list">
      <div className="follower-top">
        <h4>{title}</h4>
        <button className="cancel-button" onClick={onClose}>
          <GiCancel />
        </button>
      </div>
      <div className="search-container">
      <input className="search" type="text" name="" id="" placeholder="Search" />
      <div className="search-icon"><BiSearch/></div>
      </div>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <img className="follower-photo" src={follower.photo} alt={follower.name} />
            {follower.name}
            <button className="follow-button">{buttonText}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerList;
