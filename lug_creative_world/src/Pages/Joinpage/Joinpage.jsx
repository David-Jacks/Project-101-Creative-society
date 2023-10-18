import React, { useState } from "react";
import "./joinpage.css";
import Landing from "../../components/Landing/landing";
import { GiCancel } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { join } from "../../api";
export default function JoinPage() {
  const dispatch = useDispatch();///calling the dispatch function to be able to update my user state
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: checked,
  });

  const nameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])(?=.{11,19}$).*/;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (name === "username")
    {
      error.name = !nameRegex.test(newValue) ? "Invalid Username Ex.Name:Jackson@faithchamp" : "";

      !nameRegex.test(newValue) ? setValid(false) : setValid(true);
    } else if (name === "email")
    {
      error.email = !emailRegex.test(newValue) ? "Invalid Email" : "";

      !emailRegex.test(newValue) ? setValid(false) : setValid(true);
    } else if (name === "password")
    {
      error.password = !passwordRegex.test(newValue) ? "Between 10 and 20 chars, have numbers and special chars" : "";

      !passwordRegex.test(newValue) ? setValid(false) : setValid(true);
    }  else if (name === "confirmPassword")
    {
      error.passwordConfirm = !(formData.password === newValue ) ? "password mismach" : "";

      setValid(formData.password === newValue);
    } else if (name === "agreeToTerms")
    {
      error.terms = !checked ? "Please resolve terms and conditions" : "";

      !checked? setChecked(false) : setChecked(true);
    }

  };

 
const { confirmPassword, agreeToTerms, ...actData } = formData;

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setClicked(true)
    if (valid && checked)
    {
     join(actData);
    }
  }

  return (
    <section className="joinpage">
      <div className="outer">
        <Landing />
      </div>
      <div className="inner">
        <div className="join">
          <Link to="/">
            <button className="cancel-button">
              <GiCancel className="icon" />
            </button>
          </Link>
          <h1>Join LUG BLOG</h1>
          <form id="form-container" onSubmit={handleSubmit}>
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
              <span className="join_err">{error.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label-name">
                INSTITUTIONAL EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="@youremail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              <span className="join_err">{error.email}</span>
            </div>
            <div className="form-group">
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
              <span className="join_err">{error.password}</span>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="label-name">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-field"
              />
              <span className="join_err">{error.passwordConfirm}</span>
            </div>
            <div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked = {formData.agreeToTerms}
                  name="agreeToTerms"
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <div className="custom-checkbox"></div>
                <p>
                  By signing up i agree to the <span>terms and conditions</span>
                </p>
              </label>
                <span className="join_err">{error.terms}</span>
            </div>
            <div className="form-group">
              <div className="twi-buttons">
                  <button type="submit" className="signup-button hvr-wobble-skew">
                    {!clicked ? "Sign up": "loading..."}
                  </button>
                <p>or</p>
                <Link to="/loginpage">
                  <button className="login-button hvr-buzz">Log in</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
