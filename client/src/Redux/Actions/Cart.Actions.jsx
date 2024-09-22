import axios from "axios";
import {
  ADD_TOCART_REQUEST,
  ADD_TOCART_SUCCESS,
  ADD_TOCART_FAIL,
  REMOVE_FROMCART_SUCCESS,
  CLEAR_ITEMFROMCART_SUCCESS,
  EMPTY_CART_SUCCESS,
} from "../Constants/Cart.Constants";

export const addItemToCart = (item) => async (dispatch, getState) => {
  console.log("addItemToCart", item);
  // dispatch({
  //   type: ADD_TOCART_REQUEST,
  //   payload: { item },
  // });

  try {
    // const { data } = await axios.post("/api/cart/addItem", {
    //   item,
    // });

    dispatch({ type: ADD_TOCART_SUCCESS, payload: item });

    // localStorage.setItem("cart", JSON.stringify(item));
  } catch (error) {
    dispatch({
      type: ADD_TOCART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (item) => async (dispatch, getState) => {
  console.log("removeFromCart", item);
  try {
    // const { data } = await axios.post("/api/cart/addItem", {
    //   item,
    // });

    dispatch({ type: REMOVE_FROMCART_SUCCESS, payload: item });

    // localStorage.setItem("cart", JSON.stringify(item));
  } catch (error) {
    dispatch({
      type: ADD_TOCART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearItem = (item) => async (dispatch, getState) => {
  console.log("clearItem", item);
  try {
    // const { data } = await axios.post("/api/cart/addItem", {
    //   item,
    // });

    dispatch({ type: CLEAR_ITEMFROMCART_SUCCESS, payload: item });

    // localStorage.setItem("cart", JSON.stringify(item));
  } catch (error) {
    dispatch({
      type: ADD_TOCART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearCart = () => async (dispatch, getState) => {
  try {
    // const { data } = await axios.post("/api/cart/addItem", {
    //   item,
    // });

    dispatch({ type: EMPTY_CART_SUCCESS });

    // localStorage.setItem("cart", JSON.stringify(item));
  } catch (error) {
    dispatch({
      type: ADD_TOCART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
