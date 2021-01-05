export const authLoginSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    isAuthLoading: false,
    auth: {
      ...state.auth,
      alertType: "success",
      alertMessage: action.alertMessage,
      alertFor: "LOGIN",
      username: action.username,
      email: action.email,
    },
  };
};

export const authLoginFailure = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    isAuthLoading: false,
    auth: {
      ...state.auth,
      alertType: "danger",
      alertMessage: action.alertMessage,
      alertFor: "LOGIN",
    },
  };
};

export const authRegisterSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    isAuthLoading: false,
    auth: {
      ...state.auth,
      alertType: "success",
      alertMessage: action.alertMessage,
      alertFor: "REGISTER",
      username: action.username,
    },
  };
};

export const authRegisterFailure = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    isAuthLoading: false,
    auth: {
      ...state.auth,
      alertType: "danger",
      alertMessage: action.alertMessage,
      alertFor: "REGISTER",
    },
  };
};

export const authLogout = (state, action) => {
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

export const checkAuth = (state, action) => {
  let newState = {
    ...state,
    isPageLoading: false,
    isAuthFetched: true,
    isAuthenticated: action.isAuthenticated,
    auth: {
      ...state.auth,
      username: action.username,
      email: action.email,
    },
  };
  return newState;
};
