import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";

import "./All-Discounts.Styles.css";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import { Link, withRouter } from "react-router-dom";

const AllDiscounts = (props) => {
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="alldiscountcontainer">
          <div className="container1">
            <div className="d-flex justify-content-between">
              <h2>Discounts</h2>

              <Link to="/creatediscount" className="button1">
                <b>Create Discount</b>
              </Link>
            </div>
            <div className="container2">
              <div className="nav">
                <a className="active" href="#">
                  All
                </a>
                <a href="#">Active</a>
                <a href="#">Expired</a>
              </div>
              <hr />
              <div className="inrow">
                <div className="DiscountCode">
                  <h4>Shoperece-1T4E5G</h4>
                  <text className="Description">
                    15% off all products, One use per customer
                  </text>
                </div>
                <div>
                  <text className="Status">Active</text>
                </div>
                <div className="Dates">
                  <text>Oct 11 - Dec 30</text>
                </div>
              </div>
              <hr />
              <div className="inrow">
                <div className="DiscountCode">
                  <h4>Shoperece-4Y6E9U</h4>

                  <text className="Description">
                    10% off all products, One use per customer
                  </text>
                </div>
                <div>
                  <text className="Status">Expired</text>
                </div>
                <div className="Dates">
                  <text>Oct 29 - Oct 30</text>
                </div>
              </div>
              <hr />
              <div className="inrow">
                <div className="DiscountCode">
                  <h4>Shoperece-9F4E1t</h4>
                  <text className="Description">
                    15% off all products, One use per customer
                  </text>
                </div>
                <div>
                  <text className="Status">Active</text>
                </div>
                <div className="Dates">
                  <text>Nov 29 - Dec 15</text>
                </div>
              </div>
              <hr />
              <div className="inrow">
                <div className="DiscountCode">
                  <h4>Shoperece-4H7E5N</h4>
                  <text className="Description">
                    15% off all products, One use per customer
                  </text>
                </div>
                <div>
                  <text className="Status">Expired</text>
                </div>
                <div className="Dates">
                  <text>Oct 29 - Oct 30</text>
                </div>
              </div>
              <hr />
              <div className="inrow">
                <div className="DiscountCode">
                  <h4>Shoperece-1T4E5G</h4>
                  <text className="Description">
                    15% off all products, One use per customer
                  </text>
                </div>
                <div>
                  <text className="Status">Expired</text>
                </div>
                <div className="Dates">
                  <text>Oct 13 - Oct 30</text>
                </div>
              </div>
              <hr />
              <div className="inrow">
                <div className="DiscountCode">
                  <h4>Shoperece-1T4E5G</h4>
                  <text className="Description">
                    15% off all products, One use per customer
                  </text>
                </div>
                <div>
                  <text className="Status">Active</text>
                </div>
                <div className="Dates">
                  <text>Sep 1 - jan 1</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(AllDiscounts);
