import React from "react";
import Button from "../../components/button/button";
import Articlecard from "../../components/Articlecard/articlecard";
import "./profile.css";
import { useState } from "react";
import profile_img2 from "../../images/image2.jpg";
import Topbar from "../../components/Topbar/topbar";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { useQuery } from "react-query";
import { Logout, fetchUserData, fetchuserArticles } from "../../api";
import { useDispatch } from "react-redux";
import { logout } from "../../features/users";
import FollowerList from "../../components/Modals/Follow-modal/FollowerList"
import { useLocation } from "react-router-dom";
import EditModal from "../../components/Modals/editprofile/Editprofile";
import Loading from "../../components/Modals/loadingmodal/loading";

const Profile = () => 
{
    const userdatastring= localStorage.getItem("user");
    const user = JSON.parse(userdatastring);
    const location = useLocation();
    const userProfileId = location.pathname.split("/")[2];
    const rightUser = user._id === userProfileId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [img, setImg] = useState(null);
    const dispatch = useDispatch();
    const [on, setOn] = useState(false);

    // const handleImg = (e) =>{
    //     setImg(e.target.value);
    // }

    const {data: userDataQuery, error: usererror, isLoading: userisloading} = useQuery(["userdata", userProfileId], () =>fetchUserData(userProfileId), { 
      enabled: userProfileId !== undefined});
    const {data: userArticleQuery, error: userArticleerror, isLoading: userarticleisloading} = useQuery(["userArticle", userProfileId], () =>fetchuserArticles(userProfileId), {
      enabled: userProfileId !== undefined});

    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);


  const handleLogout = () => {
    dispatch(logout());
    Logout();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //// submition logic control section


  //   closeModal(); // Close the modal after form submission
  // };


  const followers = [
    { id: 1, name: "Follower 1", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 2, name: "Follower 2", photo: "https://si-interactive.s3.amazonaws.com/prod/planadviser-com/wp-content/uploads/2023/09/01112809/PAPS-090123-People-Moves_Mark_Higgins-400px-web.jpg" },
    { id: 3, name: "Follower 3", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 4, name: "Follower 4", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 5, name: "Follower 5", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 6, name: "Follower 6", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 7, name: "Follower 7", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 8, name: "Follower 8", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 9, name: "Follower 9", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
  ];

  const following = [
    { id: 1, name: "Following 1", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 2, name: "Following 2", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 3, name: "Following 3", photo: "https://si-interactive.s3.amazonaws.com/prod/planadviser-com/wp-content/uploads/2023/09/01112809/PAPS-090123-People-Moves_Mark_Higgins-400px-web.jpg" },
    { id: 4, name: "Following 4", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 5, name: "Following 5", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 6, name: "Following 6", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
    { id: 7, name: "Following 7", photo: "https://esbenoxholm.dk/wp-content/uploads/2016/08/Profile4_400px.jpg" },
  ];

  if (userisloading || userarticleisloading)
  {
    return <Loading />;
  }

  return (
    <>
      <div id="profile_page">
        <Topbar logoutClick={handleLogout} profile={true} profilepic={userDataQuery.profilePicture}/>
        <div className="profile_first_half">
          <div className="profile_img">
            {userDataQuery.profilePicture ? <img src={`data:image/png;base64,${userDataQuery.profilePicture}`} alt="profile" /> :
            <img src={profile_img2} alt="profile" />
            }
            <CiCamera className="profile_img_update" />
          
          </div>
          <h2>{userDataQuery.username}</h2>
          <ul>
            <li>
              <span>{userDataQuery.following} following</span>
              <button className="modal-button" onClick={() => setShowFollowingModal(!showFollowingModal)}>
                <IoMdArrowDropdown className="icon hvr-sink" />
              </button>
            </li>
            <li>
            <span>{userDataQuery.followers} followers</span>
              <button className="modal-button" onClick={() => setShowFollowersModal(!showFollowersModal)}>
                <IoMdArrowDropdown className="icon hvr-sink" />
              </button>
            </li>
            <li>{userArticleQuery.length} contributed articles</li>
            {rightUser && <li className="profile_edit_btn" onClick={openModal} >
              <span>Edit profile</span>
            </li>}
          </ul>
          {!rightUser && <Button name={"Follow"} />}
        </div>
        <EditModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}    
        />
        <div className="profile_second_half">
          <div className="profile_toggle_row">
            <button className={on ? "not_clicked" : "clicked"} onClick={() => setOn(false)}>
              ARTICLES
            </button>
            {rightUser && <button className={on ? "clicked" : "not_clicked"} onClick={() => setOn(true)}>
              SAVED
            </button>}
          </div>

          {on ? (
            <div className="profile_art_contain">
              {userDataQuery.savedArticles && userDataQuery.length > 0 ?
                userDataQuery.savedArticles.map((data) => <Articlecard key={data.id} articles={data} />) :
                (<p className="profile_no_data">You have no saved posts</p>)
              }
            </div>
          ) : (
            <div className="profile_art_contain">
              {userArticleQuery && userArticleQuery.length > 0 ?
                userArticleQuery.map((data) => <Articlecard key={data.id} articles={data} />) :
                (<p className="profile_no_data">No articles contributed yet.. visit write to start writting</p>)
                }
            </div>
          )}
        </div>

        {showFollowersModal && (
      <div className="modal">
        <div className="modal-content">
        <FollowerList
            title="Followers"
            followers={followers}
            buttonText="remove"
            onClose={() => setShowFollowersModal(false)}
          />
        </div>
      </div>
        )}

        {showFollowingModal && (
        <div className="modal">
            <div className="modal-content">
            <FollowerList
            title="Following"
            followers={following}
            buttonText="Following"
            onClose={() => setShowFollowingModal(false)}
          />
            </div>
        </div>
        )}
      </div>
    </>
  );
};

export default Profile;
