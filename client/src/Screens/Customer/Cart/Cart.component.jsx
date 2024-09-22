import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./Cart.styles.css";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import Sidebar from "../../../components/Sidebar/Sidebar.component";

import { useDispatch, useSelector } from "react-redux";
import CustomerNavbarComponent from "../../../components/CutomerNav/Customer.Nav.component";
import { Link, withRouter } from "react-router-dom";
import {
  addItemToCart,
  clearItem,
  removeFromCart,
} from "../../../Redux/Actions/Cart.Actions";
import ListCart from "./ListCartItem.component";
import OrderSummary from "../../../components/OrderSummary/OrderSummary.component";
import Checkout from "../Checkout/Checkout.component";

const Cart = (props) => {
  const { setLoginModel } = props;
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems } = userCart;
  console.log("cartItems", cartItems);

  let total =
    cartItems &&
    cartItems.reduce((sum, item) => {
      return parseInt(item.price) * parseInt(item.quantity) + sum;
    }, 0);

  // setTotalPrice(total);

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;
  console.log("customerInfo.", customerInfo);
  const checkoutHandler = () => {
    if (!customerInfo) {
      props.history.push("/customerlogin?redirect=checkout");
    } else window.location.href = "/checkout";
  };
  return (
    <>
      <CustomerNavbarComponent setLoginModel={setLoginModel} />

      <div className="cartcontainer container">
        <div id="heading-breadcrumbs">
          <div className="container">
            <div className="row d-flex align-items-center flex-wrap">
              <div className="col-md-7">
                <h1 className="h2">Shopping Cart</h1>
              </div>
              <div className="col-md-5">
                <ul className="breadcrumb d-flex justify-content-end">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Shopping Cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="content">
          <div className="container">
            <div className="row bar">
              <div className="col-lg-12">
                <p className="text-muted lead">
                  You currently have {cartItems && cartItems.length} item(s) in
                  your cart.
                </p>
              </div>
              <div id="basket" className="col-lg-12">
                <div className="box mt-0 pb-0 no-horizontal-padding">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan="2">Title</th>
                          <th>Quantity</th>
                          <th style={{ whiteSpace: "nowrap" }}>Unit price</th>
                          {/* <th>Discount</th> */}
                          <th colSpan="2">Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems &&
                          cartItems.map((data) => <ListCart data={data} />)}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan="5">Total</th>
                          <th colSpan="2">{total}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="box-footer d-flex justify-content-between align-items-center">
                    <div className="left-col">
                      <Link to="/stores" className="btn continueshopping mt-0">
                        <i className="fa fa-chevron-left"></i> Continue shopping
                      </Link>
                    </div>
                    <div className="right-col">
                      <div className="right-col">
                        <Link
                          to="/checkout"
                          // onClick={checkoutHandler}
                          className="btn btn-dark mt-0 checkoutbtn"
                        >
                          Proceed to checkout
                          <i className="fa fa-chevron-right"></i>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-5">
                <Checkout />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Cart);
