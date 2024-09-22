import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./TrackOrder.styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar.component";

import StoreNavbarComponent from "../../../components/StoreNav/StoreNavbar.component";
import CustomerNavbarComponent from "../../../components/CutomerNav/Customer.Nav.component";

const TrackOrder = () => {
  return (
    <>
      <CustomerNavbarComponent />

      <div className="trackordercontainer container">
        <h1 className="text-center orderno">Order 1</h1>
        <div className="container myrow top orderhistory">
          <div className="mycol-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> abc
                    <br />
                    <strong>Address: </strong> xyz ,lahore, 63100
                  </p>
                  <p
                    style={{
                      backgroundColor: "#f02020",
                      color: "white",
                      paddingLeft: "20px",
                    }}
                  >
                    Not Delivered
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> Cash on Delivery
                  </p>
                  <p
                    style={{
                      backgroundColor: "#f02020",
                      color: "white",
                      paddingLeft: "20px",
                    }}
                  >
                    Not Paid
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Order Items</h2>
                  <ul>
                    <li>
                      <div className="myrow">
                        <p>Dell G5 SE 5505 Gaming Laptop </p>

                        <div>2 x 999.00 =1998.00</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="mycol-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="myrow">
                    <div>Order subtotal</div>
                    <div>1998.00</div>
                  </div>
                </li>
                <li>
                  <div className="myrow">
                    <div>Shipping</div>
                    <div>100.00</div>
                  </div>
                </li>
                <li>
                  <div className="myrow">
                    <div>Tax</div>
                    <div>0.00</div>
                  </div>
                </li>
                <li>
                  <div className="myrow">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>2098.00</strong>
                    </div>
                  </div>
                </li>
                {/* {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
