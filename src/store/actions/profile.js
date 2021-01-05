import * as actionTypes from "./actionTypes";
import { pageLoader } from "./actions";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getProfileSuccess = (response) => {
  delete response.data["user"];
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    profile: response.data,
  };
};

export const getProfileFailure = (error) => {
  let data = {
    type: actionTypes.GET_PROFILE_FAILURE,
  };
  if (Math.floor(error.response.status / 100) === 4) {
    data.isAuthenticated = false;
  }
  return data;
};

export const getProfile = () => {
  const authToken = cookies.get("session_token");
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/profile`,
        {
          method: "GET_MY_PROFILE",
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        dispatch(getProfileSuccess(res));
      })
      .catch((err) => {
        console.log("GetProfileFailure: ", err);
        dispatch(getProfileFailure(err));
      });
  };
};

export const updateProfileSuccess = (response) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    profile: response.data,
  };
};

export const updateProfileFailure = (error) => {
  let data = {
    type: actionTypes.UPDATE_PROFILE_FAILURE,
  };
  if (Math.floor(error.response.status / 100) === 4) {
    data.isAuthenticated = false;
  }
  return data;
};

export const updateProfile = (data) => {
  const authToken = cookies.get("session_token");
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/profile`,
        {
          method: "UPDATE_PROFILE",
          ...data,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        dispatch(updateProfileSuccess(res));
      })
      .catch((err) => {
        dispatch(updateProfileFailure(err));
      });
  };
};
