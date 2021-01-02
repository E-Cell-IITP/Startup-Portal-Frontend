export const authSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    isAuthLoading: false,
    auth: {
      ...state.auth,
      alertType: "success",
      alertMessage: action.alertMessage,
      alertFor: action.alertFor,
      username: action.username,
    },
  };
};

export const authFailure = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    isAuthLoading: false,
    auth: {
      ...state.auth,
      alertType: "danger",
      alertMessage: action.error.response.data.message,
      alertFor: action.alertFor,
    },
  };
};

export const authLogoutSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    isPageLoading: false,
    auth: {
      ...state.auth,
      alertType: "primary",
      alertMessage: "Logged out Succesfully",
      alertFor: "LOGIN",
    },
  };
};

export const authLogoutFailure = (state, action) => {
  return {
    ...state,
    isPageLoading: false,
  };
};

export const authVerify = (state, action) => {
  return {
    ...state,
    isPageLoading: false,
    auth: {
      ...state.auth,
      alertFor: "VERIFY",
      alertType: "primary",
      alertMessage: action.message,
    },
  };
};
