import axios from "axios";
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

export const customerLoginGoogle = (response, storeId) => async (dispatch) => {
  dispatch({
    type: CUSTOMER_SIGNIN_REQUEST,
    payload: { response, storeId },
  });
  try {
    const { data } = await axios.post("/api/customers/logingoogle", {
      response,
      storeId,
    });
    console.log("DARA", data);
    dispatch({ type: CUSTOMER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("customerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customerRegisteration =
  (username, email, password, phone, address, city, postal, storeId) =>
  async (dispatch) => {
    dispatch({
      type: CUSTOMER_REGISTER_REQUEST,
      payload: {
        username,
        email,
        password,
        phone,
        address,
        city,
        postal,
        storeId,
      },
    });
    try {
      const { data } = await axios.post("/api/customers/register", {
        username: username,
        email: email,
        password: password,
        phone: phone,
        address: address,
        city: city,
        postal: postal,
        storeId: storeId,
      });
      dispatch({ type: CUSTOMER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CUSTOMER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const customerLogin = (email, password, storeId) => async (dispatch) => {
  dispatch({
    type: CUSTOMER_SIGNIN_REQUEST,
    payload: { email, password, storeId },
  });
  try {
    const { data } = await axios.post("/api/customers/signin", {
      email: email,
      password: password,
      storeId: storeId,
    });
    dispatch({ type: CUSTOMER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("customerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customerUpdatePass = (email, storeId) => async (dispatch) => {
  dispatch({
    type: CUSTOMERS_UPDATEPASSWORD_REQUEST,
    payload: { email, storeId },
  });
  try {
    const { data } = await axios.post("/api/customers/resetpassword", {
      email: email,
      storeId: storeId,
    });
    dispatch({ type: CUSTOMERS_UPDATEPASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMERS_UPDATEPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customerPasswordReset =
  (password, token, storeId) => async (dispatch) => {
    dispatch({
      type: CUSTOMERS_RESETPASSWORD_REQUEST,
      payload: { password, token, storeId },
    });
    try {
      const { data } = await axios.post("/api/customers/password-reset", {
        password: password,
        token: token,
        storeId: storeId,
      });
      dispatch({ type: CUSTOMERS_RESETPASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CUSTOMERS_RESETPASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const customerUpdateProfile =
  (username, email, address, city, postal, phone, id) =>
  async (dispatch, getState) => {
    dispatch({
      type: CUSTOMERS_UPDATEPROFILE_REQUEST,
      payload: { username, email, address, city, postal, phone, id },
    });
    const {
      customerSignin: { customerInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/customers/updateprofile",
        {
          username: username,
          email: email,

          phone: phone,
          address: address,
          city: city,
          postal: postal,
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${customerInfo.user.token}` },
        }
      );

      dispatch({ type: CUSTOMERS_UPDATEPROFILE_SUCCESS, payload: data });
      localStorage.setItem("customerInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CUSTOMERS_UPDATEPROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProfile = (id) => async (dispatch, getState) => {
  dispatch({
    type: CUSTOMERS_DELETEACCOUNT_REQUEST,
    payload: { id },
  });
  const {
    customerSignin: { customerInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `/api/customers/deleteprofile/${id}`,

      {
        headers: { Authorization: `Bearer ${customerInfo.user.token}` },
      }
    );

    dispatch({ type: CUSTOMERS_DELETEACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMERS_DELETEACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customerSignout = () => (dispatch) => {
  // localStorage.removeItem("customerInfo");
  localStorage.clear();

  dispatch({ type: CUSTOMER_SIGNOUT });
};
