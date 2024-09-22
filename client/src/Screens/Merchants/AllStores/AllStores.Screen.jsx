import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import "./AllStore.Styles.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { signout } from "../../../Redux/Actions/Users.Actions";

import {
  getMerchantStores,
  setCurrentStore,
} from "../../../Redux/Actions/Stores.Actions";
import { Link, withRouter } from "react-router-dom";

const AllStores = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const getAllMerchantStores = useSelector(
    (state) => state.getAllMerchantStores
  );
  let { stores } = getAllMerchantStores;

  let [storeArray, setStoreArray] = useState([]);

  useEffect(() => {
    setStoreArray(stores);
  }, [stores]);
  console.log(storeArray);
  const id = userInfo && userInfo.user ? userInfo.user.id : "";
  useEffect(() => {
    dispatch(getMerchantStores(id));
  }, []);

  const logout = () => {
    dispatch(signout());
    window.location.href = "/";
  };
  let filteredPrint = stores;
  const onChangeHandler = (event) => {
    filteredPrint =
      stores &&
      stores.filter((obj) => {
        return obj.storeName
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    console.log("filteredPrint", filteredPrint);
    setStoreArray(filteredPrint);
  };

  return (
    <>
      {/* <MyNavbarComponent /> */}
      <div className="setsidebar">
        <div className="storescontainer">
          <div className="storescontainer2">
            <div className="half2">
              <img src="/images/signup.webp" alt="" />
            </div>
            <div className="half1">
              <div className="container">
                <div className="r1">
                  <div className="logo">
                    <img src="/images/Shoperece-logos_black.png" alt="" />
                  </div>
                  <div className="st_name">
                    <span className="round-shop-name">SN</span>
                    <NavDropdown
                      title="Shoperece"
                      id="navbarScrollingDropdown"
                      className="Mer-Name"
                    >
                      <NavDropdown.Item href="/editprofile">
                        Manage Account
                      </NavDropdown.Item>

                      <NavDropdown.Item onClick={logout}>
                        Logout
                      </NavDropdown.Item>
                      {/* <NavDropdown.Divider /> */}
                    </NavDropdown>
                  </div>
                </div>
                <div className="r2">
                  <h3 className="storeheading">Stores</h3>
                  <Link to="/createstore" className="createstore">
                    Create Another Store
                  </Link>
                </div>
                <br />
                <div className="searchdiv">
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2 search_nav"
                      aria-label="Search"
                      onChange={onChangeHandler}
                    />
                  </Form>
                </div>
                <br></br>

                {storeArray &&
                  storeArray.map((data, i) => {
                    return (
                      <div className="stores mt-4" key={i}>
                        <Link
                          to={`/addproduct/${data.id}`}
                          // onClick={() => dispatch(setCurrentStore(data.id))}
                          className="store shadow rounded bg-white mb-3 p-4"
                        >
                          <div className="c1">
                            <img src="/images/stores.webps" alt="" />
                            <span className="ml-4"> {data.storeName}</span>
                          </div>
                          <div className="c2">
                            <ArrowForwardIosIcon />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(AllStores);
