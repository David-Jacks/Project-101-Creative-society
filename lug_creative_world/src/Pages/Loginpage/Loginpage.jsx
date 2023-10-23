import React, { useState } from "react";
import "./Loginpage.css";
import Landing from "../../components/Landing/landing";
import { GiCancel } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../api";
import { useDispatch } from "react-redux";
import { login } from "../../features/users";
import Loading from "../../components/Modals/loadingmodal/loading";
import Error from "../../components/Modals/errors/errors";

export default function Loginpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrMessage] = useState("");
  const [error, setError] = useState({});
  const [valid, setValid] = useState(false);
  const [load, setLoading] = useState(false);
  const [myerr, setMyErr] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const nameRegex = /^.{1,19}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,20}$/;
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value});

    if (name === "username")
    {
      error.name = !nameRegex.test(value) ? "Username should be less than 20" : "";

      !nameRegex.test(value) ? setValid(false) : setValid(true);
    } else if (name === "password")
    {
      error.password = !passwordRegex.test(value) ? "Between 5 and 20 chars, have numbers and special chars" : "";

      !passwordRegex.test(value) ? setValid(false) : setValid(true);
    }
  };

  const HandleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true)
    const res = await Login(formData);
    if(res === 400){
      setLoading(false);
      setMyErr(true);
      setErrMessage("You inputed a wrong password");
    }else if(res === 404){
        setLoading(false);
        setMyErr(true);
        setErrMessage("Username not registered please signup");
    }else if(res === 500){
      setMyErr(true);
      setErrMessage("Network error please try again!");
    }else{
      dispatch(login(res));
    }
  }

  if (load){
    return(<Loading />);
  }else if(myerr){
    return (<Error 
      handleErrorClick={()=>{setMyErr(false)}}
      err_message={errorMessage}
      />);
  }

  return (
    <section className="loginpage">
      <div className="outer">
        <Landing />
      </div>
      <div className="inner">
        <div className="join">
          <Link to="/" className="join_link">
            <button className="cancel-button">
              <GiCancel className="icon" />
            </button>
          </Link>
          <h1>Welcome back !</h1>
          <p className="paragraph">Sign in to your account</p>
          <form id="form-container" >
            <div className="form-group">
              <label htmlFor="name" className="label-name">
                USERNAME
              </label>
              <input
                type="text"
                id="name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="input-field"
              />
              <span className="login_err">{error.name}</span>
            </div>
            <div className="form-group-pass">
              <label htmlFor="password" className="label-name">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
              <span className="login_err">{error.password}</span>
              {/* <button className="forgot-button">Forgot Password ?</button> */}
            </div>
            <div className="form-group">
              <div className="twi-buttons">
                  <button className="loginbutton hvr-wobble-skew" onClick={HandleSubmit}>Log in</button>
              </div>
              <div className="div-account">
                <p>Don't have an account yet ?</p>
                <Link to="/joinpage">
                  <button className="login-button hvr-buzz">Sign up</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
