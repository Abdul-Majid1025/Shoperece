import "./Create-Store.Styles.css";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createStore } from "../../../Redux/Actions/Stores.Actions";

import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";

const CreateStore = () => {
  const dispatch = useDispatch();
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [sname, setsname] = useState("");
  const [address, setaddress] = useState("");
  const [apart, setapart] = useState("");
  const [city, setcity] = useState("");
  const [post, setpost] = useState("");
  const [phone, setphone] = useState("");
  const [url, seturl] = useState("");
  const [isregistered, setisregistered] = useState(false);
  const [media, setMedia] = useState("");

  const createNewStore = useSelector((state) => state.createNewStore);
  const { success, loading, error } = createNewStore;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const id = userInfo && userInfo.user ? userInfo.user.id : "";
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`
        fName: ${fname}
        lName: ${lname}
        sName: ${sname}
        Address: ${address}
        Apart: ${apart}
        City: ${city}
        Post: ${post}
        Phone: ${phone}
        Website: ${url}
        isRegistered: ${isregistered}
      `);
    dispatch(
      createStore(
        sname,
        fname,
        lname,
        address,
        apart,
        city,
        post,
        phone,
        url,
        isregistered,
        id,
        media
      )
    );
  };

  return (
    <>
      <MyNavbarComponent />

      <div className="creatstorecontainer">
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <br />
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {success && (
            <MessageBox variant="success">
              Store Created Successfully
            </MessageBox>
          )}

          <h1 style={{ textAlign: "center" }}>Create New Store</h1>
          <p style={{ textAlign: "center" }}>
            Fill this information to Create your store
          </p>
          <div className="row">
            <div className="col-md-6">
              <label>
                Store Name
                <input
                  name="sname"
                  className="form-control"
                  type="sname"
                  value={sname}
                  onChange={(e) => setsname(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                First Name
                <input
                  className="form-control"
                  name="fname"
                  type="fname"
                  value={fname}
                  onChange={(e) => setfname(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>
                Last Name
                <input
                  className="form-control"
                  name="lname"
                  type="lname"
                  value={lname}
                  onChange={(e) => setlname(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Address
                <input
                  className="form-control"
                  name="address"
                  type="address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>
                Apartment, suite, etc.
                <input
                  className="form-control"
                  name="apart"
                  type="apart"
                  value={apart}
                  onChange={(e) => setapart(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                City/Region
                <input
                  className="form-control"
                  name="city"
                  type="city"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>
                Postal Code
                <input
                  className="form-control"
                  name="post"
                  type="post"
                  value={post}
                  onChange={(e) => setpost(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Phone Number
                <input
                  name="phone"
                  className="form-control"
                  type="phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>
                Website URL
                <input
                  className="form-control"
                  name="url"
                  type="url"
                  value={url}
                  onChange={(e) => seturl(e.target.value)}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Store Image
                <input
                  className="form-control"
                  name="url"
                  type="file"
                  onChange={(e) => setMedia(e.target.files[0])}
                  required
                />
              </label>
            </div>
          </div>

          <label>
            <input
              name="isregistered"
              type="checkbox"
              onChange={(e) => setisregistered(e.target.value)}
            />
            This store is a registered business
          </label>

          <button>Create Store</button>
        </form>
      </div>
    </>
  );
};

export default CreateStore;
