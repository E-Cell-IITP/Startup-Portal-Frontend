export const getJobsSuccess = (state, action) => {
  return {
    ...state,
    isPageLoading: false,
    jobsList: action.jobsList,
  };
};

export const getJobsFailure = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
  };
  if ("isAuthenticated" in action) {
    newState.isAuthenticated = action.isAuthenticated;
  }
  return newState;
};

export const applyJobSuccess = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
  };
  return newState;
};

export const applyJobFailure = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
  };
  if ("isAuthenticated" in action) {
    newState.isAuthenticated = action.isAuthenticated;
  }
  return newState;
};
