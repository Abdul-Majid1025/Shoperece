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
  USER_DELETEACCOUNT_REQUEST,
  USER_DELETEACCOUNT_SUCCESS,
  USER_DELETEACCOUNT_FAIL,
} from "../Constants/Users.Constants";

export const loginGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        ...state,
        "state.userSignin.userInfo": action.payload,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const updatePassReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATEPASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATEPASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATEPASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESETPASSWORD_REQUEST:
      return { loading: true };
    case USER_RESETPASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_RESETPASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATEPROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATEPROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATEPROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETEACCOUNT_REQUEST:
      return { loading: true };
    case USER_DELETEACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETEACCOUNT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
