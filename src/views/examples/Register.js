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
import { connect } from "react-redux";
import { setAlert, signUp } from "../../store/actions/auth";

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
  Col,
  UncontrolledAlert,
  Spinner,
} from "reactstrap";

import PasswordStrengthBar from "react-password-strength-bar";

class Register extends React.Component {
  state = {
    userName: "",
    email: "",
    rollNo: "",
    password: "",
    alertType: "",
    alertMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    if (
      !this.state.userName ||
      !this.state.email ||
      !this.state.rollNo ||
      !this.state.password
    ) {
      this.props.setAlert("danger", "All fields are required", "REGISTER");
      return;
    }
    event.preventDefault();
    this.props.register(
      this.state.userName,
      this.state.email,
      this.state.rollNo,
      this.state.password
    );
    // if (
    //   this.state.userName.length === 0 ||
    //   this.state.password.length === 0 ||
    //   this.state.email.length === 0 ||
    //   this.state.rollNo.length === 0
    // ) {
    //   this.setState({
    //     alertType: "danger",
    //     alertMessage: "Below Fields are Mandatory",
    //   });
    //   return;
    // }
    // await axios
    //   .post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
    //     username: this.state.userName,
    //     email: this.state.email,
    //     rollno: this.state.rollNo,
    //     password: this.state.password,
    //   })
    //   .then((response) => {
    //     this.setState({
    //       alertType: "success",
    //       alertMessage: response.data.message,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       alertType: "danger",
    //       alertMessage:
    //         error.response.data.message || "Check your Internet connection.",
    //     });
    //   });
  };

  render() {
    let spinner = this.props.isLoading ? <Spinner /> : null;

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center">
                <h1>Sign up</h1>
                {spinner}
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {this.props.alertFor === "REGISTER" ? (
                <UncontrolledAlert color={this.props.alertType}>
                  {this.props.alertMessage}
                </UncontrolledAlert>
              ) : null}
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Username"
                      type="text"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleChange}
                      required={true}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
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
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Roll No"
                      type="text"
                      name="rollNo"
                      value={this.state.rollNo}
                      onChange={this.handleChange}
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
                      type="password"
                      autoComplete="new-password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <PasswordStrengthBar password={this.state.password} />
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={this.handleSubmit}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isAuthLoading,
    alertType: state.auth.alertType,
    alertMessage: state.auth.alertMessage,
    alertFor: state.auth.alertFor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, rollno, password) =>
      dispatch(signUp(username, email, rollno, password)),
    setAlert: (alertType, alertMessage, alertFor) =>
      dispatch(setAlert(alertType, alertMessage, alertFor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
