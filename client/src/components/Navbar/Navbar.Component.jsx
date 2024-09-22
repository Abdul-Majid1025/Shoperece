import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import "./Navbar.Styles.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../Redux/Actions/Users.Actions";

const MyNavbarComponent = (props) => {
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
          {/* <img src="src/Components/Navbar/Navbar.component.js" /> */}
          {/* <img src="public/Images" /> */}
          {/* <img src="..../public/Images/Shoperece-logos_black.png" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav> */}
          <div className="searchdiv">
            <Form className="d-flex">
              <SearchIcon className="searchicon" />
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 search_nav"
                aria-label="Search"
              />
            </Form>
          </div>
          <div className="st_name">
            <span className="round-shop-name">SN</span>
            <NavDropdown
              title="Shoperece"
              id="navbarScrollingDropdown"
              className="Mer-Name"
            >
              <NavDropdown.Item href="#">Manage Account</NavDropdown.Item>
              <NavDropdown.Item href="/merchantstores">Stores</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Shoperece Help Center
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Community Forms</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Hire a Shoperece Expert
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbarComponent;
