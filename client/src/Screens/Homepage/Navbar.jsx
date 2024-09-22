import React from "react";
import { FaBars } from "react-icons/fa";
import "./Homepage.Styles.css";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { signout } from "../../Redux/Actions/Users.Actions";

const RootNavbar = ({ setLoginModel, setLoginModel2 }) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  let { userInfo, loading, error } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const signoutHandler = () => {
    dispatch(signout());
    window.location.href = "/";
  };

  return (
    <div className="rootpagecontainer">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className="navlogo">
            Shoperece
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-center align-items-center me-auto">
              <NavLink className="navlink" to="/">
                Home
              </NavLink>
              <NavLink className="navlink" to="/about">
                About
              </NavLink>
              <NavLink className="navlink" to="/contact">
                Contact
              </NavLink>
              <NavLink className="navlink" to="/stores">
                Stores
              </NavLink>
              {userInfo && userInfo.user.username ? (
                <Link onClick={signoutHandler} className="navlink" activeStyle>
                  {/* <button className="navlink" activeStyle> */}
                  Log out
                  {/* </button> */}
                </Link>
              ) : customerInfo && customerInfo.user.username ? (
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
                    <NavLink to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  {/* <Link className="navlink" to="/login" activeStyle>
                Sign In
              </Link> */}
                  <Dropdown>
                    <Dropdown.Toggle
                      className="dropdownbtn"
                      variant="dark"
                      id="dropdown-basic"
                    >
                      Sign In
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <NavLink to="/login">As Merchant</NavLink>
                      <NavLink
                        onClick={(e) => setLoginModel2(true)}
                        to="#login"
                      >
                        As User
                      </NavLink>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
              <div className="navbtn">
                {/* <Link className="navbtnlink" to="/signup">
              Sign Up
            </Link> */}
                <Dropdown>
                  <Dropdown.Toggle
                    className="navbtnlink"
                    variant="dark"
                    id="dropdown-basic"
                  >
                    Sign Up
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <NavLink to="/signup">As Merchant</NavLink>
                    <NavLink onClick={(e) => setLoginModel(true)} to="#signup">
                      As User
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default RootNavbar;
