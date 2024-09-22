import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./Payment-Details.Styles.css";

const PaymentComponent = (props) => {
  return (
    <div className="payment_div">
      <div className="payment_top">
        <h2 className="payment_det">Add Payment Details</h2>
        <div className="payment_imgs">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/visa-v3.svg"
            className="p_img_1"
          />
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/mastercard-v2.svg"
            className="p_img_2"
          />
        </div>
      </div>
      <div className="payment_form">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              placeholder="First Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              placeholder="Last Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              placeholder="Card Number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              placeholder="Expiration Date (MM/YY)"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              placeholder="Security Code (CVV)"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="payment_btn">
            Pay Now
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentComponent;
