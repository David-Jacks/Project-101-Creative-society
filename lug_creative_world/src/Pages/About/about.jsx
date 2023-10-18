import "./about.css";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import logo from "../../images/image1.png";
import Tag_logo from "../../images/TAG-LOGO.png";

const About = () => {
  return (
    <>
      <div id="About_page">
        <div className="about_head">
          <img src={logo} alt="logo" />
          <img src={Tag_logo} alt="transnational" />
        </div>

        <div className="about_main">
          <div className="about_main_head">
            <h2>LUG</h2>
            <h3>CREATIVE WORLD</h3>
          </div>

          <div className="about_para">
            <p className="first-p">ABOUT THE LUG BLOG </p>
              <p> The faintest ink is more powerful than the strongest memory ( Qing Dynasty ).</p>
            <p>
              The LUG Blog serves as a welcoming platform for individuals to contribute their academic writings, stories, and innovative ideas. It offers a space where individuals from the LUG community can effortlessly share insightful perspectives, valuable knowledge, and the wisdom of life with their peers. The LUG BLOG operates on a collaborative basis, helping authors connect with the most appropriate audience for their unique contributions.
              <br /><br />
              We firmly believe in the profound impact of what we read and write.
              Words possess the remarkable ability to either divide or empower us, to inspire or dishearten us. In a world where shallow and sensational stories often dominate, we are dedicated to constructing a platform that recognizes and rewards depth, complexity, and the investment of time in meaningful content. Our aim is to champion a culture that values thoughtful engagement and the consumption of content that enriches lives.
            </p>
          </div>
        </div>

        <div className="lug_handles">
          <AiFillFacebook className="about_fb about_icon" />
          <AiFillLinkedin className="about_ln about_icon" />
          <AiFillInstagram className="about_in about_icon" />
          <CgWebsite className="about_wb about_icon" />
        </div>
      </div>
    </>
  );
};

export default About;

