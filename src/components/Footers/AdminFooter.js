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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                E-Cell | IIT Patna
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tech & Dev Committee
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
