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
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, signIn } from "../../store/actions/auth";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner,
  Col,
  UncontrolledAlert,
  Modal,
} from "reactstrap";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    icon: "ni ni-check-bold",
    forgotPasswordModal: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  toggleViewPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
      icon: this.state.showPassword ? "ni ni-check-bold" : "ni ni-glasses-2",
    });
  };

  handleSubmit = (event) => {
    if (!this.state.email || !this.state.password) {
      this.props.setAlert("danger", "All fields are required", "LOGIN");
      return;
    }
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  toggleForgotPassword = (event) => {
    this.setState({
      forgotPasswordModal: !this.state.forgotPasswordModal,
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/admin/jobs" />;
    }
    let spinner = this.props.isLoading ? <Spinner /> : null;
    return (
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <Modal
            isOpen={this.state.forgotPasswordModal}
            toggle={this.toggleForgotPassword}
          >
            <div className="p-2">
              <div className="modal-title" style={{ textAlign: "center" }}>
                <h2 className="mt-4">Forgot Password?</h2>
              </div>
              <div>
                <p className="m-2 text-center">
                  Relax and try to remember your password!
                </p>
              </div>
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleForgotPassword}
              >
                CLOSE
              </Button>
            </div>
          </Modal>
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h2>Sign in</h2>
              {spinner}
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {this.props.alertFor === "LOGIN" ? (
              <UncontrolledAlert color={this.props.alertType}>
                {this.props.alertMessage}
              </UncontrolledAlert>
            ) : null}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange={this.handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={this.state.showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    name="password"
                    onChange={this.handleChange}
                    required
                  />
                  <InputGroupAddon addonType="append">
                    <Button onClick={this.toggleViewPassword}>
                      <i className={this.state.icon} />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Sign in
                </Button>
                <Button onClick={this.toggleForgotPassword}>
                  <small>Forgot Password?</small>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isAuthLoading,
    isAuthenticated: state.isAuthenticated,
    alertType: state.auth.alertType,
    alertMessage: state.auth.alertMessage,
    alertFor: state.auth.alertFor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(signIn(email, password)),
    setAlert: (alertType, alertMessage, alertFor) =>
      dispatch(setAlert(alertType, alertMessage, alertFor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
