import axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATEPASSWORD_FAIL,
  USER_UPDATEPASSWORD_SUCCESS,
  USER_UPDATEPASSWORD_REQUEST,
  USER_RESETPASSWORD_REQUEST,
  USER_RESETPASSWORD_SUCCESS,
  USER_RESETPASSWORD_FAIL,
  USER_UPDATEPROFILE_REQUEST,
  USER_UPDATEPROFILE_SUCCESS,
  USER_UPDATEPROFILE_FAIL,
  // USER_LOGIN_WITH_GOOGLE_REQUEST,
  // USER_LOGIN_WITH_GOOGLE_SUCCESS,
  // USER_LOGIN_WITH_GOOGLE_FAIL,
  USER_DELETEACCOUNT_REQUEST,
  USER_DELETEACCOUNT_SUCCESS,
  USER_DELETEACCOUNT_FAIL,
} from "../Constants/Users.Constants";

export const loginGoogle = (response) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { response },
  });
  try {
    const { data } = await axios.post("/api/users/logingoogle", {
      response,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (username, email, password, phone, address, city, postal) =>
  async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { username, email, password, phone, address, city, postal },
    });
    try {
      const { data } = await axios.post("/api/users/register", {
        username: username,
        email: email,
        password: password,
        phone: phone,
        address: address,
        city: city,
        postal: postal,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updatePass = (email) => async (dispatch) => {
  dispatch({ type: USER_UPDATEPASSWORD_REQUEST, payload: { email } });
  try {
    const { data } = await axios.post("/api/users/resetpassword", { email });
    dispatch({ type: USER_UPDATEPASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATEPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const passwordReset = (password, token) => async (dispatch) => {
  dispatch({ type: USER_RESETPASSWORD_REQUEST, payload: { password, token } });
  try {
    const { data } = await axios.post("/api/users/password-reset", {
      password,
      token,
    });
    dispatch({ type: USER_RESETPASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_RESETPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile =
  (username, email, address, city, postal, phone, id) =>
  async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATEPROFILE_REQUEST,
      payload: { username, email, address, city, postal, phone, id },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/users/updateprofile",
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
          headers: { Authorization: `Bearer ${userInfo.user.token}` },
        }
      );

      dispatch({ type: USER_UPDATEPROFILE_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATEPROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProfile = (id) => async (dispatch, getState) => {
  dispatch({
    type: USER_DELETEACCOUNT_REQUEST,
    payload: { id },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `/api/users/deleteprofile/${id}`,

      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );

    dispatch({ type: USER_DELETEACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETEACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signout = () => (dispatch) => {
  // localStorage.removeItem("userInfo");
  localStorage.clear();

  dispatch({ type: USER_SIGNOUT });
};
