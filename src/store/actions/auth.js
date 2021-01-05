import * as actionTypes from "./actionTypes";
import axios from "axios";
import { pageLoader } from "./actions";
import Cookies from "universal-cookie";

const authLoader = () => {
  return {
    type: actionTypes.AUTH_LOADER,
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(authLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth`, {
        method: "SIGNIN",
        email: email,
        password: password,
      })
      .then((res) => {
        const cookies = new Cookies();
        cookies.set("session_token", res.data.accessToken, { path: "/" });
        dispatch({
          type: actionTypes.AUTH_LOGIN_SUCCESS,
          alertMessage: "Logged in successfully",
          username: res.data.username,
          email: res.data.email,
        });
        dispatch(checkAuthTimeout(3600000));
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILURE,
          alertMessage: err.response.data.message,
        });
      });
  };
};

export const signUp = (username, email, rollno, password) => {
  return (dispatch) => {
    dispatch(authLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth`, {
        method: "SIGNUP",
        username: username,
        email: email,
        rollno: rollno,
        password: password,
      })
      .then((res) => {
        console.log("registerSuccessAction: ", res);
        dispatch({
          type: actionTypes.AUTH_REGISTER_SUCCESS,
          alertMessage: "Logged in successfully",
          username: res.data.user.username,
        });
      })
      .catch((err) => {
        console.log("registerFailureAction: ", err);
        dispatch({
          type: actionTypes.AUTH_REGISTER_FAILURE,
          alertMessage: err.response.data.message,
        });
      });
  };
};

export const signOut = () => {
  const cookies = new Cookies();
  const authToken = cookies.get("session_token");
  cookies.remove("session_token", { path: "/" });
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
  };
};

export const verify = (token, email) => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth`, {
        method: "VERIFY",
        verificationToken: token,
        email: email,
      })
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH_VERIFY,
          message: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH_VERIFY,
          message: err.response.data.message,
        });
      });
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime);
  };
};

export const checkAuth = () => {
  const cookies = new Cookies();
  const authToken = cookies.get("session_token");
  if (authToken) {
    return (dispatch) => {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/auth`,
          {
            method: "CHECKAUTH",
          },
          {
            headers: {
              Authorization: "Bearer " + authToken,
            },
          }
        )
        .then((res) => {
          console.log("checkAuthActionResponse: ", res.data);
          dispatch({
            type: actionTypes.AUTH_CHECK,
            isAuthenticated: true,
            username: res.data.username,
            email: res.data.email,
          });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.AUTH_CHECK,
            isAuthenticated: false,
            username: null,
          });
        });
    };
  } else {
    return {
      type: actionTypes.AUTH_CHECK,
      isAuthenticated: false,
      username: null,
    };
  }
};
