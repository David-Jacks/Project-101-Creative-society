import { useState } from "react";
import Modal from "react-modal";
import Button from "../../button/button";
import "./Editprofile.css";
import { profileUpdate, uploadProfileImage } from "../../../api";

const EditModal = (props) =>{
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [username, setUsername] = useState("");
  
  let imgUrl = ""
  const profileUpdateData = { username, photo };

    const handlePhotoChange = (e) => {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      setIsPhotoSelected(true);
    }; 
    // const getFileExtension = (filename) => {
    //   return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    // };
    
    // const getImageMimeType = (extension) => {
    //   switch (extension) {
    //     case "jpg":
    //     case "jpeg":
    //       return "image/jpeg";
    //     case "png":
    //       return "image/png";
    //     case "gif":
    //       return "image/gif";
    //     // Add more cases for other file types if needed
    //     default:
    //       return "image/png"; // Default to PNG if the file type is unknown
    //   }
    // };

    // const fileExtension = getFileExtension(photo);
    // const imageMimeType = getImageMimeType(fileExtension);
    
    console.log(photo);
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(photo)
      {
        imgUrl = await uploadProfileImage(photo);
      }
      console.log(imgUrl);
      profileUpdateData.photo = imgUrl;
      console.log(profileUpdateData);
      // profileUpdate(profileUpdateData);/

      props.onClose();
    };

      
    return(
    <>
    <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="Edit profile"
        className="custom-modal"
    >
        <form className="edit_profile_form" onSubmit={handleSubmit}>
            <h2>Update your profile</h2>
                <input 
                  type="text" 
                  name="username" 
                  onChange={(e)=>{setUsername(e.target.value)}}
                  placeholder="Enter Username"
                />
            <label htmlFor="profileimg">
            <h4>{isPhotoSelected ? "Update Photo" : "Add Photo"}</h4>
                <input 
                  id="profileimg"
                  type="file" 
                  name="file" 
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
            </label>
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Selected"
                className="profile_edit_img"
              />
            )}
            
            <button type="submit">Update</button>
        </form>
    </Modal>
    </>);
}

export default EditModal;