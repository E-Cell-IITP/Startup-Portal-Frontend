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
// node.js library that concatenates classes (strings)

import Header from "../components/Headers/Header.js";

class Index extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <h1>E-Cell Startup-Portal HomePage</h1>
      </>
    );
  }
}

export default Index;
