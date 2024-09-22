import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import RootNavbar from "./Navbar";

import { getAllStore } from "../../Redux/Actions/Stores.Actions";

import { useDispatch, useSelector } from "react-redux";

const HomePage = ({ setLoginModel, setLoginModel2 }) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  userInfo &&
    userInfo.user.username &&
    userInfo.user.role === "merchant" &&
    (window.location.href = "/merchantstores");
  userInfo &&
    userInfo.user &&
    userInfo.user.username &&
    userInfo.user.role === "admin" &&
    (window.location.href = "/admin");

  customerInfo &&
    customerInfo.user &&
    customerInfo.user.username &&
    (window.location.href = "/stores");

  return (
    <div className="rootcontainer">
      <RootNavbar
        setLoginModel={setLoginModel}
        setLoginModel2={setLoginModel2}
      />
      <Slide easing="ease">
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url("https://miro.medium.com/max/1000/0*ghkCviTUz3Wh3ra9.png")`,
            }}
          >
            <span>
              We Provide the Best <br />
              Ecommerce Platform
            </span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url("https://miro.medium.com/max/1000/0*ghkCviTUz3Wh3ra9.png")`,
            }}
          >
            <span>
              We Provide the Best <br />
              Ecommerce Platform
            </span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url("https://miro.medium.com/max/1000/0*ghkCviTUz3Wh3ra9.png")`,
            }}
          >
            <span>
              We Provide the Best <br />
              Ecommerce Platform
            </span>
          </div>
        </div>
      </Slide>
      <div>
        <br />
        <h3 className="service">OUR SERVICES</h3>
        <h1 className="service1">SERVICES WE OFFER</h1>
        <div className="flexbox-container">
          <div className="inrow">
            <div>
              <img className="ServicesImage" src="images/shopingicon.jpg"></img>
            </div>
            <div className="ServicesCon">
              <text>
                <b>Ecommerce Platform</b>
              </text>
              <p>
                Easy to use platform for creating and managing online stores
              </p>
            </div>
          </div>
          <div className="inrow">
            <div>
              <img className="ServicesImage" src="images/support.png"></img>
            </div>
            <div className="ServicesCon">
              <text>
                <b>Customer Support</b>
              </text>
              <p>24/7 fast and reliable Customer Support </p>
            </div>
          </div>
          <div className="inrow">
            <div>
              <img className="ServicesImage" src="images/secure.png"></img>
            </div>
            <div className="ServicesCon">
              <text>
                <b>Payment Gateway</b>
              </text>
              <p>Secure and reliable payment gateway</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ChooseUs2">
        <div className="ChooseUs1">
          <div className="overlay1">
            <div className="overlay1Content">
              <h1 className="ChooseUs6">WHY CHOOSE US?</h1>
            </div>
          </div>
        </div>
        <div className="flexbox-container ServicesContainer">
          <div className="ChooseUs3">
            <img src="images/customer.webps"></img>
            <h1 className="ChooseUs4" style={{ display: "inline" }}>
              25k+
            </h1>
            <text className="ChooseUs4">Happy Customers</text>
          </div>
          <div className="ChooseUs3">
            <img src="images/branches.webps"></img>
            <h1 className="ChooseUs4" style={{ display: "inline" }}>
              10
            </h1>
            <text className="ChooseUs4">Total Branches</text>
          </div>
          <div className="ChooseUs3">
            <img src="images/merchants.webps"></img>
            <h1 className="ChooseUs4" style={{ display: "inline" }}>
              28k+
            </h1>
            <text className="ChooseUs4">Merchants Registered</text>
          </div>
          <div className="ChooseUs3">
            <img src="images/award.webps"></img>
            <h1 className="ChooseUs4" style={{ display: "inline" }}>
              36
            </h1>
            <text className="ChooseUs4">Award Winner</text>
          </div>
          <div className="ChooseUs3">
            <img src="images/stores.webps"></img>
            <h1 className="ChooseUs4" style={{ display: "inline" }}>
              50k+
            </h1>
            <text className="ChooseUs4">Stores Created</text>
          </div>
        </div>
      </div>
      <div className="ChooseUs7">
        <img
          className="ChooseUs8"
          src="images/ecommerce-platform-optimization.jpg"
        ></img>
        <div className="overlay2">
          <h1 className="Services">
            We Offer Fast, Professional <br />& Exceptional Services
          </h1>
        </div>
      </div>
      <div className="footer">
        <div className="inrow">
          <div className="footer1">
            <h1>Shoperece</h1>
            <p>Faisal Town, Lahore</p>
            <p>Phone: +923041234567</p>
            <p>Email: shoperece@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
