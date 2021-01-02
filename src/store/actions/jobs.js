import * as actionTypes from "./actionTypes";
import { pageLoader } from "./actions";
import axios from "axios";

export const getJobsSuccess = (response) => {
  return {
    type: actionTypes.GET_JOBS_SUCCESS,
    jobsList: response.data,
  };
};

export const getJobsFailure = (error) => {
  let data = {
    type: actionTypes.GET_JOBS_FAILURE,
  };
  if (Math.floor(error.response.status / 100) === 4) {
    data.isAuthenticated = false;
  }
  return data;
};

export const getJobs = () => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/job`)
      .then((res) => {
        dispatch(getJobsSuccess(res));
      })
      .catch((err) => {
        dispatch(getJobsFailure(err));
      });
  };
};

export const applyJobSuccess = (response) => {
  return {
    type: actionTypes.APPLY_JOB_SUCCESS,
  };
};

export const applyJobFailure = (error) => {
  let data = {
    type: actionTypes.APPLY_JOB_FAILURE,
  };
  if (Math.floor(error.response.status / 100) === 4) {
    data.isAuthenticated = false;
  }
  return data;
};

export const applyJob = (jobId) => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/applyJob/${jobId}`)
      .then((res) => {
        dispatch(applyJobSuccess(res));
      })
      .catch((err) => {
        dispatch(applyJobFailure(err));
      });
  };
};
