import * as actionTypes from "./actionTypes";
import axios from "axios";
import { pageLoader } from "./actions";

const authLoader = () => {
  return {
    type: actionTypes.AUTH_LOADER,
  };
};

export const authSuccess = (response, method) => {
  let data = {
    type: actionTypes.AUTH_SUCCESS,
  };
  console.log("authSuccess: ", response.data.user.username);
  switch (method) {
    case "REGISTER":
      data.alertMessage =
        "Account successfully registered. Check your mail for verification.";
      data.alertFor = "REGISTER";
      break;
    case "LOGIN":
      data.alertMessage = "Logged in successfully";
      data.alertFor = "LOGIN";
      data.username = response.data.user.username;
      break;
    default:
      data.alertMessage = "";
      data.alertFor = "";
      break;
  }
  return data;
};

export const authFailure = (error, method) => {
  let alertFor = null;
  switch (method) {
    case "REGISTER":
      alertFor = "REGISTER";
      break;
    case "LOGIN":
      alertFor = "LOGIN";
      break;
    default:
      alertFor = "";
      break;
  }
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error,
    alertFor: alertFor,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(authLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(authSuccess(res, "LOGIN"));
        dispatch(checkAuthTimeout(3600000));
      })
      .catch((err) => {
        dispatch(authFailure(err, "LOGIN"));
      });
  };
};

export const register = (username, email, rollno, password) => {
  return (dispatch) => {
    dispatch(authLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        username: username,
        email: email,
        rollno: rollno,
        password: password,
      })
      .then((res) => {
        console.log("registerSuccessAction: ", res);
        dispatch(authSuccess(res, "REGISTER"));
      })
      .catch((err) => {
        console.log("registerFailureAction: ", err);
        dispatch(authFailure(err, "REGISTER"));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/logout`)
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH_LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH_LOGOUT_FAILURE,
        });
      });
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authVerify = (response) => {
  return {
    type: actionTypes.AUTH_VERIFY,
    message: response.data.message,
  };
};

export const verify = (token, email) => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/verify?token=${token}&email=${email}`
      )
      .then((res) => {
        dispatch(authVerify(res));
      })
      .catch((err) => {
        dispatch(authVerify(err.response));
      });
  };
};
