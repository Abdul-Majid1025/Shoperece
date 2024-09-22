import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";

import { useSelector } from "react-redux";

const OrderSummary = () => {
  const userCart = useSelector((state) => state.userCart);

  const { cartItems } = userCart;
  console.log("cartItems", cartItems);

  let total =
    cartItems &&
    cartItems.reduce((sum, item) => {
      return parseInt(item.price) * parseInt(item.quantity) + sum;
    }, 0);

  // setTotalPrice(total);

  return (
    <>
      <div id="order-summary" className="box mt-0 mb-4 p-0">
        <div className="box-header mt-0">
          <h3>Order summary</h3>
        </div>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <td>Order subtotal</td>
                <th>{total}</th>
              </tr>
              <tr>
                <td>Shipping </td>
                <th>0.00</th>
              </tr>
              <tr>
                <td>Tax</td>
                <th>0.00</th>
              </tr>
              <tr className="total">
                <td>Total</td>
                <th>{total}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
