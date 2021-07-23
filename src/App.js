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
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { checkAuth } from "./store/actions/auth";
import { connect } from "react-redux";
import Spinner from "./components/Spinner";
import "./assets/css/Spinner.css";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    if (this.props.isPageLoading) {
      return <Spinner />;
    }

    if (this.props.isAuthenticated) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/" to="/admin/tables" />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isPageLoading: state.isPageLoading,
    isAuthenticated: state.isAuthenticated,
    isAuthFetched: state.isAuthFetched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
