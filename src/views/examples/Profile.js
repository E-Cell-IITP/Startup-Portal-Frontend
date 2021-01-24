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
import { getProfile, updateProfile } from "../../store/actions";
// import { Document, Page, pdfjs } from "react-pdf";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Spinner from "../../components/Spinner";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";

// function Resume({ url }) {
//   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }
//   return (
//     <Document file={"https://cors-anywhere.herokuapp.com/" + url} onLoadSuccess={onDocumentLoadSuccess}>
//       <Page pageNumber={pageNumber} />
//     </Document>
//   );
// }

class Profile extends React.Component {
  state = { profile: {} };

  async componentDidMount() {
    if (Object.entries(this.props.profile).length === 0) {
      this.props.getProfile();
    }
    if (
      Object.entries(this.props.profile).length !== 0 &&
      Object.entries(this.state.profile).length === 0
    ) {
      this.getProfile();
    }
  }

  getProfile = () => {
    this.setState({
      profile: {
        firstName: this.props.profile.firstName || "",
        lastName: this.props.profile.lastName || "",
        about: this.props.profile.about || "",
        branch: this.props.profile.branch || "",
        contact: this.props.profile.contact || "",
        email: this.props.profile.email || "",
        resumeUrl: this.props.profile.resumeUrl || "",
      },
    });
  };

  handleState = (event) => {
    const { name, value } = event.target;
    this.setState({
      profile: { ...this.state.profile, [name]: value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateProfile(this.state.profile);
    this.getProfile();
  };

  render() {
    console.log("Profile: ", this.state.profile);
    if (!this.props.isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }

    if (this.props.isPageLoading) {
      return <Spinner />;
    }
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                {/* <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <Resume url={this.props.profile.resumeUrl} />
                  </Col>
                </Row> */}
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {/* <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Upload
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    {/* <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div> */}
                  </Row>
                  <div className="text-center">
                    <h3 onChange={this.handleState}>
                      {this.state.profile.firstName +
                        " " +
                        this.state.profile.lastName}
                    </h3>
                    {/* <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <p
                      name="about"
                      value={this.state.profile.about}
                      onChange={this.handleState}
                    ></p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4"></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.props.username}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              name="userName"
                              readOnly={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.profile.firstName || ""}
                              onChange={this.handleState}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              name="firstName"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.profile.lastName || ""}
                              onChange={this.handleState}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              name="lastName"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Branch
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.profile.branch || ""}
                              onChange={this.handleState}
                              id="input-first-name"
                              placeholder="Branch"
                              type="text"
                              name="branch"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="jesse@example.com"
                              name="email"
                              value={this.props.email || ""}
                              readOnly={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Contact Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.profile.contact || ""}
                              onChange={this.handleState}
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              name="contact"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Link to Resume
                            </label>
                            <Row>
                              <Col sm="10">
                                <Input
                                  className="form-control-alternative"
                                  value={this.state.profile.resumeUrl || ""}
                                  onChange={this.handleState}
                                  id="input-address"
                                  placeholder="https://www.google.com/"
                                  type="url"
                                  name="resumeUrl"
                                />
                              </Col>
                              <Col sm="2">
                                <Button
                                  color={
                                    this.props.profile.resumeUrl
                                      ? "success"
                                      : "danger"
                                  }
                                  disabled={
                                    this.props.profile.resumeUrl ? false : true
                                  }
                                >
                                  {this.props.profile.resumeUrl ? (
                                    <a
                                      href={this.props.profile.resumeUrl}
                                      target="_blank"
                                      style={{ color: "#fff" }}
                                    >
                                      Open in new tab
                                    </a>
                                  ) : (
                                    "No Resume"
                                  )}
                                </Button>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          value={this.state.profile.about || ""}
                          onChange={this.handleState}
                          type="textarea"
                          name="about"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="text-center">
                <Button color="default" onClick={this.handleSubmit}>
                  Save Changes
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPageLoading: state.isPageLoading,
    profile: state.profile,
    isAuthenticated: state.isAuthenticated,
    username: state.auth.username,
    email: state.auth.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(getProfile()),
    updateProfile: (profileData) => dispatch(updateProfile(profileData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
