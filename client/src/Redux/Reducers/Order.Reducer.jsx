import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_STRIPEORDER_REQUEST,
  CREATE_STRIPEORDER_SUCCESS,
  CREATE_STRIPEORDER_FAIL,
} from "../Constants/Order.constants";

export const cashOnDeliveryOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stripeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STRIPEORDER_REQUEST:
      return { loading: true };
    case CREATE_STRIPEORDER_SUCCESS:
      return { loading: false, success: true, stripeData: action.payload };
    case CREATE_STRIPEORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
