import React, { useState } from "react";
import Checkout from "../Checkout/Checkout.component";
// import CheckoutSteps from "../CheckoutSteps/CheckoutSteps.component";
import "./CheckoutAddress.styles.css";

import { useMediaQuery } from "react-responsive";
import TextField from "@mui/material/TextField";
import CustomerNavbarComponent from "../../../components/CutomerNav/Customer.Nav.component";
import { useSelector, useDispatch } from "react-redux";
import MessageBox from "../../../components/MessageBox/MessageBox";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import { clearCart } from "../../../Redux/Actions/Cart.Actions";

const CheckoutAddress = () => {
  const dispatch = useDispatch();
  const isLg = useMediaQuery({ query: "(max-width: 900px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 650px)" });

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const userCart = useSelector((state) => state.userCart);

  const { cartItems } = userCart;
  if (!customerInfo) {
    window.location.href = "/customerlogin";
  }

  const [email, setEmail] = useState(customerInfo && customerInfo.user.email);
  const [firstName, setFirstName] = useState(
    customerInfo && customerInfo.user.username
  );
  const [phone, setPhone] = useState(customerInfo && customerInfo.user.phone);
  const [pinCode, setPinCode] = useState(
    customerInfo && customerInfo.user.postalCode
  );
  const [city, setCity] = useState(customerInfo && customerInfo.user.city);

  const [address, setAddress] = useState(
    customerInfo && customerInfo.user.address
  );

  const cashOnDeliveryOrder = useSelector((state) => state.cashOnDeliveryOrder);
  const { loading, error, success, order } = cashOnDeliveryOrder;

  const stripe = useSelector((state) => state.stripe);
  const {
    stripeData,
    loading: stripeLoading,
    error: stripeError,
    success: stripeSuccess,
  } = stripe;

  if (order) {
    dispatch(clearCart());
    window.location.href = `/trackorder/${order.order.id}`;
  }
  if (stripeData) {
    dispatch(clearCart());
    window.location.href = `/trackorder/${stripeData.order.id}`;
  }

  return (
    <>
      <CustomerNavbarComponent />
      <div className="checkoutAddresscontainer">
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">Order Created Successfully</MessageBox>
        )}
        {stripeLoading && <LoadingBox></LoadingBox>}
        {stripeError && <MessageBox variant="danger">{stripeError}</MessageBox>}
        {stripeSuccess && (
          <MessageBox variant="success">Order Created Successfully</MessageBox>
        )}
        {isTablet ? (
          <div className="tabletaddresscontainer">
            <div
              // style={{ marginRight: "50px" }}
              className="tabheader d-flex justify-content-between align-items-center"
            >
              <h4 style={{ marginBottom: "0px" }} className="addresstitle">
                ADDRESS
              </h4>
              {/* <CheckoutSteps step1 step2 /> */}
            </div>

            <div className="address w-100" style={{ paddingRight: "20px" }}>
              <div className="d-flex flex-column m-auto fields">
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="firstname"
                      id="firstname"
                      label="Username"
                      value={firstName}
                      variant="standard"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <TextField
                      className="mb-2 w-100"
                      name="email"
                      id="email"
                      label="Email"
                      value={email}
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="phone"
                      id="phone"
                      type="number"
                      label="Mobile Number"
                      value={phone}
                      variant="standard"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <TextField
                      className="mb-2 w-100"
                      name="pincode"
                      id="pincode"
                      label="Postal Code"
                      variant="standard"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <TextField
                      className="mb-2 w-100"
                      name="city"
                      id="city"
                      label="City"
                      value={city}
                      variant="standard"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="address"
                      id="address"
                      label="Address"
                      variant="standard"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="checkoutcontaineer"
              style={{ margin: "20px", marginLeft: "0px" }}
            >
              <div className="w-100 mt-3 d-flex flex-column">
                <Checkout array={cartItems} />
              </div>
            </div>
          </div>
        ) : isLg ? (
          <>
            <div
              style={{ marginRight: "50px" }}
              className="lgcheckout d-flex justify-content-between align-items-center"
            >
              <h4 style={{ marginBottom: "0px" }} className="addresstitle">
                ADDRESS
              </h4>
              {/* <CheckoutSteps step1 step2 /> */}
            </div>
            <div className=".addresscontainer d-flex">
              <div className="d-flex flex-column fields">
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="firstname"
                      id="firstname"
                      label="Username"
                      variant="standard"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="email"
                      id="email"
                      label="Email"
                      value={email}
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="phone"
                      id="phone"
                      type="number"
                      label="Mobile Number"
                      variant="standard"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="pincode"
                      id="pincode"
                      label="Postal Code"
                      variant="standard"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="city"
                      id="city"
                      label="City"
                      value={city}
                      variant="standard"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <TextField
                      className="mb-2 w-100"
                      name="address"
                      id="address"
                      label="Address"
                      variant="standard"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="checkoutcontaineer" style={{ margin: "20px" }}>
              <div className="w-100 mt-3 d-flex flex-column">
                <Checkout array={cartItems} />
              </div>
            </div>
          </>
        ) : (
          <div className="checkoutAddresscontainer2">
            <div className="d-flex flex-column container1">
              <h4 className="addresstitle">ADDRESS</h4>

              <div className="address1">
                <div className="d-flex flex-column m-auto fields">
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 w-100"
                        name="firstname"
                        id="firstname"
                        label="Username"
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 w-100"
                        name="email"
                        id="email"
                        label="Email"
                        value={email}
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 w-100"
                        name="phone"
                        id="phone"
                        type="number"
                        label="Mobile Number"
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 w-100"
                        name="pincode"
                        id="pincode"
                        label="Postal Code"
                        value={pinCode}
                        variant="standard"
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 w-100"
                        name="city"
                        id="city"
                        label="City"
                        variant="standard"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 w-100"
                        name="address"
                        id="address"
                        label="Address"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkoutcontaineer">
              <div className="mt-3 d-flex flex-column">
                {/* <CheckoutSteps step1 step2 /> */}
                <Checkout />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default CheckoutAddress;
