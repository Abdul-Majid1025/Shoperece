import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./Checkout.styles.css";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  cashDeliveryOrder,
  stripeOrder,
} from "../../../Redux/Actions/Order.Actions";

import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);

  const { cartItems } = userCart;
  console.log("cartItems", cartItems);

  let total =
    cartItems &&
    cartItems.reduce((sum, item) => {
      return parseInt(item.price) * parseInt(item.quantity) + sum;
    }, 0);

  let couponDiscount = 669;
  let TotalAmount = total - couponDiscount;

  const cashonDelivery = () => {
    console.log("cartItems", cartItems);
    dispatch(cashDeliveryOrder(cartItems, TotalAmount));
  };
  let priceForStripe = TotalAmount * 100;
  const published_key =
    "pk_test_51JMFxiSDJaeDh8bHKHYaDbufhLsORcDVPZLgzVsfoquVIYh8lZUSjp28rthc11NmwZZf6y3cCB81EI6SI9kfC53N00lugdTiPa";

  const onToken = (token) => {
    dispatch(stripeOrder(cartItems, TotalAmount, token));
  };
  return (
    <div className="checkcontainer">
      <Card className="mt-3">
        <Card.Header>TOTAL PRICE</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <span> ITEMS ({cartItems.length})</span> <span> {total}</span>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <span> DELIVERY CHARGES</span> <span> NONE</span>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <span> APPLY COUPONS</span>
                <span className="couponadded"> ABCDEF</span>
              </div>
              <span className="browsecoupon">
                BROWSE COUPONS <KeyboardArrowRightIcon />
              </span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <span>COUPONS DISCOUNT</span> <span> {couponDiscount} </span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="lastlist">
            <div className="d-flex justify-content-between">
              <span> TOTAL AMOUNT</span> <span> {TotalAmount} </span>
            </div>
          </ListGroup.Item>
        </ListGroup>
        {/* <Link
          to={`${location.pathname === "/checkout" ? "/payment" : "/checkout"}`}
        > */}
        <div className="d-flex flex-column justify-content-center align-items-center">
          {/* <Button className="checkoutbtn btn btn-dark" onClick={cashonDelivery}>
            PAY NOW
          </Button> */}
          <StripeCheckout
            className="checkoutbtn btn btn-dark"
            name="Shoperece"
            image="https://stripe.com/img/documentation/checkout/marketplace.png"
            description={`Total price is RS:${TotalAmount}`}
            label="STRIPE"
            panelLabel="Pay Now"
            amount={priceForStripe}
            currency="INR"
            stripeKey={published_key}
            shippingAddress
            billingAddress
            token={onToken}
          />
          <Button className="checkoutbtn btn btn-dark" onClick={cashonDelivery}>
            CASH ON DELIVERY
          </Button>
          {/* </Link> */}
        </div>
      </Card>
    </div>
  );
};

export default Checkout;
