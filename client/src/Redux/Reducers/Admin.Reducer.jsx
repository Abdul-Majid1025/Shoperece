import {
  ALLMERCHANTS_REGISTER_REQUEST,
  ALLMERCHANTS_REGISTER_SUCCESS,
  ALLMERCHANTS_REGISTER_FAIL,
} from "../Constants/Admin.Constants";

export const getAllMerchantsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALLMERCHANTS_REGISTER_REQUEST:
      return { loading: true };
    case ALLMERCHANTS_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        allMerchants: action.payload,
      };
    case ALLMERCHANTS_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
