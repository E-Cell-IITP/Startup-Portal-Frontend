import * as actionTypes from "../actions/actionTypes";
import * as auth from "./auth";
import * as profile from "./profile";
import * as jobs from "./jobs";

const initialState = {
  isAuthFetched: false,
  isAuthLoading: false,
  isAuthenticated: false,
  isPageLoading: true,
  auth: {
    alertFor: null,
    alertType: null,
    alertMessage: null,
    username: null,
  },
  profile: {},
  jobsList: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAGE_LOADER:
      return {
        ...state,
        isPageLoading: true,
      };

    case actionTypes.AUTH_LOADER:
      return {
        ...state,
        isAuthLoading: true,
        auth: {
          alertType: "",
          alertMessage: "",
        },
      };

    case actionTypes.USER_TYPE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isPageLoading: false,
        isAuthFetched: true,
        auth: {
          ...state.auth,
          username: action.username,
        },
      };

    case actionTypes.USER_TYPE_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isPageLoading: false,
        isAuthFetched: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return auth.authSuccess(state, action);

    case actionTypes.AUTH_FAILURE:
      return auth.authFailure(state, action);

    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return auth.authLogoutSuccess(state, action);

    case actionTypes.AUTH_LOGOUT_FAILURE:
      return auth.authLogoutFailure(state, action);

    case actionTypes.AUTH_VERIFY:
      return auth.authVerify(state, action);

    case actionTypes.GET_JOBS_SUCCESS:
      return jobs.getJobsSuccess(state, action);

    case actionTypes.GET_JOBS_FAILURE:
      return jobs.getJobsFailure(state, action);

    case actionTypes.APPLY_JOB_SUCCESS:
      return jobs.applyJobSuccess(state, action);

    case actionTypes.APPLY_JOB_FAILURE:
      return jobs.applyJobFailure(state, action);

    case actionTypes.GET_PROFILE_SUCCESS:
      return profile.getProfileSuccess(state, action);

    case actionTypes.GET_PROFILE_FAILURE:
      return profile.getProfileFailure(state, action);

    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return profile.updateProfileSuccess(state, action);

    case action.UPDATE_PROFILE_FAILURE:
      return profile.updateProfileFailure(state, action);

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
