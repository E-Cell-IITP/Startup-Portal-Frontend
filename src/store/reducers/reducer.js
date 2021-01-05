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
    email: null,
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

    case actionTypes.SET_ALERT:
      return {
        ...state,
        auth: {
          ...state.auth,
          alertType: action.alertType,
          alertFor: action.alertFor,
          alertMessage: action.alertMessage,
        },
      };

    case actionTypes.AUTH_CHECK:
      return auth.checkAuth(state, action);

    case actionTypes.AUTH_LOGIN_SUCCESS:
      return auth.authLoginSuccess(state, action);

    case actionTypes.AUTH_LOGIN_FAILURE:
      return auth.authLoginFailure(state, action);

    case actionTypes.AUTH_REGISTER_SUCCESS:
      return auth.authRegisterSuccess(state, action);

    case actionTypes.AUTH_REGISTER_FAILURE:
      return auth.authRegisterFailure(state, action);

    case actionTypes.AUTH_LOGOUT:
      return auth.authLogout(state, action);

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
