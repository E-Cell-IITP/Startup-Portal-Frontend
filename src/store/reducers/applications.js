export const getApplicationsSuccess = (state, action) => {
  return {
    ...state,
    isPageLoading: false,
    applicationsList: action.applicationsList,
  };
};

export const getApplicationsFailure = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
  };
  if ("isAuthenticated" in action) {
    newState.isAuthenticated = action.isAuthenticated;
  }
  return newState;
};
