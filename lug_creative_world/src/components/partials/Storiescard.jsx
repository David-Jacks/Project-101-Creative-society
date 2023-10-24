import React from "react";
import "./Storiescard.css";
import image2 from "../../../src/images/profilevactor.jpg";

export default function Storiescard(props) {
  return (
    <div className="storiescard">
      <div className="card-div">
        <div className={`card${props.second ? "_second" : ""}`}>
          <img className="img2" src={image2} alt="author" />
        </div>
        <div className="tri">
          <div className="tri1"> <p>Design</p></div>
          <div className="tri2"> <p>Idea</p></div>
          <div className="tri3"><p>Review</p></div>
        </div>
        <div className="info">
          <h1 className="stories_title"> 
           Migrating to Linear 101 in <br />
          the Modern Era</h1>
          <br />
          <p>
              Lorem ipsum dolor sit amet
              <br />
              consectetur adipisicing elit. Et
              <br />
              doloremque corporis asperiore.....
            </p>
        </div>
      </div>
    </div>
  );
}
