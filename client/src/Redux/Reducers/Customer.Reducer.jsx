import {
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNOUT,
  CUSTOMERS_UPDATEPASSWORD_FAIL,
  CUSTOMERS_UPDATEPASSWORD_SUCCESS,
  CUSTOMERS_UPDATEPASSWORD_REQUEST,
  CUSTOMERS_RESETPASSWORD_REQUEST,
  CUSTOMERS_RESETPASSWORD_SUCCESS,
  CUSTOMERS_RESETPASSWORD_FAIL,
  CUSTOMERS_UPDATEPROFILE_REQUEST,
  CUSTOMERS_UPDATEPROFILE_SUCCESS,
  CUSTOMERS_UPDATEPROFILE_FAIL,
  CUSTOMERS_DELETEACCOUNT_REQUEST,
  CUSTOMERS_DELETEACCOUNT_SUCCESS,
  CUSTOMERS_DELETEACCOUNT_FAIL,
} from "../Constants/Customer.Constants";

export const customerLoginGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNIN_REQUEST:
      return { loading: true };
    case CUSTOMER_SIGNIN_SUCCESS:
      return {
        loading: false,
        ...state,

        customerInfo: action.payload,
      };
    case CUSTOMER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REGISTER_REQUEST:
      return { loading: true };
    case CUSTOMER_REGISTER_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CUSTOMER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNIN_REQUEST:
      return { loading: true };
    case CUSTOMER_SIGNIN_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const customerUpdatePassReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMERS_UPDATEPASSWORD_REQUEST:
      return { loading: true };
    case CUSTOMERS_UPDATEPASSWORD_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMERS_UPDATEPASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const customerPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMERS_RESETPASSWORD_REQUEST:
      return { loading: true };
    case CUSTOMERS_RESETPASSWORD_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMERS_RESETPASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const customerUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMERS_UPDATEPROFILE_REQUEST:
      return { loading: true };
    case CUSTOMERS_UPDATEPROFILE_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMERS_UPDATEPROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteCustomerProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMERS_DELETEACCOUNT_REQUEST:
      return { loading: true };
    case CUSTOMERS_DELETEACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMERS_DELETEACCOUNT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
