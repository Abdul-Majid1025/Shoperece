import React, { useState, Component, useEffect } from "react";

import { Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./Login.Styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  customerRegisteration,
  customerLogin,
  customerSignout,
  customerUpdatePass,
  customerPasswordReset,
  customerLoginGoogle,
} from "../../../Redux/Actions/Customer.Actions";

import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import { updatePass } from "../../../Redux/Actions/Users.Actions";

import GoogleLogin from "react-google-login";

const Login = (props) => {
  const { loginModel, setLoginModel, loginModel2, setLoginModel2 } = props;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo, loading, error } = customerSignin;
  // let checkout = localStorage.getItem("checkout")
  //   ? JSON.parse(localStorage.getItem("checkout"))
  //   : null;
  // const redirect =
  //   props.location && props.location.search
  //     ? props.location.search.split("=")[1]
  //     : "/stores";

  // useEffect(() => {
  //   if (customerInfo) {
  //     props.history.push("/stores");
  //   }
  // }, [props.history, customerInfo]);

  const hide1 = () => {
    setLoginModel(false);
    setLoginModel2(true);
  };

  const hide2 = () => {
    setLoginModel2(false);
    setLoginModel(true);
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={loginModel}
        onHide={(e) => setLoginModel(false)}
        data={hide1}
      />

      <MyVerticallyCenteredModal2
        show={loginModel2}
        onHide={(e) => setLoginModel2(false)}
        data={hide2}
      />
    </>
  );
};

export default withRouter(Login);

function MyVerticallyCenteredModal(props) {
  const customerCurrentStore = useSelector(
    (state) => state.customerCurrentStore
  );
  const { customerInStore } = customerCurrentStore;

  console.log("customerInStore", customerInStore);

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

  const customerRegister = useSelector((state) => state.customerRegister);
  const { loading, error, success, message } = customerRegister;

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
            customerRegisteration(
              username,
              email,
              password,
              phone,
              address,
              city,
              postal
              // customerInStore
            )
          );
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
      const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Container className="customerLogin" style={{ marginTop: "20px" }}>
          <Row>
            <Col xs={6}>
              <img
                style={{ width: "100%", height: "500px" }}
                src="/images/signup.webp"
              ></img>

              {/* <button onClick={props.data}>Login</button> */}
            </Col>
            <Col xs={6} style={{ backgroundColor: "white" }}>
              <div className="modal-body">
                <h2>
                  <b>SignUp</b>
                </h2>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {success && (
                  <MessageBox variant="success">{message.message}</MessageBox>
                )}
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
                        <div className="alert-danger">{EmailError.email}</div>{" "}
                      </div>

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
                        <p className="mt-3">
                          <span className="text">
                            {" "}
                            Already have an account?{" "}
                          </span>
                          <button className="signinbtn" onClick={props.data}>
                            Log In
                          </button>
                        </p>
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
                        <button className="signinbtn" onClick={props.data}>
                          Log In
                        </button>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function MyVerticallyCenteredModal2(props) {
  const [forgetPass, setForgetPass] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo, loading, error } = customerSignin;
  if (customerInfo) {
    props.onHide();
    // window.location.href = "/stores";
  }

  // if (cartItems) {
  //   window.location.href = "/checkout";
  // }

  const customerCurrentStore = useSelector(
    (state) => state.customerCurrentStore
  );
  const { customerInStore } = customerCurrentStore;

  console.log("customerInStore", customerInStore);

  const customerPasswordChange = useSelector(
    (state) => state.customerPasswordChange
  );
  const {
    success,
    loading: passwordChangeLoading,
    error: passwordChangeError,
  } = customerPasswordChange;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(customerLogin(email, password));
  };

  const signoutHandler = () => {
    dispatch(customerSignout());
    window.location.href = "/";
  };
  const Forget = () => {
    dispatch(customerUpdatePass(email));

    // setForgetPass(1);
  };

  const responseGoogle = (response) => {
    console.log(response);
    dispatch(customerLoginGoogle(response));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Container className="customerLogin" style={{ marginTop: "20px" }}>
          <Row>
            <Col xs={6}>
              <img
                style={{ width: "100%", height: "500px" }}
                src="/images/signup.webp"
              ></img>

              {/* <button onClick={props.data}>Sign Up</button> */}
            </Col>

            <Col xs={6} style={{ backgroundColor: "white" }}>
              <div className="modal-body">
                {!forgetPass ? (
                  <>
                    <h2>
                      <b>Login</b>
                    </h2>

                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}

                    <span className="subtitle">Email</span>
                    <form
                      className="contact-form form-validate4"
                      novalidate="novalidate"
                      onSubmit={submitHandler}
                    >
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          required="true"
                          autocomplete="off"
                          aria-required="true"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <label>Password</label>
                      <div className="form-group">
                        <input
                          type="password"
                          name="pass"
                          className="form-control"
                          placeholder="Password"
                          required=""
                          autocomplete="off"
                          aria-required="true"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <br />
                      <input
                        className="btn btn-md btn-dark btn-center"
                        id="login_btn"
                        type="submit"
                        value="Login"
                      />
                    </form>
                    <div className="mt-3">
                      <GoogleLogin
                        clientId="659064580758-8tlei4488ec2npdcd7pvlkn8inc4tesc.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                        className="cursor-pointer googlelogin"
                      />
                    </div>
                    <p className="mt-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <span className="text"> New to Shoperece? </span>

                          <button className="signinbtn" onClick={props.data}>
                            Get Started
                          </button>
                        </div>
                      </div>
                    </p>
                    <span className="forget" onClick={() => setForgetPass(1)}>
                      Forget Password
                    </span>
                  </>
                ) : (
                  <div className="mt-5 row">
                    <div className="col-md-12">
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
                        <span
                          className="forget"
                          onClick={() => setForgetPass(0)}
                        >
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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function MyVerticallyCenteredModal3(props) {
  console.log("ResetPassword", props.match.params.token);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setError] = useState({});

  const customerResetPassword = useSelector(
    (state) => state.customerResetPassword
  );
  const { success, loading, error } = customerResetPassword;

  const customerCurrentStore = useSelector(
    (state) => state.customerCurrentStore
  );
  const { customerInStore } = customerCurrentStore;

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
        dispatch(
          customerPasswordReset(
            password,
            props.match.params.token,
            customerInStore
          )
        );
      }
    }
    // dispatch(signin(email, password));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Container className="customerLogin" style={{ marginTop: "20px" }}>
          <Row>
            <Col xs={6}>
              <img
                style={{ width: "100%", height: "500px" }}
                src="/images/signup.webp"
              ></img>

              {/* <button onClick={props.data}>Sign Up</button> */}
            </Col>

            <Col xs={6} style={{ backgroundColor: "white" }}>
              <div className="modal-body">
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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
