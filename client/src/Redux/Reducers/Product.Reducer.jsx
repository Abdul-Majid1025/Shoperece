import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  SET_ITEMDESCRIPTION,
  GET_PRODUCTDETAIL_REQUEST,
  GET_PRODUCTDETAIL_SUCCESS,
  GET_PRODUCTDETAIL_FAIL,
  GET_INCREASEQUANTITY_FAIL,
  GET_INCREASEQUANTITY_REQUEST,
  GET_INCREASEQUANTITY_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../Constants/Products.Constants";

export const editStoreProductReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return { loading: true };
    case EDIT_PRODUCT_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case EDIT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setCurrentProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ITEMDESCRIPTION:
      return {
        ...state,
        currentProduct: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTDETAIL_REQUEST:
      return { loading: true };
    case GET_PRODUCTDETAIL_SUCCESS:
      return { loading: false, success: true, productInfo: action.payload };
    case GET_PRODUCTDETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const increaseQuantityReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INCREASEQUANTITY_REQUEST:
      return { loading: true };
    case GET_INCREASEQUANTITY_SUCCESS:
      return { loading: false, success: true };
    case GET_INCREASEQUANTITY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
