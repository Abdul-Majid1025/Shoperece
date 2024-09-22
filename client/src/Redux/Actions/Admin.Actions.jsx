import axios from "axios";
import {
  ALLMERCHANTS_REGISTER_REQUEST,
  ALLMERCHANTS_REGISTER_SUCCESS,
  ALLMERCHANTS_REGISTER_FAIL,
} from "../Constants/Admin.Constants";

export const getAllMerchants = () => async (dispatch, getState) => {
  dispatch({
    type: ALLMERCHANTS_REGISTER_REQUEST,
    payload: {},
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/admin/getallmerchants", {
      headers: { Authorization: `Bearer ${userInfo.user.token}` },
    });
    dispatch({ type: ALLMERCHANTS_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALLMERCHANTS_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
