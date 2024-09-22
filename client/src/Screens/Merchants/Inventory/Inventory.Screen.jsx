import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./Inventory.styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import SearchIcon from "@mui/icons-material/Search";
import { Link, withRouter } from "react-router-dom";

import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import { useSelector, useDispatch } from "react-redux";
import { getQuantity } from "../../../Redux/Actions/Stores.Actions";
import InventoryComponent from "./Inventory.component";

const Inventory = (props) => {
  const dispatch = useDispatch();
  const inventoryData = useSelector((state) => state.inventoryData);
  let { inventory } = inventoryData;
  console.log("Inventory", inventory);

  const increaseQty = useSelector((state) => state.increaseQty);
  const { success } = increaseQty;
  let [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(inventory);
  }, [inventory]);

  useEffect(() => {
    dispatch(getQuantity(props.match.params.id));
  }, []);

  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="inventorycontainer container">
          <div className="viewproductdiv">
            <h2>Inventory</h2>
            <Link to="/allproducts" className="createbtn">
              View Products
            </Link>
          </div>
          <div className="searchfilter">
            <div className="box shadow rounded bg-white">
              <div className="filteroptions">
                <span>All</span>
              </div>
              <div className="row1">
                <div className="row">
                  <div className="col-md-7">
                    <div className="searchdiv">
                      <SearchIcon className="searchicon" />
                      <input
                        className="search"
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search Inventory"
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
                      <option>Categories</option>
                      <option value="shirts">Shirts</option>
                    </select>
                  </div>
                  <div className="col-md-1">
                    <select name="status" id="status" className="filterbtns">
                      <option>Status</option>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div className="col-md-1">
                    <button className="savedbtn">Saved</button>
                  </div>
                  <div className="col-md-1">
                    <select name="sort" id="sort" className="filterbtns">
                      <option>Sort</option>
                      <option value="ascending">
                        Sort by Available (ascending)
                      </option>
                      <option value="descending">
                        Sort by Available (descending)
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
                            <th style={{ paddingLeft: "30px" }}>Product</th>

                            <th>Status</th>

                            <th>Available</th>
                            <th colspan="3">Edit Available Quantity</th>
                          </tr>
                        </thead>
                        {products &&
                          products.items &&
                          products.items.map((data, i) => {
                            return (
                              <tbody key={data.product.productId}>
                                <InventoryComponent
                                  data={data}
                                  setProducts={setProducts}
                                  products={products}
                                />
                                {/* <tr>
                                  <td style={{ paddingLeft: "30px" }}>
                                    {data.product.title.substring(0, 50)}
                                  </td>

                                  <td>
                                    {data &&
                                    data.product.isDraft &&
                                    data.product.isDraft === "true"
                                      ? "Draft"
                                      : "Live"}
                                  </td>

                                  <td>
                                    {" "}
                                    {data && data.product.quantity} in Stocks
                                  </td>
                                  <td className="d-flex ">
                                    <input
                                      type="number"
                                      name="quantity"
                                      id="quantity"
                                      placeholder="0"
                                      style={{ width: "50px" }}
                                      onChange={(e) =>
                                        setNewQty(e.target.value)
                                      }
                                    />
                                    <button
                                      className="addquantity btn btn-dark"
                                      onClick={() =>
                                        addQuantity(
                                          data.product.productId,
                                          data.product.quantity
                                        )
                                      }
                                    >
                                      Add
                                    </button>
                                  </td>
                                </tr> */}
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

export default withRouter(Inventory);
