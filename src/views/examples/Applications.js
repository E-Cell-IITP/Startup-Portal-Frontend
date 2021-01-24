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
import {
  Card,
  Container,
  Row,
  Modal,
  Button,
  UncontrolledAlert,
} from "reactstrap";
import Spinner from "../../components/Spinner";
import Header from "../../components/Headers/Header.js";
import { getApplications } from "../../store/actions/applications";
import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Redirect } from "react-router-dom";

class Applications extends React.Component {
  state = {
    applicationsList: [],
    columnDefs: [
      {
        headerName: "Company",
        valueGetter: "data.Job.companyName",
        minWidth: 200,
      },
      { headerName: "Package", valueGetter: "data.Job.salaryPackage" },
      { headerName: "Job Role", valueGetter: "data.Job.jobRole" },
      { headerName: "Job Type", valueGetter: "data.Job.jobType" },
      { headerName: "Status", field: "Status" },
    ],
    defaultColDef: {
      sortable: true,
      filter: true,
      flex: 1,
    },
    isModelOpen: false,
    rowData: {},
    isjobModalOpen: false,
    jobId: "",
    showAlert: false,
    alertMessage: "",
    alertType: "",
  };

  async componentDidMount() {
    if (this.props.applicationsList == null) {
      await this.props.getApplications();
    }
  }

  toggleModal = (event) => {
    if (!this.state.isModelOpen) {
      this.setState({
        rowData: event.data,
      });
    }
    this.setState({
      isModelOpen: !this.state.isModelOpen,
    });
  };

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }

    if (this.props.isPageLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <Header />
        {this.state.showAlert ? (
          <UncontrolledAlert
            color={this.state.alertType}
            style={{ marginBottom: "10px" }}
          >
            {this.state.alertMessage}
          </UncontrolledAlert>
        ) : null}
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <Modal
                  className="modal-dailog-centered"
                  isOpen={this.state.isjobModalOpen}
                  toggle={this.toggleAlert}
                >
                  <div>
                    <div
                      className="modal-title"
                      style={{ textAlign: "center" }}
                    >
                      <h2 className="mt-4">ARE YOU SURE?</h2>
                      <hr />
                    </div>
                    <div className="modal-footer">
                      <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.toggleAlert}
                      >
                        CLOSE
                      </Button>
                      <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={this.applyJob}
                      >
                        YES
                      </Button>
                    </div>
                  </div>
                </Modal>
                <Modal
                  className="modal-dailog-centered"
                  isOpen={this.state.isModelOpen}
                  toggle={this.toggleModal}
                >
                  <div style={{ textAlign: "center" }}>
                    <h2 className="modal-title mt-4"> JOB DESCRIPTION </h2>
                    <hr />
                  </div>
                  <div className="modal-body">
                    <span className="h3">Company: </span>
                    <span className="h4">
                      {this.state.rowData.Job
                        ? this.state.rowData.Job.companyName
                        : ""}
                    </span>
                    <br />

                    <span className="h3">DESCIPTION: </span>
                    <span className="h4">
                      {this.state.rowData.Job
                        ? this.state.rowData.Job.description
                        : ""}
                    </span>
                    <br />

                    <span className="h3">JOB ROLE: </span>
                    <span className="h4">
                      {this.state.rowData.Job
                        ? this.state.rowData.Job.jobRole
                        : ""}
                    </span>
                    <br />

                    <span className="h3">JOB TYPE: </span>
                    <span className="h4">
                      {this.state.rowData.Job
                        ? this.state.rowData.Job.jobType
                        : ""}
                    </span>
                    <br />

                    <span className="h3">PACKAGE: </span>
                    <span className="h4">
                      {this.state.rowData.Job
                        ? this.state.rowData.Job.salaryPackage
                        : ""}
                    </span>
                    <br />

                    <span className="h3">SKILLS REQUIRED: </span>
                    <span className="h4">
                      {this.state.rowData.Job
                        ? this.state.rowData.Job.skills
                        : ""}
                    </span>
                    <br />

                    <span className="h3">JOB STATUS: </span>
                    <span className="h4">{this.state.rowData.Status}</span>
                    <br />
                  </div>
                  <div className="modal-footer">
                    <Button
                      color="secondary"
                      data-dismiss="modal"
                      type="button"
                      onClick={this.toggleModal}
                    >
                      CLOSE
                    </Button>
                  </div>
                </Modal>
                <div className="ag-theme-alpine" style={{ height: "500px" }}>
                  <AgGridReact
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    pagination={true}
                    // onGridReady={this.props.getJobsList}
                    rowData={this.props.applicationsList}
                    onCellClicked={this.toggleModal}
                    debug={true}
                    suppressCellSelection={true}
                    rowHeight={50}
                  />
                  {this.displayJob}
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPageLoading: state.isPageLoading,
    applicationsList: state.applicationsList,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApplications: () => dispatch(getApplications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
