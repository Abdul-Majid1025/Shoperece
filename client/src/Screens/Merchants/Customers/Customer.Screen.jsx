import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./Customer.styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import SearchIcon from "@mui/icons-material/Search";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../components/MessageBox/MessageBox";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";

import { getAllCustomer } from "../../../Redux/Actions/Stores.Actions";

const Customer = (props) => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.allCustomers);
  const { loading, error, allCustomersofStore } = allCustomers;

  let [customerArray, setCustomerArray] = useState();
  useEffect(() => {
    setCustomerArray(
      allCustomersofStore &&
        allCustomersofStore.customers &&
        allCustomersofStore.customers[0]
    );
  }, [allCustomersofStore]);

  useEffect(() => {
    dispatch(getAllCustomer(props.match.params.id));
  }, []);

  let filteredPrint = allCustomersofStore;
  const onChangeHandler = (event) => {
    filteredPrint =
      allCustomersofStore &&
      allCustomersofStore.customers &&
      allCustomersofStore.customers[0].filter((obj) => {
        return obj.username
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });

    setCustomerArray(filteredPrint);
  };
  let toBeSortedArray = allCustomersofStore;
  const highToLow = () => {
    toBeSortedArray = [
      ...(allCustomersofStore &&
        allCustomersofStore.customers &&
        allCustomersofStore.customers[0].sort(
          (a, b) => b.totalAmount - a.totalAmount
        )),
    ];

    setCustomerArray(toBeSortedArray);
  };
  const lowToHigh = () => {
    filteredPrint = [
      ...(allCustomersofStore &&
        allCustomersofStore.customers &&
        allCustomersofStore.customers[0].sort(
          (a, b) => a.totalAmount - b.totalAmount
        )),
    ];

    setCustomerArray(filteredPrint);
  };

  const highToLowOrders = () => {
    toBeSortedArray = [
      ...(allCustomersofStore &&
        allCustomersofStore.customers &&
        allCustomersofStore.customers[0].sort(
          (a, b) => b.totalOrders - a.totalOrders
        )),
    ];
    setCustomerArray(toBeSortedArray);
  };
  const lowToHighOrders = () => {
    toBeSortedArray = [
      ...(allCustomersofStore &&
        allCustomersofStore.customers &&
        allCustomersofStore.customers[0].sort(
          (a, b) => a.totalOrders - b.totalOrders
        )),
    ];
    setCustomerArray(toBeSortedArray);
  };
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="customercontainer container">
          <div className="viewproductdiv">
            <h2>Customer</h2>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <select
                      name="categories"
                      id="categories"
                      className="filterbtns"
                      onChange={(e) => {
                        if (e.target.value === "amounthightolow") {
                          highToLow();
                        } else if (e.target.value === "amountlowtohigh") {
                          lowToHigh();
                        } else if (e.target.value === "ordershightolow") {
                          highToLowOrders();
                        } else if (e.target.value === "orderslowtohigh") {
                          lowToHighOrders();
                        }
                      }}
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

                            <th>Orders</th>

                            <th colspan="2">Spent</th>
                          </tr>
                        </thead>
                        {customerArray &&
                          customerArray.length > 0 &&
                          customerArray.map((data, i) => {
                            return (
                              <tbody>
                                <tr>
                                  <td style={{ paddingLeft: "30px" }}>
                                    <a href="#">{data && data.username} </a>
                                  </td>

                                  <td>{data && data.totalOrders}</td>

                                  <td>{data && data.totalAmount}</td>
                                </tr>
                              </tbody>
                            );
                          })}
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

export default withRouter(Customer);
