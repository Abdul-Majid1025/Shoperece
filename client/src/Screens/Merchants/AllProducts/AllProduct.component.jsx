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

const AllProductsComponent = (props) => {
  const { data, setAllProductsArray, allProductsArray } = props;
  const dispatch = useDispatch();

  const deleteAProduct = useSelector((state) => state.deleteAProduct);
  const { success } = deleteAProduct;

  const deleteProduct = (id) => {
    console.log("deleteProduct", props.match.params.id);
    allProductsArray.products.filter((product) => {
      console.log(product);
    });
  };

  return (
    <>
      <tr>
        <td style={{ paddingLeft: "30px" }}>{data && data[0].product.title}</td>

        <td>
          {data && data[0].product.isDraft && data[0].product.isDraft === "true"
            ? "Draft"
            : "Live"}
        </td>
        <td>{data && data[0].product.quantity} in Stocks</td>
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
          {/* <Link to="/EditProduct"> */}
          <DeleteIcon
            onClick={() => deleteProduct(data[0].product.productId)}
          />
          {/* </Link> */}
        </td>
      </tr>
    </>
  );
};

export default withRouter(AllProductsComponent);
