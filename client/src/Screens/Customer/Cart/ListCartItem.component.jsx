import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./Cart.styles.css";

import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  clearItem,
  removeFromCart,
} from "../../../Redux/Actions/Cart.Actions";

const ListCart = ({ data }) => {
  const dispatch = useDispatch();
  // const [price, setPrice] = useState(data ? data.quantity * data.price : []);

  return (
    <>
      <tr>
        <td>
          <img
            src={`/${data.image}`}
            className="img-fluid"
            alt=""
            style={{ width: "50px" }}
          />
        </td>
        <td>{data.title}</td>
        <td>
          <span className="quantity">
            <div
              className="arrow"
              onClick={() => dispatch(removeFromCart(data))}
            >
              &#10094;
            </div>
            <span className="value">{data.quantity}</span>
            <div
              className="arrow"
              onClick={() => dispatch(addItemToCart(data))}
            >
              &#10095;
            </div>
          </span>
        </td>
        <td>{data.price}</td>
        {/* <td>0.00</td> */}
        <td>{data.quantity * data.price}</td>
        <td>
          <div
            className="remove-button"
            onClick={() => dispatch(clearItem(data))}
          >
            &#10005;
          </div>
        </td>
      </tr>
    </>
  );
};

export default ListCart;
