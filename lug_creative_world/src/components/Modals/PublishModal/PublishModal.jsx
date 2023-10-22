import React, { useEffect, useMemo, useState } from 'react';
import { GiCancel } from "react-icons/gi";
import "./PublishModal.css";
import { sendPostData, updateArticle } from "../../../api";

const PublishModal = (props) => {
  const [descPhoto, setPhoto] = useState(null); 
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
    setIsPhotoSelected(true);
  };
  const {title, body, description, author, timeTakenToReadPost, categories, authorId} = props.transfer1;
  
  const formData = useMemo(() => {
    const data = new FormData();
    data.append("title", title);
    data.append("descPhoto", descPhoto);
    data.append("body", body);
    data.append("author", author);
    data.append("authorId", authorId);
    data.append("timeTakenToReadPost", timeTakenToReadPost);
    data.append("description", description);
    data.append("categories", categories);
    return data;
  }, [title, body, description, author, timeTakenToReadPost, categories, authorId, descPhoto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect form data and pass it to the onProceed function
    if (title && body && description) {
      if (props.transfer2.isUpdate) {
        updateArticle(props.transfer2.id, formData);
      } else {
        sendPostData(formData);
      }
    // Call the onProceed function with the form data
    // onProceed(formData);
    // Close the modal
    props.onClose();
  };
  }
  return (
    <div className="publish-modal">
      <div className="modal-content">
        <div className="publish-top">
          <h4>{author} is publishing</h4>
          <button className="cancel-button" onClick={props.onClose}>
            <GiCancel />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <textarea 
            className='area'
              value={description}
              onChange={props.handleDescChange}
              required
              placeholder='Make your post a magnet for readers! Just drop in a quick, captivating description (50-150 words) to draw them into your world effortlessly.'
            />
          </label>

          <label>
            <select className="box"
              value={categories}
              onChange={props.handleCatChange}
              required
            >
              <option value="">Pick your preferable categories</option>
              <option value="Programming">Programming</option>
              <option value="Drama">Drama</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health and wellness">Health and wellness</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Career and Business">Career and Business</option>
              <option value="Science and nature">Science and nature</option>
              <option value="Arts and culture">Arts and culture</option>
              <option value="Hobbies and Interests">Hobbies and Interests</option>
              <option value="Sports">Sports</option>
              <option value="Inspiration and motivation">Inspiration and motivation</option>
              <option value="Technology">Technology</option>
            </select>
          </label>
          <div className='label'>
             <h4> specify the reading time of your article</h4>
            <input type="number" name="timetaken" id="timetaken" value={timeTakenToReadPost} onChange={props.handleTimeTaken}/>
          </div>
          <div className="articlePhotoHandle">

            <label className="file-input-label">
              <h4>{isPhotoSelected ? 'Update Photo' : 'Add Photo'}</h4>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handlePhotoChange}
                />
            </label>
            {descPhoto && (
              <img
              src={URL.createObjectURL(descPhoto)}
              alt="Selected"
              className="articlePhotoPreview"
              />
              )}

          </div>
        
           <div className="proceed-button-container">
            <button type="submit" className="proceed-button">
              Proceed
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default PublishModal;

