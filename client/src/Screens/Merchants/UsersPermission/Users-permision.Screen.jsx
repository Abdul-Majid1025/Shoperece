import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import "./Users-permission.Styles.css";
import { Link, withRouter } from "react-router-dom";
function Userpermision(props) {
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="userpermisioncontainer">
          <Container className="my-3 container1">
            <Row>
              <Col xs={12} md={1}>
                <Link to={`/settings/${props.match.params.id}`}>
                  <button
                    style={{
                      width: "35px",
                      height: "35px",
                      border: "1px solid lightgray",
                      borderRadius: "5px",
                      color: "gray",
                      backgroundColor: "rgb(241,242,243,1)",
                    }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      class="Polaris-Icon__Svg_375hu"
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path d="M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z"></path>
                    </svg>
                  </button>
                </Link>
              </Col>
              <Col className="my-2" xs={12} md={11}>
                <div>
                  <h5>Users and permissions</h5>
                </div>
              </Col>
            </Row>

            <Row className="my-3">
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Permissions</h6>
                  <span>Manage what users can see or do in your store.</span>
                </div>
              </Col>

              <Col xs={12} lg={8}>
                <div
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <Row className="p-3">
                    <Col xs={7} xl={9}>
                      <h6>Store onwer</h6>
                    </Col>
                    <Col xs={5} xl={3}>
                      <button
                        style={{
                          float: "right",
                          backgroundColor: "white",
                          border: "none",
                          color: "blue",
                        }}
                      >
                        Transfer onwership
                      </button>
                    </Col>
                  </Row>
                  <Row className="p-3">
                    <Col xs={1}>
                      <span
                        style={{
                          padding: "8px",
                          borderRadius: "50px",
                          backgroundColor: "lightpink",
                        }}
                      >
                        LB
                      </span>
                    </Col>
                    <Col xs={11}>
                      <a href="#" style={{ display: "block" }}>
                        Lakar Baba
                      </a>
                      <span>
                        Last login was Sunday, 31 October 2021 2:24 am GMT+5
                      </span>
                    </Col>
                  </Row>

                  <div
                    className="p-3"
                    style={{ backgroundColor: "rgb(250,251,251,1)" }}
                  >
                    Store owners have some permissions that can't be assigned to
                    staff. Learn more about
                    <span
                      className="ms-1"
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      store owner permissions
                    </span>
                  </div>
                </div>
                <div
                  className="my-4 p-3"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <h6>Staff (0 of 2)</h6>
                  <div>
                    Customize what your staff members can edit and access. You
                    can add up to 2 staff members on this plan.
                    <span
                      className="ms-1"
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Compare plans.
                    </span>
                  </div>
                  <Button className="my-3" variant="success">
                    Add staff
                  </Button>
                </div>
                <div
                  className="my-4 p-3"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <h6>Collaborators</h6>
                  <div>
                    These give designers, developers, and marketers access to
                    your Shopify admin. They don't count toward your staff
                    limit. Learn more about
                    <a
                      href="#"
                      className="ms-1"
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      collaborators
                    </a>
                  </div>

                  <hr />
                  <input type="radio" id="css" name="fav_language" />
                  <label className="ms-2" htmlFor="css">
                    {" "}
                    Anyone can send a collaborator request
                  </label>
                  <br />
                  <input type="radio" id="hello" name="fav_language" />
                  <label className="ms-2" htmlFor="hello">
                    {" "}
                    Only people with a collaborator request code can send a
                    collaborator request
                  </label>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Login services</h6>
                  <span>
                    Allow staff to use external services to log in to Shopify.
                  </span>
                </div>
              </Col>
              <Col className="my-2" xs={12} lg={8}>
                <div
                  className="my-4 p-3"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <Row className="mb-3">
                    <Col className="" xs={1}></Col>
                    <Col className="" xs={3}>
                      Name
                    </Col>
                    <Col className="" xs={6}>
                      Status
                    </Col>
                    <Col className="" xs={2}></Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className="" xs={1}>
                      <img
                        src="https://cdn.shopify.com/shopifycloud/web/assets/v1/850805d106eb423224b5d69e0482ee45.png"
                        alt="Enabled: Staff can use Google Apps to log in"
                      />
                    </Col>
                    <Col className="" xs={3}>
                      Google Apps
                    </Col>
                    <Col className="" xs={6}>
                      Disabled: Staff can't use Google Apps to log in
                    </Col>
                    <Col className="" xs={2}>
                      <button
                        style={{
                          backgroundColor: "white",
                          color: "blue",
                          border: "none",
                        }}
                      >
                        Edit
                      </button>
                    </Col>
                  </Row>
                  <hr />

                  {/* display on click of edit  */}

                  <div
                    className="p-4"
                    style={{
                      display: "none",
                      backgroundColor: "rgb(250,251,251,1)",
                      border: "1px solid lightgray",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label className="ms-2" htmlFor="vehicle1">
                      Enable Google Apps for login
                    </label>
                    <br />
                    <hr />
                    <p>What is your Google Apps domain?</p>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="example.com"
                    />
                    <br />
                    <Button style={{ float: "right" }} variant="light">
                      Save
                    </Button>
                    <br />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default withRouter(Userpermision);
