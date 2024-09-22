import axios from "axios";
import {
  STORE_REGISTER_REQUEST,
  STORE_REGISTER_SUCCESS,
  STORE_REGISTER_FAIL,
  GET_MERCHANTSTORES_REQUEST,
  GET_MERCHANTSTORES_SUCCESS,
  GET_MERCHANTSTORES_FAIL,
  SET_CURRENT_STORE,
  SET_CUSTOMERCURRENT_STORE,
  STORE_INFORMATION_FAIL,
  STORE_INFORMATION_REQUEST,
  STORE_INFORMATION_SUCCESS,
  GET_ALLSTORES_REQUEST,
  GET_ALLSTORES_SUCCESS,
  GET_ALLSTORES_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAIL,
  GET_MERCHANTCUSTOMERS_REQUEST,
  GET_MERCHANTCUSTOMERS_SUCCESS,
  GET_MERCHANTCUSTOMERS_FAIL,
} from "../Constants/Stores.Constants";

export const getAllStore = () => async (dispatch) => {
  dispatch({
    type: GET_ALLSTORES_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/stores/all`);
    dispatch({ type: GET_ALLSTORES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALLSTORES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMerchantStore = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_STORE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/stores/deletestore/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.user.token}` },
    });
    dispatch({ type: DELETE_STORE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMerchantStores = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_MERCHANTSTORES_REQUEST,
    payload: { id },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/stores/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.user.token}` },
    });
    dispatch({ type: GET_MERCHANTSTORES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MERCHANTSTORES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleStoreInfo = (id) => async (dispatch) => {
  dispatch({
    type: STORE_INFORMATION_REQUEST,
    payload: { id },
  });
  try {
    const { data } = await axios.get(`/api/stores/getstoreinfo/${id}`);
    dispatch({ type: STORE_INFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STORE_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleStoreInformation = (id) => async (dispatch, getState) => {
  dispatch({
    type: STORE_INFORMATION_REQUEST,
    payload: { id },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/stores/getsinglestoreinfo/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.user.token}` },
    });
    dispatch({ type: STORE_INFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STORE_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStore =
  (
    storeName,
    firstName,
    lastName,
    address,
    apartment,
    city,
    postalCode,
    phone,
    url,
    isRegistered,
    id,
    media
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: STORE_REGISTER_REQUEST,
      payload: {
        storeName,
        firstName,
        lastName,
        address,
        apartment,
        city,
        postalCode,
        phone,
        url,
        isRegistered,
        id,
        media,
      },
    });
    const formData = new FormData();

    formData.append("file", media);
    formData.append("storeName", storeName);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    formData.append("apartment", apartment);

    formData.append("city", city);
    formData.append("postalCode", postalCode);
    formData.append("phone", phone);
    formData.append("url", url);
    formData.append("isRegistered", isRegistered);
    formData.append("id", id);
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post("/api/stores/create", formData, {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      });
      dispatch({ type: STORE_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: STORE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const setCurrentStore = (id) => {
//   localStorage.setItem("CurrentStore", JSON.stringify(id));
//   return {
//     type: SET_CURRENT_STORE,
//     payload: id,
//   };
// };

// export const setCustomerCurrentStore = (id) => {
//   localStorage.setItem("customerInStore", JSON.stringify(id));
//   return {
//     type: SET_CUSTOMERCURRENT_STORE,
//     payload: id,
//   };
// };

export const getAllProduct = (CurrentStore) => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCTS_REQUEST,
    payload: {
      CurrentStore,
    },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/stores/getallproducts",
      {
        CurrentStore,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllCustomer = (CurrentStore) => async (dispatch, getState) => {
  console.log("getAllCustomer");
  dispatch({
    type: GET_MERCHANTCUSTOMERS_REQUEST,
    payload: {
      CurrentStore,
    },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/stores/getallcustomers",
      {
        CurrentStore: CurrentStore,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );
    dispatch({ type: GET_MERCHANTCUSTOMERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MERCHANTCUSTOMERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getQuantity = (CurrentStore) => async (dispatch, getState) => {
  dispatch({
    type: GET_INVENTORY_REQUEST,
    payload: {
      CurrentStore,
    },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/stores/getproductsquntity",
      {
        CurrentStore,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );
    dispatch({ type: GET_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INVENTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
