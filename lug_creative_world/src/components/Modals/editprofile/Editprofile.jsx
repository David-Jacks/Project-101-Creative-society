import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import "./Editprofile.css";
import { uploadProfileImage } from "../../../api";

const EditModal = (props) =>{
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [username, setUsername] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
  
  let imgUrl = "";
  const profileUpdateData = { username, photo };

    const handlePhotoChange = (e) => {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      setIsPhotoSelected(true);
    };
    
    const handlePhoto = async(e) => {
      e.preventDefault();
      if(photo)
      {
        imgUrl = await uploadProfileImage(photo);
      }
      profileUpdateData.photo = imgUrl;

      props.onClose();
      window.location.reload();
    };
    const handleSubmit = async(e)=>{
      e.preventDefault();
      props.onClose();
    }
    // rendering profile picture component
    if (props.isprofilepic){
      return(<>
      <div className="edit_profile_modal">
      <div className="modal_content_editprofile">
        <div className="edit_profile_top">
          <h4>{props.userDataQuery.username} is editing his profile</h4>
          <button className="comment_cancel_button" onClick={props.onClose} >
            <GiCancel />
          </button>
        </div>
        <form className="edit_profile_form profile_pic_form" onSubmit={handlePhoto}>
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
      </div>
      </div>
      </>);
    }
    // rendering profile edit commponents excluding profile picture
    return(
    <>
    <div className="edit_profile_modal">
      <div className="modal_content_editprofile">
      <div className="edit_profile_top">
          <h4>{props.userDataQuery.username} is editing his profile</h4>
          <button className="comment_cancel_button" onClick={props.onClose} >
            <GiCancel />
          </button>
        </div>
        <form className="edit_profile_form" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="username" 
                  onChange={(e)=>{setUsername(e.target.value)}}
                  placeholder="Username"
                />
                <input type="text" placeholder="Firstname"/>
                <input type="text" placeholder="Lastname"/>
                <input type="email" placeholder="Email"/>
                <select name="year_select" id="">
                  <option value="">select level</option>
                  <option value="foundation">foundation</option>
                  <option value="year 1">year 1</option>
                  <option value="year 2">year 2</option>
                  <option value="year 3">year 3 </option>
                </select>
                <select name="program_select" id="">
                  <option value="">select program</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Law">Law</option>
                  <option value="Business Management">Business Management</option>
                  <option value="Accounting">Accounting</option>
                  <option value="International Relations">International Relations</option>
                </select>
            
            <button type="submit">Update</button>
        </form>
      </div>
    </div>
    </>);
}

export default EditModal;