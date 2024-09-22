import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar.component";

import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import "./Settings.Styles.css";
import { Link, withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getSingleStoreInfo } from "../../../Redux/Actions/Stores.Actions";

function Setting(props) {
  // const dispatch = useDispatch();
  // const currentStore = useSelector((state) => state.currentStore);
  // const { CurrentStore } = currentStore;

  // useEffect(() => {
  //   dispatch(getSingleStoreInfo(CurrentStore));
  // }, [CurrentStore]);
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="settingscontainer">
          <Container className="my-3 container1">
            <h5>Setting</h5>
            <div
              className="mt-4"
              style={{
                border: "1px solid lightgray",
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              <Row className="m-4">
                <Col
                  className="my-4"
                  id="setting_div"
                  style={{ cursor: "pointer" }}
                  xs={12}
                  md={6}
                >
                  <Link to={`/editstore/${props.match.params.id}`}>
                    <Row className="ms-4">
                      <Col className="my-2" xs={1}>
                        <span style={{ backgroundColor: "rgb(250,251,252,1)" }}>
                          <svg
                            style={{ width: "25px", height: "25px" }}
                            viewBox="0 0 20 20"
                            class="Polaris-Icon__Svg_375hu"
                            focusable="false"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9.027 0a1 1 0 0 0-.99.859l-.37 2.598A6.993 6.993 0 0 0 5.742 4.57l-2.437-.98a1 1 0 0 0-1.239.428L.934 5.981a1 1 0 0 0 .248 1.287l2.066 1.621a7.06 7.06 0 0 0 0 2.222l-2.066 1.621a1 1 0 0 0-.248 1.287l1.132 1.962a1 1 0 0 0 1.239.428l2.438-.979a6.995 6.995 0 0 0 1.923 1.113l.372 2.598a1 1 0 0 0 .99.859h2.265a1 1 0 0 0 .99-.859l.371-2.598a6.995 6.995 0 0 0 1.924-1.112l2.438.978a1 1 0 0 0 1.238-.428l1.133-1.962a1 1 0 0 0-.249-1.287l-2.065-1.621a7.063 7.063 0 0 0 0-2.222l2.065-1.621a1 1 0 0 0 .249-1.287l-1.133-1.962a1 1 0 0 0-1.239-.428l-2.437.979a6.994 6.994 0 0 0-1.924-1.113L12.283.86a1 1 0 0 0-.99-.859H9.027zm1.133 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                            ></path>
                          </svg>
                        </span>
                      </Col>
                      <Col xs={11}>
                        <h6 style={{ color: "blue" }}>General</h6>
                        <span style={{ display: "block" }}>
                          View and update your store detail
                        </span>
                      </Col>
                    </Row>
                  </Link>
                </Col>

                <Col
                  className="my-4"
                  id="setting_div"
                  style={{ cursor: "pointer" }}
                  xs={12}
                  md={6}
                >
                  <Link to={`/userpermisions/${props.match.params.id}`}>
                    <Row className="ms-4">
                      <Col className="my-2" xs={1}>
                        <span style={{ backgroundColor: "rgb(250,251,252,1)" }}>
                          <svg
                            style={{ width: "25px", height: "25px" }}
                            viewBox="0 0 20 20"
                            class="Polaris-Icon__Svg_375hu"
                            focusable="false"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 0c5.514 0 10 4.486 10 10s-4.486 10-10 10S0 15.514 0 10 4.486 0 10 0zm6.24 15a7.99 7.99 0 0 1-12.48 0 7.99 7.99 0 0 1 12.48 0zM10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                            ></path>
                          </svg>
                        </span>
                      </Col>
                      <Col xs={11}>
                        <h6 style={{ color: "blue" }}>Users and permissions</h6>
                        <span style={{ display: "block" }}>
                          Manage what users can see and do in your store
                        </span>
                      </Col>
                    </Row>
                  </Link>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default withRouter(Setting);
