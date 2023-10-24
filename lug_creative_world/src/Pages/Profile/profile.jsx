import React, { memo, useCallback } from "react";
import Articlecard from "../../components/Articlecard/articlecard";
import "./profile.css";
import { useState } from "react";
import profile_img2 from "../../images/profilevactor.jpg";
import Topbar from "../../components/Topbar/topbar";
import { CiCamera } from "react-icons/ci";
import { useQuery } from "react-query";
import { Logout, fetchUserData, fetchuserArticles } from "../../api";
import { useDispatch } from "react-redux";
import { logout } from "../../features/users";
import { useLocation } from "react-router-dom";
import EditModal from "../../components/Modals/editprofile/Editprofile";
import Loading from "../../components/Modals/loadingmodal/loading";

const Profile = memo(() => 
{
    const userdatastring= localStorage.getItem("user");
    const user = JSON.parse(userdatastring);
    const location = useLocation();
    const userProfileId = location.pathname.split("/")[2];
    const rightUser = user._id === userProfileId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isprofilepic, setIsprofilepic] = useState(false);
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


  const handleLogout = useCallback(() => {
    dispatch(logout());
    Logout();
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsprofilepic(false);
  };

  const handleProfilePic = () => {
    setIsModalOpen(true);
    setIsprofilepic(true);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //// submition logic control section


  //   closeModal(); // Close the modal after form submission
  // };




  if (userisloading || userarticleisloading)
  {
    return <Loading />;
  }

  return (
    <>
      <div id="profile_page">
        <Topbar 
        logoutClick={handleLogout} 
        profile={true} 
        profilepic={userDataQuery.profilePicture}
        />
        <div className="profile_first_half">
          <div className="profile_img">
            {userDataQuery.profilePicture ? <img src={`data:image/png;base64,${userDataQuery.profilePicture}`} alt="profile" /> :
            <img src={profile_img2} alt="profile" />
            }
            {rightUser && <CiCamera className="profile_img_update" onClick={handleProfilePic}/>}
          
          </div>
            <h2>{userDataQuery.username}</h2>
          <ul>
            <li>{userArticleQuery.length} contributed articles</li>
            {rightUser && <li className="profile_edit_btn" onClick={openModal}>
              <span onClick={openModal}>Edit profile</span>
            </li>}
          </ul>
        </div>
        {isModalOpen && <EditModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} 
            userDataQuery = {userDataQuery}  
            isprofilepic = {isprofilepic} 
        />}
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
              {userDataQuery.savedArticles && userDataQuery.savedArticles.length > 0 ?
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

      </div>
    </>
  );
});

export default Profile;
