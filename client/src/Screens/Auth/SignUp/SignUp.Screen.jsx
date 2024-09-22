import React, { useState } from "react";

import "./SignUp.styles.css";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { register } from "../../../Redux/Actions/Users.Actions";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";

const SignUp = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [next, setNext] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setError] = useState({});
  const [EmailError, setEmailError] = useState({});

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, message } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = async () => {
    if (
      phone === "" ||
      postal === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      document.getElementById("error2").style.display = "block";
    } else {
      document.getElementById("error2").style.display = "none";
      let valid = true;
      let errors = {};

      const mediumRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      const phoneno = /^(\+92|0|92)[0-9]{10}$/gm;
      if (!phone.match(phoneno)) {
        errors["phone"] = "Mobile Number is not in required format";
        valid = false;
      }
      if (password.match(mediumRegex)) {
      } else {
        errors["password"] =
          "The string must contain at least 1 lowercase alphabetical character, at least 1 uppercase, at least 1 numeric character,at least one special character, must be eight characters or longer. ";
        valid = false;
      }
      setError(errors);
      if (valid) {
        if (password !== confirmPassword) {
          alert("Password and confirm password are not same");
        } else {
          dispatch(
            register(username, email, password, phone, address, city, postal)
          );
          // here we are calling usersAction.jsx function of register and passing this data as a parameter
        }
      }
    }
  };

  const nextPage = () => {
    if (username === "" || email === "" || address === "" || city === "") {
      document.getElementById("error").style.display = "block";
    } else {
      let errors = {};
      let valid = true;
      const emailValidation =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email.match(emailValidation)) {
        errors["email"] = "Enter Valid Email Address";
        valid = false;
      }
      setEmailError(errors);
      if (valid) {
        document.getElementById("error").style.display = "none";
        setNext(true);
      }
    }
  };
  return (
    <div className="signupcontainer">
      <div className="signupcontainer2">
        <div className="half2">
          <img src="images/signup.webp" alt="" />
        </div>
        <div className="half1">
          <div className="container">
            <div className="logo">
              <img src="images/Shoperece-logos_black.png" alt="" />
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {success && (
              <MessageBox variant="success">{message.message}</MessageBox>
            )}
            <p className="text"> The ecommerce platform made for you</p>
            <div className="row">
              <div className="col-lg-9">
                <div>
                  {!next ? (
                    <>
                      <div className="row">
                        <label for="username">UserName</label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          className="form-control"
                          value={username ? username : ""}
                          required
                          onChange={(e) => setName(e.target.value)}
                        ></input>
                      </div>
                      <div className="row">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email ? email : ""}
                          className="form-control"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                      <div className="alert-danger">{EmailError.email}</div>{" "}
                      <div className="row">
                        <label for="address">Address</label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          className="form-control"
                          value={address ? address : ""}
                          required
                          onChange={(e) => setAddress(e.target.value)}
                        ></input>
                      </div>
                      <div className="row">
                        <label for="city">City</label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          className="form-control"
                          value={city ? city : ""}
                          required
                          onChange={(e) => setCity(e.target.value)}
                        ></input>
                      </div>
                      <p id="error" style={{ display: "none", color: "red" }}>
                        Please Fill in the required details
                      </p>
                      <div className="box-footer d-flex mt-4 flex-wrap align-items-center justify-content-center">
                        <button
                          className="btn btn-dark mt-0"
                          onClick={() => nextPage()}
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row">
                        <label for="postal">PostalCode</label>
                        <input
                          id="postal"
                          name="postal"
                          type="number"
                          className="form-control"
                          value={postal ? postal : ""}
                          required
                          onChange={(e) => setPostal(e.target.value)}
                        ></input>
                      </div>
                      <div className="row">
                        <label for="phone">Phone</label>
                        <input
                          id="phone"
                          name="phone"
                          type="number"
                          className="form-control"
                          value={phone ? phone : ""}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                        ></input>
                        <div className="alert-danger">
                          {passwordError.phone}
                        </div>{" "}
                      </div>

                      <div className="row mb-2">
                        <label for="password">Password</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="form-control"
                          value={password ? password : ""}
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <div className="alert-danger">
                          {passwordError.password}
                        </div>{" "}
                      </div>
                      <div className="row">
                        <label for="confirmpassword">Confirm Password</label>
                        <input
                          id="confirmpassword"
                          name="confirmpassword"
                          type="password"
                          value={confirmPassword ? confirmPassword : ""}
                          className="form-control"
                          required
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                      </div>
                      <p id="error2" style={{ display: "none", color: "red" }}>
                        Please Fill in the required details
                      </p>
                      <div className="box-footer d-flex mt-4 flex-wrap align-items-center justify-content-center">
                        <button
                          className="btn btn-dark mt-0"
                          onClick={submitHandler}
                        >
                          Sign up
                        </button>
                        <button
                          className="btn btn-dark mt-0"
                          onClick={() => setNext(false)}
                          style={{ marginLeft: "10px" }}
                        >
                          Back
                        </button>
                      </div>
                      <p className="mt-3">
                        <span className="text"> Already have an account? </span>
                        <Link to="/login">Log In</Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
