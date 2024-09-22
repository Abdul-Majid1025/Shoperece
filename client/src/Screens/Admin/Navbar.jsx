import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import "../../components/Navbar/Navbar.Styles.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../Redux/Actions/Users.Actions";

const AdminNavbarComponent = (props) => {
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
              src="images/logo.png"
              className="d-inline-block align-top my-logo"
              alt=""
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="st_name">
            <span className="round-shop-name">AD</span>
            <NavDropdown
              title="Admin"
              id="navbarScrollingDropdown"
              className="Mer-Name"
            >
              <NavDropdown.Item href="/editprofile">
                Manage Account
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbarComponent;
