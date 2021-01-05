/*!

=========================================================
* E-Cell Startup-Portal - v1.1.0
=========================================================

* Product Page: https://github.com/entrepreneurship-iitp/Startup-portal-front
* Copyright 2020 E-Cell, IIT Patna (http://ecell-iitp.org/)
* Licensed under MIT (https://github.com/entrepreneurship-iitp/Startup-portal-front/blob/master/LICENSE)

* Coded by Tech & Dev Committee, E-Cell | IIT Patna

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "./App";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import reducer from "./store/reducers/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
