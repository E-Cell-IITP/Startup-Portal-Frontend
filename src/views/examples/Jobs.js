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
import { getJobs, applyJob } from "../../store/actions";
import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Redirect } from "react-router-dom";

function ApplyCellRenderer(columnData) {
  console.log({
    columnData: columnData,
    isApplied: columnData.data.isApplied,
  });
  return columnData.data.isApplied ? (
    <Button color="primary" disabled>
      Applied
    </Button>
  ) : (
    <Button color="primary">Apply</Button>
  );
}

class Jobs extends React.Component {
  state = {
    jobsList: [],
    columnDefs: [
      { headerName: "Company", field: "companyName", minWidth: 200 },
      { headerName: "Package", field: "package" },
      { headerName: "Job Role", field: "jobRole" },
      { headerName: "Job Type", field: "jobType" },
      { headerName: "Status", field: "status" },
      { headerName: "Apply", cellRenderer: "applyCellRenderer" },
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
    if (this.props.jobsList == null) {
      await this.props.getJobsList();
      console.log(this.props.jobsList);
    }
  }

  toggleModal = (event) => {
    if (event.colDef && event.colDef.headerName === "Apply") {
      this.toggleAlert(event);
      return;
    }
    if (!this.state.isModelOpen) {
      this.setState({
        rowData: event.data,
      });
    }
    this.setState({
      isModelOpen: !this.state.isModelOpen,
    });
  };

  toggleAlert = (event) => {
    if (event.data) {
      this.setState({
        jobId: event.data._id,
      });
    } else {
      this.setState({
        jobId: "",
      });
    }
    this.setState({
      isjobModalOpen: !this.state.isjobModalOpen,
    });
  };

  applyJob = (event) => {
    this.props.applyJob(this.state.jobId);
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
                    <span className="h4">{this.state.rowData.companyName}</span>
                    <br />

                    <span className="h3">DESCIPTION: </span>
                    <span className="h4">{this.state.rowData.description}</span>
                    <br />

                    <span className="h3">JOB ROLE: </span>
                    <span className="h4">{this.state.rowData.jobRole}</span>
                    <br />

                    <span className="h3">JOB TYPE: </span>
                    <span className="h4">{this.state.rowData.jobType}</span>
                    <br />

                    <span className="h3">PACKAGE: </span>
                    <span className="h4">{this.state.rowData.package}</span>
                    <br />

                    <span className="h3">SKILLS REQUIRED: </span>
                    <span className="h4">{this.state.rowData.skills}</span>
                    <br />

                    <span className="h3">JOB STATUS: </span>
                    <span className="h4">{this.state.rowData.status}</span>
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
                    rowData={this.props.jobsList}
                    onCellClicked={this.toggleModal}
                    debug={true}
                    suppressCellSelection={true}
                    frameworkComponents={{
                      applyCellRenderer: ApplyCellRenderer,
                    }}
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
    jobsList: state.jobsList,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobsList: () => dispatch(getJobs()),
    applyJob: (jobId) => dispatch(applyJob(jobId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
