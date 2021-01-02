import * as actionTypes from "./actionTypes";
import { pageLoader } from "./actions";
import axios from "axios";

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
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile`)
      .then((res) => {
        dispatch(getProfileSuccess(res));
      })
      .catch((err) => {
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
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/profile/edit`, data)
      .then((res) => {
        dispatch(updateProfileSuccess(res));
      })
      .catch((err) => {
        dispatch(updateProfileFailure(err));
      });
  };
};
