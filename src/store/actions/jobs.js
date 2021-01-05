import * as actionTypes from "./actionTypes";
import { pageLoader } from "./actions";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

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
  const authToken = cookies.get("session_token");
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/jobs`,
        {
          method: "ALL",
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        dispatch(getJobsSuccess(res));
      })
      .catch((err) => {
        console.log("GetJobsFailure: ", err);
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
  const authToken = cookies.get("session_token");
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/apply`,
        {
          method: "APPLY_BY_ID",
          jobId: jobId,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        dispatch(applyJobSuccess(res));
      })
      .catch((err) => {
        dispatch(applyJobFailure(err));
      });
  };
};
