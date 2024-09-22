import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@popperjs/core";
import "./App.css";
import AddProduct from "./Screens/Merchants/AddProduct/AddProduct.Screen";
import AllOrders from "./Screens/Merchants/AllOrders/AllOrders.Screen";
import AllProducts from "./Screens/Merchants/AllProducts/AllProducts.Screen";
import Cart from "./Screens/Customer/Cart/Cart.component";
import Collections from "./Screens/Merchants/Collections/Collections.Screen";
import Customer from "./Screens/Merchants/Customers/Customer.Screen";
import Inventory from "./Screens/Merchants/Inventory/Inventory.Screen";
import ItemDescription from "./Screens/Customer/ItemDescription/ItemDescription.Screen";
import Pages from "./Screens/Merchants/Pages/Pages.Screen";
import TrackOrder from "./Screens/Customer/TrackOrder/TrackOrder.Screen";
import AdminDashboard from "./Screens/Admin/AdminDashboard/AdminDashboard.Screen";
import SignUp from "./Screens/Auth/SignUp/SignUp.Screen";
import SignIn from "./Screens/Auth/SignIn/SignIn.Screen";
import EditProfile from "./Screens/Merchants/EditProfile/EditProfile.Screen";
import AllDiscounts from "./Screens/Merchants/AllDiscounts/All-Discounts.Screen";
import CreateDiscount from "./Screens/Merchants/CreateDiscount/Create-Discount.Screen";
import CreateStore from "./Screens/Merchants/CreateStore/Create-Store.Screen";
import Editstore from "./Screens/Merchants/EditStore/Edit-Store.Screen";
import LandingPage from "./Screens/Merchants/FrontPage/FrontPage.Screen";
import Mypayment from "./Screens/Merchants/Payment/Payment.Screen";
import PaymentComponent from "./Screens/Merchants/PaymentDetails/Payment-Details.Screen";
import Setting from "./Screens/Merchants/Settings/Settings.Screen";
import Userpermision from "./Screens/Merchants/UsersPermission/Users-permision.Screen";
import ResetPassword from "./Screens/Auth/ResetPassword/ResetPassword";
import HomePage from "./Screens/Homepage/Homepage.Screen";
import AllStores from "./Screens/Merchants/AllStores/AllStores.Screen";
import Login from "./Screens/Customer/Login/Login.Screen";
import { useState } from "react";
import HomepageStores from "./Screens/Homepage/Stores.Screen";
import CustomerResetPassword from "./Screens/Customer/Login/Reset-Password.Screen";
import EditCustomerProfile from "./Screens/Customer/EditProfile/EditDetails.Screen";
import CustomerOrderHistory from "./Screens/Customer/Orders/Order-History.Screen";
import EditProduct from "./Screens/Merchants/EditProduct/EditProduct.Screen";
import CheckoutAddress from "./Screens/Customer/CheckoutAddress/CheckoutAddress.component";

function App() {
  const [loginModel, setLoginModel] = useState(false);
  const [loginModel2, setLoginModel2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  return (
    <div>
      <BrowserRouter>
        <main>
          {userInfo && userInfo.user.role === "merchant" && (
            <>
              <Route
                exact
                path="/collections/:id"
                component={Collections}
              ></Route>
              <Route exact path="/pages/:id" component={Pages}></Route>
              <Route
                exact
                path="/addproduct/:id"
                component={AddProduct}
              ></Route>

              <Route
                exact
                path="/allproducts/:id"
                component={AllProducts}
              ></Route>
              <Route
                exact
                path="/editproduct/:id"
                component={EditProduct}
              ></Route>
              <Route exact path="/inventory/:id" component={Inventory}></Route>
              <Route exact path="/customer/:id" component={Customer}></Route>
              <Route exact path="/allorders/:id" component={AllOrders}></Route>

              <Route
                exact
                path="/adddiscount/:id"
                component={AllDiscounts}
              ></Route>
              <Route exact path="/createstore" component={CreateStore}></Route>
              <Route exact path="/editstore/:id" component={Editstore}></Route>
              <Route exact path="/mypayment/:id" component={Mypayment}></Route>
              <Route exact path="/settings/:id" component={Setting}></Route>
              <Route
                exact
                path="/userpermisions/:id"
                component={Userpermision}
              ></Route>
              <Route exact path="/merchantstores" component={AllStores}></Route>

              <Route
                exact
                path="/paymentdetails"
                component={PaymentComponent}
              ></Route>

              <Route
                exact
                path="/creatediscount"
                component={CreateDiscount}
              ></Route>
            </>
          )}
          {customerInfo && customerInfo.user.role === "customer" && (
            <>
              <Route
                exact
                path="/trackorder/:id"
                component={TrackOrder}
              ></Route>

              <Route
                exact
                path="/orderhistory"
                component={CustomerOrderHistory}
              ></Route>
              <Route
                exact
                path="/edit-profile"
                component={EditCustomerProfile}
              ></Route>
            </>
          )}
          <Route exact path="/itemdetails/:storeId/:id">
            <ItemDescription setLoginModel={setLoginModel} />
          </Route>
          {userInfo && userInfo.user.role === "admin" && (
            <>
              <Route exact path="/admin" component={AdminDashboard}></Route>
            </>
          )}

          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/login" component={SignIn}></Route>
          <Route exact path="/editprofile" component={EditProfile}></Route>
          <Route exact path="/cart">
            <Cart setLoginModel={setLoginModel} />
          </Route>
          <Route exact path="/checkout">
            <CheckoutAddress />
          </Route>
          {/* <Route exact path="/customerlogin" component={Login}>
            <Login loginModel={loginModel} setLoginModel={setLoginModel} />
          </Route> */}
          <Route exact path="/customerlogin">
            <Login
              loginModel={loginModel}
              setLoginModel={setLoginModel}
              loginModel2={true}
              setLoginModel2={setLoginModel2}
            />
          </Route>
          <Login
            loginModel={loginModel}
            setLoginModel={setLoginModel}
            loginModel2={loginModel2}
            setLoginModel2={setLoginModel2}
          />
          <Route
            path="/reset-password/:token"
            component={ResetPassword}
          ></Route>
          <Route
            path="/customer-reset-password"
            component={CustomerResetPassword}
          ></Route>

          <Route exact path="/stores">
            <HomepageStores
              setLoginModel={setLoginModel}
              setLoginModel2={setLoginModel2}
            />
          </Route>
          <Route exact path="/store/:id">
            <LandingPage setLoginModel={setLoginModel} />
          </Route>
          <Route exact path="/">
            <HomePage
              setLoginModel={setLoginModel}
              setLoginModel2={setLoginModel2}
            />
          </Route>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

// "proxy": "http://127.0.0.1:5000",
// "proxy": "https://shoperece.herokuapp.com/",
