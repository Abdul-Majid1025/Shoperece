import React, { useState } from "react";

import "./EditProfile.styles.css";

import { useDispatch, useSelector } from "react-redux";

import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";

import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";

import {
  updateProfile,
  deleteProfile,
  signout,
} from "../../../Redux/Actions/Users.Actions";

import { Button } from "react-bootstrap";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const UpdateMerchantProfile = useSelector(
    (state) => state.UpdateMerchantProfile
  );
  const {
    success,
    loading: UpdateMerchantProfileLoading,
    error: UpdateMerchantProfileError,
  } = UpdateMerchantProfile;

  const deleteMerchantAccount = useSelector(
    (state) => state.deleteMerchantAccount
  );
  const { success: deleteMerchantAccountSuccess } = deleteMerchantAccount;

  const [username, setUsername] = useState(
    userInfo && userInfo.user ? userInfo.user.username : ""
  );
  const [email, setEmail] = useState(
    userInfo && userInfo.user ? userInfo.user.email : ""
  );

  const [address, setAddress] = useState(
    userInfo && userInfo.user ? userInfo.user.address : ""
  );
  const [city, setCity] = useState(
    userInfo && userInfo.user ? userInfo.user.city : ""
  );

  const [postal, setPostal] = useState(
    userInfo && userInfo.user ? userInfo.user.postalCode : ""
  );
  const [phone, setPhone] = useState(
    userInfo && userInfo.user ? userInfo.user.phone : ""
  );
  const [id, setId] = useState(
    userInfo && userInfo.user ? userInfo.user.id : ""
  );

  const updateProf = () => {
    console.log("updateProfile");
    dispatch(updateProfile(username, email, address, city, postal, phone, id));
  };

  const deleteMerchant = () => {
    dispatch(deleteProfile(id));
  };
  if (deleteMerchantAccountSuccess) {
    dispatch(signout());
  }
  return (
    <>
      {!userInfo && (window.location.href = "/login")}
      <MyNavbarComponent />

      <div className="editprofilecontainer">
        <div className="profileform">
          <div className="row mt-3">
            <h2 className="col-lg-9 text-center">
              {userInfo && userInfo.user && userInfo.user.username}'s Profile
            </h2>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9">
              {UpdateMerchantProfileLoading && <LoadingBox></LoadingBox>}
              {UpdateMerchantProfileError && (
                <MessageBox variant="danger">
                  {UpdateMerchantProfileError}
                </MessageBox>
              )}
              {success && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
              <label htmlFor="username">Username </label>
              <input
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-9">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                className="form-control"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-9">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={city}
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9">
              <label htmlFor="postalcode">Postal Code</label>
              <input
                id="postalcode"
                name="postalcode"
                type="text"
                value={postal}
                className="form-control"
                onChange={(e) => setPostal(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-9">
              <label htmlFor="phone">Telephone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={phone}
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 box-footer d-flex flex-wrap align-items-center justify-content-center mt-4">
              <button className="btn btn-dark mt-0" onClick={updateProf}>
                Update
              </button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="danger"
                onClick={deleteMerchant}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
