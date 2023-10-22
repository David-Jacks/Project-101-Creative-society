import React, { useState } from "react";
import "./Loginpage.css";
import Landing from "../../components/Landing/landing";
import { GiCancel } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../api";
import { useDispatch } from "react-redux";
import { login } from "../../features/users";

export default function Loginpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [valid, setValid] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const nameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.{11,19}$).*/;
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value});

    if (name === "username")
    {
      error.name = !nameRegex.test(value) ? "Invalid Username 'no space required'" : "";

      !nameRegex.test(value) ? setValid(false) : setValid(true);
    } else if (name === "password")
    {
      error.password = !passwordRegex.test(value) ? "Between 10 and 20 chars, have numbers and special chars" : "";

      !passwordRegex.test(value) ? setValid(false) : setValid(true);
    }
  };

  const HandleSubmit = async (e) =>
  {
    e.preventDefault();
    setClicked(true);
    if (valid)
    {
      const res = await Login(formData);
      dispatch(login(res));
    }
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
              <button className="forgot-button">Forgot Password ?</button>
            </div>
            <div className="form-group">
              <div className="twi-buttons">
                  <button className="loginbutton hvr-wobble-skew" onClick={HandleSubmit}>{!clicked ? "Log in" : "loading..."}</button>
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
