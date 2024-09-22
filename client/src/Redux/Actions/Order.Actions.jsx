import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_STRIPEORDER_REQUEST,
  CREATE_STRIPEORDER_SUCCESS,
  CREATE_STRIPEORDER_FAIL,
} from "../Constants/Order.constants";

export const cashDeliveryOrder =
  (cartItems, TotalAmount) => async (dispatch, getState) => {
    dispatch({
      type: CREATE_ORDER_REQUEST,
      payload: { cartItems, TotalAmount },
    });
    const {
      customerSignin: { customerInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/orders/createcashondeliveryorder",
        {
          cartItems: cartItems,
          TotalAmount: TotalAmount,
        },
        {
          headers: { Authorization: `Bearer ${customerInfo.user.token}` },
        }
      );

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const stripeOrder =
  (cartItems, TotalAmount, token) => async (dispatch, getState) => {
    dispatch({
      type: CREATE_STRIPEORDER_REQUEST,
      payload: { cartItems, TotalAmount, token },
    });
    const {
      customerSignin: { customerInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/orders/stripeorder",
        {
          cartItems: cartItems,
          TotalAmount: TotalAmount,
          token: token,
        },
        {
          headers: { Authorization: `Bearer ${customerInfo.user.token}` },
        }
      );

      dispatch({ type: CREATE_STRIPEORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_STRIPEORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
