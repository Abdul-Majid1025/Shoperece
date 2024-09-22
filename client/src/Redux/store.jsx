import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import {
  userRegisterReducer,
  userSigninReducer,
  updatePassReducer,
  passwordResetReducer,
  updateProfileReducer,
  loginGoogleReducer,
  deleteProfileReducer,
} from "./Reducers/Users.Reducers";

import {
  createStoreReducer,
  getMerchantStoreReducer,
  setCurrentStoreReducer,
  setCustomerCurrentStoreReducer,
  getSingleStoreInfoReducer,
  getAllStoresReducer,
  getAllProductReducer,
  deleteMerchantStoreReducer,
  getQuantityReducer,
  getAllCustomerReducer,
} from "./Reducers/Stores.Reducers";
import {
  addProductReducer,
  setCurrentProductReducer,
  getProductDetailsReducer,
  editStoreProductReducer,
  increaseQuantityReducer,
  deleteProductReducer,
} from "./Reducers/Product.Reducer";
import {
  customerPasswordResetReducer,
  customerRegisterReducer,
  customerUpdatePassReducer,
  customerSigninReducer,
  customerLoginGoogleReducer,
  customerUpdateProfileReducer,
  deleteCustomerProfileReducer,
} from "./Reducers/Customer.Reducer";
import { addItemToCartReducer } from "./Reducers/Cart.Reducer";
import {
  cashOnDeliveryOrderReducer,
  stripeOrderReducer,
} from "./Reducers/Order.Reducer";
import { getAllMerchantsReducer } from "./Reducers/Admin.Reducer";
const initialState = {
  customerSignin: {
    customerInfo: localStorage.getItem("customerInfo")
      ? JSON.parse(localStorage.getItem("customerInfo"))
      : null,
  },

  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  userGoogleLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  currentStore: {
    CurrentStore: localStorage.getItem("CurrentStore")
      ? JSON.parse(localStorage.getItem("CurrentStore"))
      : null,
  },
  customerCurrentStore: {
    customerInStore: localStorage.getItem("customerInStore")
      ? JSON.parse(localStorage.getItem("customerInStore"))
      : null,
  },
  setProductDesc: {
    currentProduct: localStorage.getItem("currentProduct")
      ? JSON.parse(localStorage.getItem("currentProduct"))
      : null,
  },

  userCart: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
};

const reducer = combineReducers({
  userGoogleLogin: loginGoogleReducer,
  customerGoogleLogin: customerLoginGoogleReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  customerRegister: customerRegisterReducer,
  customerSignin: customerSigninReducer,
  passwordChange: updatePassReducer,
  resetPassword: passwordResetReducer,
  customerPasswordChange: customerUpdatePassReducer,
  customerResetPassword: customerPasswordResetReducer,
  createNewStore: createStoreReducer,
  getAllMerchantStores: getMerchantStoreReducer,
  UpdateMerchantProfile: updateProfileReducer,
  updateCustomerProfile: customerUpdateProfileReducer,
  currentStore: setCurrentStoreReducer,
  customerCurrentStore: setCustomerCurrentStoreReducer,
  addNewProduct: addProductReducer,
  getStoreInfo: getSingleStoreInfoReducer,
  getAllStores: getAllStoresReducer,
  setProductDesc: setCurrentProductReducer,
  productDetails: getProductDetailsReducer,
  ProductsOfStore: getAllProductReducer,
  editProduct: editStoreProductReducer,
  deleteAStore: deleteMerchantStoreReducer,
  userCart: addItemToCartReducer,
  deleteMerchantAccount: deleteProfileReducer,
  deleteCustomerAccount: deleteCustomerProfileReducer,
  inventoryData: getQuantityReducer,
  increaseQty: increaseQuantityReducer,
  deleteAProduct: deleteProductReducer,
  cashOnDeliveryOrder: cashOnDeliveryOrderReducer,
  allCustomers: getAllCustomerReducer,
  stripe: stripeOrderReducer,
  adminMerchants: getAllMerchantsReducer,
});
// to show redux store in chrome developer tools is to update compose function
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
