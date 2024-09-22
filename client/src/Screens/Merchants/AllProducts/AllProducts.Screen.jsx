import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./AllProducts.styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import SearchIcon from "@mui/icons-material/Search";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import { Link, withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../../../Redux/Actions/Stores.Actions";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MessageBox from "../../../components/MessageBox/MessageBox";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import AllProductsComponent from "./AllProduct.component";
import { deleteSingleProduct } from "../../../Redux/Actions/Products.Actions";

const AllProducts = (props) => {
  const dispatch = useDispatch();
  const [allProductsArray, setAllProductsArray] = useState([]);

  const currentStore = useSelector((state) => state.currentStore);
  const { CurrentStore } = currentStore;
  console.log("CurrentStore", CurrentStore);

  const ProductsOfStore = useSelector((state) => state.ProductsOfStore);
  const { allProducts, loading, error } = ProductsOfStore;
  console.log("allProducts", allProducts);

  const deleteAProduct = useSelector((state) => state.deleteAProduct);
  const { success } = deleteAProduct;

  useEffect(() => {
    dispatch(getAllProduct(props.match.params.id));
  }, []);

  useEffect(() => {
    setAllProductsArray(allProducts && allProducts.products);
  }, [allProducts]);

  const deleteProduct = (id) => {
    let result = allProductsArray.filter((product) => {
      return product[0].product.productId !== id;
    });

    setAllProductsArray(result);
    dispatch(deleteSingleProduct(id));
  };

  let filteredPrint = allProducts;
  const onChangeHandler = (event) => {
    console.log("State", allProductsArray);
    console.log(event.target.value);
    filteredPrint =
      allProducts &&
      allProducts.products.filter((obj) => {
        console.log("Inside", obj[0]);
        return obj[0].product.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    console.log("filteredPrint", filteredPrint);
    setAllProductsArray(filteredPrint);
  };

  let toBeSortedArray = allProducts;
  const highToLow = () => {
    console.log("State", allProductsArray);
    console.log("AllP", allProducts);
    toBeSortedArray = [
      ...(allProducts &&
        allProducts.products &&
        allProducts.products.sort((a, b) => {
          console.log(a, b);
          const nameA = a[0].product.title.toLowerCase();
          const nameB = b[0].product.title.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })),
    ];
    console.log("highToLow After", toBeSortedArray);
    // console.log("highToLow After customerArray", allMerchantsArray);
    setAllProductsArray(toBeSortedArray);
  };
  const lowToHigh = () => {
    console.log("State", allProductsArray);
    console.log("AllP", allProducts);
    toBeSortedArray = [
      ...(allProducts &&
        allProducts.products &&
        allProducts.products.sort((a, b) => {
          console.log(a, b);
          const nameA = a[0].product.title.toLowerCase();
          const nameB = b[0].product.title.toLowerCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        })),
    ];
    console.log("highToLow After", toBeSortedArray);
    // console.log("highToLow After customerArray", allMerchantsArray);
    setAllProductsArray(toBeSortedArray);
  };

  const categoryFilter = (event) => {
    console.log("State", allProductsArray);
    console.log(event.target.value);
    if (event.target.value.toLowerCase() === "reset") {
      setAllProductsArray(allProducts.products);
      return;
    }
    filteredPrint =
      allProducts &&
      allProducts.products.filter((obj) => {
        console.log("Inside", obj[0]);
        return (
          obj[0].product.category.toLowerCase() ===
          event.target.value.toLowerCase()
        );
      });
    console.log("filteredPrint", filteredPrint);
    setAllProductsArray(filteredPrint);
  };

  const statusFilter = (event) => {
    console.log("State", allProductsArray);
    console.log(event.target.value);
    filteredPrint =
      allProducts &&
      allProducts.products.filter((obj) => {
        console.log("Inside", obj[0]);
        return event.target.value === "draft"
          ? obj[0].product.isDraft === true
          : obj[0].product.isDraft === false;
      });
    console.log("filteredPrint", filteredPrint);
    setAllProductsArray(filteredPrint);
  };

  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="allproductscontainer container">
          <div className="addproductdiv">
            <h2>Products</h2>

            <Link to={`/addproduct/${props.match.params.id}`}>
              <button className="createbtn">Add Product</button>
            </Link>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="searchfilter mt-2">
            <div className="box shadow rounded bg-white">
              <div className="filteroptions">
                <span>All</span>
                {/* <span>Active</span>
                <span>Draft</span> */}
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
                        placeholder="Filter Products"
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <select
                      name="categories"
                      id="categories"
                      className="filterbtns"
                      onChange={categoryFilter}
                      // value="Availability"
                    >
                      <option value="reset">Categories</option>
                      <option value="shirts">Shirts</option>
                    </select>
                  </div>
                  <div className="col-md-1">
                    <select
                      name="status"
                      id="status"
                      className="filterbtns"
                      onChange={statusFilter}
                    >
                      <option>Status</option>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div className="col-md-1">
                    <button className="savedbtn">Saved</button>
                  </div>
                  <div className="col-md-1">
                    <select
                      name="sort"
                      id="sort"
                      className="filterbtns"
                      onChange={(e) => {
                        if (e.target.value === "titleA–Z") {
                          highToLow();
                        } else if (e.target.value === "titleZ–A") {
                          lowToHigh();
                        }
                      }}
                    >
                      <option>Sort</option>
                      <option value="titleA–Z">Product Title A–Z</option>
                      <option value="titleZ–A">Product Title Z–A</option>
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
                            <th>Inventory</th>
                            <th colspan="2">Type</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        {allProductsArray &&
                          allProductsArray.length > 0 &&
                          allProductsArray.map((data, i) => {
                            console.log(data);
                            return (
                              <tbody>
                                {/* <AllProductsComponent
                                  data={data}
                                  allProductsArray={allProductsArray}
                                  setAllProductsArray={setAllProductsArray}
                                /> */}
                                <tr>
                                  <td style={{ paddingLeft: "30px" }}>
                                    {data && data[0].product.title}
                                  </td>

                                  <td>
                                    {data &&
                                    data[0].product.isDraft &&
                                    data[0].product.isDraft === "true"
                                      ? "Draft"
                                      : "Live"}
                                  </td>
                                  <td>
                                    {data && data[0].product.quantity} in Stocks
                                  </td>
                                  <td>{data && data[0].product.category}</td>
                                  <td>
                                    <a href="#">
                                      <i className="fa fa-trash-o"></i>
                                    </a>
                                  </td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: `/editProduct/${props.match.params.id}`,
                                        state: {
                                          from: {
                                            data: {
                                              data,
                                            },
                                          },
                                        },
                                      }}
                                    >
                                      <EditIcon />
                                    </Link>
                                  </td>
                                  <td>
                                    <DeleteIcon
                                      onClick={() =>
                                        deleteProduct(data[0].product.productId)
                                      }
                                    />
                                  </td>
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

export default withRouter(AllProducts);
