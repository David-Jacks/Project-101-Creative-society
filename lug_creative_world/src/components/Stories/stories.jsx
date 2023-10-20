import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./stories.css";
import image2 from "../../images/image2.jpg";
import Storiescard from "../partials/Storiescard";

export default function Stories() {
  return (
    <section className="stories">
      <div className="first-div">
        <p>
          Get started with our <span>best stories</span>
        </p>
        <div className="icons">
          <span className="icon_arrow_left">
            <BsArrowLeft />
          </span>
          <span className="icon_arrow_right">
            <BsArrowRight />
          </span>
        </div>
      </div>

      <div className="second_div">
        {/* <div className="card1-div">
          <div className="card1">
            <div className="img2-bg">
              <img className="img2" src={image2} alt="author" />
            </div>
          </div>
          <div className="tri">
            <div className="tri1">
              <p>Design</p>
            </div>
            <div className="tri2">
              <p>Idea</p>
            </div>
            <div className="tri3">
              <p>Review</p>
            </div>
          </div>
          <div className="info">
            <h1>
              Migrating to Linear 101 in <br />
              the Modern Era
            </h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet
              <br />
              consectetur adipisicing elit. Et
              <br />
              doloremque corporis asperiore.....
            </p>
          </div>
        </div> */}
        <Storiescard />
        <Storiescard />
        <Storiescard />
        <Storiescard />
           
      </div>
      <hr className="line" />
      <div className="third-div">
        <div className="left">
          <p>
            See what we have <br />
            <span> written lately</span>
          </p>
        </div>
        <div className="right">
          <div className="img-div">
            <div className="image-bg1">
              <img className="author-img" src={image2} alt="author" />
            </div>
            <div className="image-bg2">
              <img className="author-img" src={image2} alt="author" />
            </div>
            <div className="image-bg3">
              <img className="author-img" src={image2} alt="author" />
            </div>
            <div className="image-bg4">
              <img className="author-img" src={image2} alt="author" />
            </div>
          </div>
          <p>Meet top authors</p>
        </div>
      </div>
      <div className="fourth-div">
        <Storiescard second={true}/>
        <Storiescard second={true}/>
        <Storiescard second={true}/>
      </div>

      {/* next cards */}

      <div className="fourth-div">
        <Storiescard />
        <Storiescard />
        <Storiescard />
      </div>
      {/* button */}

      <div className="button-div">
        <button className="button1">Load more</button>
      </div>
      <hr className="line1" />
      <div className="fifth-div">
        <h1>Recommended</h1>
      </div>
      <div className="sixth-div">
        <Storiescard />
        <Storiescard />
        <Storiescard />
        <Storiescard />
        <Storiescard />

      </div>
      {/* <div className="seventh-div">
        <div className="subscribe">
          <p>
            Subscribe to our <span>new posts</span>
          </p>
        </div>
        <div className="box">
          <input type="text" placeholder="Your Email Address" />
          <button>Subscribe</button>
        </div>
      </div> */}
    </section>
  );
}
