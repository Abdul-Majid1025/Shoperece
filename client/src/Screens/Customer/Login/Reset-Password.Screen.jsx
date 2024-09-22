import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Auth/SignIn/SignIn.styles.css";
import { Link, withRouter } from "react-router-dom";
import { passwordReset } from "../../../Redux/Actions/Users.Actions";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { customerPasswordReset } from "../../../Redux/Actions/Customer.Actions";

const CustomerResetPassword = (props) => {
  console.log("CustomerResetPassword", props);

  const urlSearchParams = new URLSearchParams(props.location.search);
  const token = urlSearchParams.get("token");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setError] = useState({});

  const customerResetPassword = useSelector(
    (state) => state.customerResetPassword
  );
  const { success, loading, error } = customerResetPassword;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {};
    const mediumRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
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
        dispatch(customerPasswordReset(password, token));
      }
    }
    // dispatch(signin(email, password));
  };

  return (
    <>
      <div className="signincontainer">
        <div className="signincontainer2">
          <div className="half2">
            <img src="/images/signup.webp" alt="" />
          </div>
          <div className="half1">
            <div className="container">
              <div className="logo">
                <img src="/images/Shoperece-logos_black.png" alt="" />
              </div>

              <p className="text"> Continue to Shoperece</p>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {success && (
                <MessageBox variant="success">
                  Password Updated Successfully
                </MessageBox>
              )}
              <div className="row">
                <div className="col-lg-9">
                  <form method="post" onSubmit={submitHandler}>
                    <div className="row">
                      <label for="password">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
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
                        className="form-control"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                    </div>

                    <div className="box-footer d-flex mt-4 flex-wrap align-items-center justify-content-center">
                      <button type="submit" className="btn btn-dark mt-0">
                        Update Password
                      </button>
                    </div>
                  </form>
                  <p className="mt-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <span className="text"> New to Shoperece? </span>
                        <Link to="/signup">Get Started</Link>
                      </div>
                      <span className="forget">Forget Password</span>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CustomerResetPassword);
