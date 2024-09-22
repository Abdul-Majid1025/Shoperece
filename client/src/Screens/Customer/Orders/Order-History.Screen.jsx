import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";

import Sidebar from "../../../components/Sidebar/Sidebar.component";
import SearchIcon from "@mui/icons-material/Search";

import StoreNavbarComponent from "../../../components/StoreNav/StoreNavbar.component";
import CustomerNavbarComponent from "../../../components/CutomerNav/Customer.Nav.component";

const CustomerOrderHistory = () => {
  return (
    <>
      <CustomerNavbarComponent />
      <div className="setsidebar">
        <Sidebar></Sidebar>
        <div className="allorderscontainer container">
          <div className="viewproductdiv">
            <h2>Orders</h2>
          </div>
          <div className="searchfilter">
            <div className="box shadow rounded bg-white">
              <div className="filteroptions">
                <span>All</span>
              </div>
              <div className="row1">
                <div className="row">
                  <div className="col-md-10">
                    <div className="searchdiv">
                      <SearchIcon className="searchicon" />
                      <input
                        className="search"
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search Customers"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <select
                      name="categories"
                      id="categories"
                      className="filterbtns"
                      // value="Availability"
                    >
                      <option>Sort</option>
                      <option value="amounthightolow">
                        Amount spent (high to low)
                      </option>
                      <option value="amountlowtohigh">
                        Amount spent (low to high)
                      </option>
                      <option value="ordershightolow">
                        Total orders (high to low)
                      </option>
                      <option value="orderslowtohigh">
                        Total orders (low to high)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div id="basket" className="col-lg-12">
                  <div className="box mt-0 pb-0 no-horizontal-padding">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th style={{ paddingLeft: "30px" }}>Name</th>

                            <th>OrderId</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Date</th>

                            <th colspan="2">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ paddingLeft: "30px" }}>
                              <a href="#">Abc </a>
                            </td>

                            <td>1</td>
                            <td>Not Paid</td>
                            <td>Not Delivered</td>

                            <td>30/10/2021</td>
                            <td>2000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrderHistory;
