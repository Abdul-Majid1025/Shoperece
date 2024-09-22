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

export const getAllStoresReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALLSTORES_REQUEST:
      return { loading: true };
    case GET_ALLSTORES_SUCCESS:
      return {
        loading: false,
        success: true,
        allStoresInSystem: action.payload,
      };
    case GET_ALLSTORES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getAllCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MERCHANTCUSTOMERS_REQUEST:
      return { loading: true };
    case GET_MERCHANTCUSTOMERS_SUCCESS:
      return {
        loading: false,
        success: true,
        allCustomersofStore: action.payload,
      };
    case GET_MERCHANTCUSTOMERS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteMerchantStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STORE_REQUEST:
      return { loading: true };
    case DELETE_STORE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_STORE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getMerchantStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MERCHANTSTORES_REQUEST:
      return { loading: true };
    case GET_MERCHANTSTORES_SUCCESS:
      return { loading: false, success: true, stores: action.payload };
    case GET_MERCHANTSTORES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getSingleStoreInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_INFORMATION_REQUEST:
      return { loading: true };
    case STORE_INFORMATION_SUCCESS:
      return { loading: false, storeInfo: action.payload };
    case STORE_INFORMATION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_REGISTER_REQUEST:
      return { loading: true };
    case STORE_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case STORE_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const setCurrentStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_STORE:
      return {
        ...state,
        CurrentStore: action.payload,
      };
    default:
      return state;
  }
};

export const setCustomerCurrentStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CUSTOMERCURRENT_STORE:
      return {
        ...state,
        customerInStore: action.payload,
      };
    default:
      return state;
  }
};

export const getAllProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, allProducts: action.payload };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getQuantityReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_INVENTORY_REQUEST:
      return { loading: true };
    case GET_INVENTORY_SUCCESS:
      return { loading: false, inventory: action.payload };
    case GET_INVENTORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
