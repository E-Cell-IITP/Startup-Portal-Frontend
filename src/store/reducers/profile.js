export const getProfileSuccess = (state, action) => {
  return {
    ...state,
    isPageLoading: false,
    profile: {
      ...state.profile,
      ...action.profile,
    },
  };
};

export const getProfileFailure = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
  };
  if ("isAuthenticated" in action) {
    newState.isAuthenticated = action.isAuthenticated;
  }
  return newState;
};

export const updateProfileSuccess = (state, action) => {
  return {
    ...state,
    isPageLoading: false,
    profile: {
      ...state.profile,
      ...action.profile,
    },
  };
};

export const updateProfileFailure = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
  };
  if ("isAuthenticated" in action) {
    newState.isAuthenticated = action.isAuthenticated;
  }
  return newState;
};
