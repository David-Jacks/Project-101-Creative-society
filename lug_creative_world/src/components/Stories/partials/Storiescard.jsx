import React from "react";
import "./Storiescard.css";
import image2 from "../../../images/image2.jpg";

export default function Storiescard({ card, tri, title, subtitle }) {
  return (
    <div className="storiescard">
      <div className="card-div">
        <div className="card">
          {card && <img className="img2" src={image2} alt="author" />}
        </div>
        <div className="tri">
          <div className="tri1">{tri && <p>{tri[0]}</p>}</div>
          <div className="tri2">{tri && <p>{tri[1]}</p>}</div>
          <div className="tri3">{tri && <p>{tri[2]}</p>}</div>
        </div>
        <div className="info">
          <h1 className="stories_title">{title}</h1>
          <br />
          <p className="stories_subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
