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
import "./Customer.Nav.styles.css";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../Redux/Actions/Users.Actions";

import { Link, NavLink } from "react-router-dom";

const CustomerNavbarComponent = ({ setLoginModel }) => {
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
      <Container fluid className="nav_shop">
        <Navbar.Brand href="/">
          <div className="div_logo">
            <img
              src="/images/logo.png"
              className="d-inline-block align-top my-logo"
              alt=""
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {customerInfo && customerInfo.user.username ? (
              <>
                <Link to="/edit-profile" className="nav_link">
                  Profile
                </Link>

                <Link to="/orderhistory" className="nav_link">
                  Order History
                </Link>
                <Link to="/trackorder" className="nav_link">
                  Track Order
                </Link>

                <Link to="#signout" onClick={logout} className="nav_link">
                  Sign Out
                </Link>
              </>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomerNavbarComponent;
