import * as actionTypes from "./actionTypes";
import axios from "axios";

export const pageLoader = () => {
  return {
    type: actionTypes.PAGE_LOADER,
  };
};

const userTypeSuccess = (response) => {
  return {
    type: actionTypes.USER_TYPE_SUCCESS,
    username: response.username
  };
};

const userTypeFailure = (error) => {
  return {
    type: actionTypes.USER_TYPE_FAILURE,
  };
};

export const userType = () => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/userType`)
      .then((res) => {
        dispatch(userTypeSuccess(res));
      })
      .catch((err) => {
        dispatch(userTypeFailure(err));
      });
  };
};
