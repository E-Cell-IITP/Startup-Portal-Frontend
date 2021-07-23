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
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../store/actions";

// reactstrap components
import { Card, CardHeader, CardBody, Col, UncontrolledAlert } from "reactstrap";
import Spinner from "../../components/Spinner";

class Verify extends React.Component {
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    console.log(
      "Verify.js: ",
      this.props.match.params.token,
      this.props.match.params.email
    );
    if (
      this.props.match.params.token &&
      this.props.match.params.email &&
      !this.props.alertMessage
    ) {
      this.props.verify(
        this.props.match.params.token,
        this.props.match.params.email
      );
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/admin/jobs" />;
    }
    if (this.props.isPageLoading) {
      return <Spinner />;
    }
    return (
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h2>Verification</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {this.props.alertFor === "VERIFY" ? (
              <UncontrolledAlert color={this.props.alertType}>
                {this.props.alertMessage}
              </UncontrolledAlert>
            ) : null}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPageLoading: state.isPageLoading,
    isAuthenticated: state.isAuthenticated,
    alertType: state.auth.alertType,
    alertMessage: state.auth.alertMessage,
    alertFor: state.auth.alertFor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: (token, email) => dispatch(verify(token, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Verify));
