import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.styles.css";
import { Link } from "react-router-dom";
import {
  loginGoogle,
  signin,
  signout,
  updatePass,
} from "../../../Redux/Actions/Users.Actions";

import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";

import GoogleLogin from "react-google-login";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPass, setForgetPass] = useState(0);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  console.log("forgetPass", forgetPass);
  const passwordChange = useSelector((state) => state.passwordChange);
  const {
    success,
    loading: passwordChangeLoading,
    error: passwordChangeError,
  } = passwordChange;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = "/";
  };
  const Forget = () => {
    dispatch(updatePass(email));

    // setForgetPass(1);
  };

  const responseGoogle = (response) => {
    console.log(response);
    dispatch(loginGoogle(response));
  };

  userInfo &&
    userInfo.user &&
    userInfo.user.username &&
    userInfo.user.role === "merchant" &&
    (window.location.href = "/merchantstores");

  userInfo &&
    userInfo.user &&
    userInfo.user.username &&
    userInfo.user.role === "admin" &&
    (window.location.href = "/admin");

  return (
    <>
      <div className="signincontainer">
        <div className="signincontainer2">
          <div className="half2">
            <img src="images/signup.webp" alt="" />
          </div>
          <div className="half1">
            <div className="container">
              <div className="logo">
                <img src="images/Shoperece-logos_black.png" alt="" />
              </div>

              <p className="text"> Continue to Shoperece</p>
              {!forgetPass ? (
                <>
                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  <div className="row">
                    <div className="col-lg-9">
                      <form method="post" onSubmit={submitHandler}>
                        <div className="row">
                          <label for="email">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                          ></input>
                        </div>

                        <div className="row">
                          <label for="password">Password</label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          ></input>
                        </div>

                        <div className="box-footer d-flex mt-4 flex-wrap align-items-center justify-content-center">
                          <button type="submit" className="btn btn-dark mt-0">
                            Log In
                          </button>
                        </div>
                      </form>
                      <div className="mt-3 d-flex justify-content-center">
                        <GoogleLogin
                          clientId="659064580758-8tlei4488ec2npdcd7pvlkn8inc4tesc.apps.googleusercontent.com"
                          buttonText="Login With Google"
                          onSuccess={responseGoogle}
                          onFailure={(err) => console.log("fail", err)}
                          cookiePolicy={"single_host_origin"}
                          className="cursor-pointer googlelogin"
                        />
                      </div>
                      <p className="mt-3">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <span className="text"> New to Shoperece? </span>
                            <Link to="/signup">Get Started</Link>
                          </div>
                          <span
                            className="forget"
                            onClick={() => setForgetPass(1)}
                          >
                            Forget Password
                          </span>
                        </div>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="row">
                  <div className="col-md-9">
                    {passwordChangeLoading && <LoadingBox></LoadingBox>}
                    {passwordChangeError && (
                      <MessageBox variant="danger">
                        {passwordChangeError}
                      </MessageBox>
                    )}
                    <label for="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <div className="d-flex justify-content-end">
                      <span className="forget" onClick={() => setForgetPass(0)}>
                        Back
                      </span>
                    </div>
                    <div className="box-footer d-flex mt-4 flex-wrap align-items-center justify-content-center">
                      <button onClick={Forget} className="btn btn-dark mt-0">
                        Reset Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
