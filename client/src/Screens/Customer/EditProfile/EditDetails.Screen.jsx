import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";

import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";

import {
  customerUpdateProfile,
  deleteCustomerAccount,
  customerSignout,
} from "../../../Redux/Actions/Customer.Actions";
import StoreNavbarComponent from "../../../components/StoreNav/StoreNavbar.component";

import { Button } from "react-bootstrap";
import CustomerNavbarComponent from "../../../components/CutomerNav/Customer.Nav.component";

const EditCustomerProfile = () => {
  const dispatch = useDispatch();
  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const customerCurrentStore = useSelector(
    (state) => state.customerCurrentStore
  );
  const { customerInStore } = customerCurrentStore;

  const updateCustomerProfile = useSelector(
    (state) => state.updateCustomerProfile
  );
  const {
    success,
    loading: UpdateCusomerProfileLoading,
    error: UpdateCusomerProfileError,
  } = updateCustomerProfile;

  const deleteCustomerAccount = useSelector(
    (state) => state.deleteCustomerAccount
  );
  const { success: deleteCustomerAccountSuccess } = deleteCustomerAccount;

  const [username, setUsername] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.username : ""
  );
  const [email, setEmail] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.email : ""
  );

  const [address, setAddress] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.address : ""
  );
  const [city, setCity] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.city : ""
  );

  const [postal, setPostal] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.postalCode : ""
  );
  const [phone, setPhone] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.phone : ""
  );
  const [id, setId] = useState(
    customerInfo && customerInfo.user ? customerInfo.user.id : ""
  );

  const updateProf = () => {
    console.log("updateProfile");
    dispatch(
      customerUpdateProfile(
        username,
        email,
        address,
        city,
        postal,
        phone,
        id
        // customerInStore
      )
    );
  };
  const deleteUser = () => {
    dispatch(deleteCustomerAccount(id));
  };

  if (deleteCustomerAccountSuccess) {
    dispatch(customerSignout());
  }
  return (
    <>
      {!customerInfo && (window.location.href = "/login")}
      <CustomerNavbarComponent />

      <div className="editprofilecontainer">
        <div className="profileform">
          <div className="row mt-3">
            <h2 className="col-lg-9 text-center">
              {customerInfo && customerInfo.user && customerInfo.user.username}
              's Profile
            </h2>
          </div>

          <div className="row mb-3">
            <div className="col-lg-9">
              {UpdateCusomerProfileLoading && <LoadingBox></LoadingBox>}
              {UpdateCusomerProfileError && (
                <MessageBox variant="danger">
                  {UpdateCusomerProfileError}
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
                onClick={deleteUser}
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

export default EditCustomerProfile;
