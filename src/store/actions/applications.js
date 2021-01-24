import * as actionTypes from "./actionTypes";
import { pageLoader } from "./actions";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getApplicationsSuccess = (response) => {
  let applicationsList = response.data;
  for (let i = 0; i < applicationsList.length; i++) {
    applicationsList[i].Status = Object.keys(applicationsList[i].Status).find(
      (k) => applicationsList[i].Status[k] === 1
    );
  }
  console.log(applicationsList);
  return {
    type: actionTypes.GET_APPLICATIONS_SUCCESS,
    applicationsList: applicationsList,
  };
};

export const getApplicationsFailure = (error) => {
  let data = {
    type: actionTypes.GET_APPLICATIONS_FAILURE,
  };
  if (Math.floor(error.response.status / 100) === 4) {
    data.isAuthenticated = false;
  }
  return data;
};

export const getApplications = () => {
  const authToken = cookies.get("session_token");
  return (dispatch, getState) => {
    dispatch(pageLoader());
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/apply`,
        {
          method: "GET_BY_USER_ID",
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((res) => {
        dispatch(getApplicationsSuccess(res));
      })
      .catch((err) => {
        console.log("GetApplicationsFailure: ", err);
        dispatch(getApplicationsFailure(err));
      });
  };
};
