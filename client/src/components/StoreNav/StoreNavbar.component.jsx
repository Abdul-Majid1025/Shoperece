import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";

import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../Redux/Actions/Users.Actions";

import { Link, NavLink } from "react-router-dom";

const StoreNavbarComponent = ({ setLoginModel }) => {
  const getStoreInfo = useSelector((state) => state.getStoreInfo);
  const { storeInfo } = getStoreInfo;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const userCart = useSelector((state) => state.userCart);

  const { cartItems } = userCart;

  const customerCurrentStore = useSelector(
    (state) => state.customerCurrentStore
  );
  const { customerInStore } = customerCurrentStore;

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
    window.location.href = "/";
  };
  return (
    <Navbar className="fixed shop_nav" bg="light" expand="lg">
      <Container fluid className="nav_shop d-flex justify-content-between">
        <Navbar.Brand href="/">
          <div className="div_logo">
            {storeInfo && storeInfo.storeName
              ? storeInfo.storeName
              : "Your Site Name"}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="d-flex justify-content-around">
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/store" className="nav_link">
                Home
              </Link>
              {userInfo && userInfo.user.role === "merchant" && (
                <Link to="/merchantstores" className="nav_link">
                  Store
                </Link>
              )}
              <Link to="#" className="nav_link">
                About
              </Link>
              <Link to="#" className="nav_link">
                Contact Us
              </Link>
              {/* <Link to="/customerlogin" className="nav_link">
                  Sign In
                </Link> */}
              {customerInfo && customerInfo.user.username ? (
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdownbtn"
                    variant="dark"
                    id="dropdown-basic"
                  >
                    {customerInfo.user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <NavLink to="/edit-profile">User Profile</NavLink>
                    <NavLink to="/orderhistory">Order History</NavLink>
                    <NavLink to="/trackorder">Track Order</NavLink>
                    <NavLink to="#signout" onClick={logout}>
                      Sign Out
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button
                  as={Link}
                  className="nav_link signinbtn"
                  onClick={(e) => setLoginModel(true)}
                >
                  Sign In
                </button>
              )}
            </Nav>
          </div>
          <div className="icons_nav">
            <span className="icndiv">
              <PhoneIcon />
            </span>
            <span className="icndiv">
              <MailIcon />
            </span>
            <span className="sep icndiv"></span>
            {/* <span className="search_div icndiv">
              <SearchIcon className="searchicon icn_div" />
            </span> */}
            <div className="shopingcartdiv">
              <Link to="/cart">
                <span className="icndiv">
                  <ShoppingCartIcon />
                </span>
                <span className="cartlength">
                  {cartItems && cartItems.length}
                </span>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StoreNavbarComponent;
