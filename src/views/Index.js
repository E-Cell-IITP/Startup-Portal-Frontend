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
        <h2>Some Content to serve as home-page</h2>
        <h2>Do the impossible!</h2>
        <p>
          Entrepreneurship cell, IIT Patna is the organisation run by students
          and has been established with the objective of creating, manifesting,
          and guiding the entrepreneurial spirit in the student community and to
          encourage them to be successful entrepreneurs.
        </p>

        <h2>Work flow in E-Cell</h2>
        <p>
          We shall strive to educate ourselves about the nuances involved in
          entrepreneurship and business in order to prepare ourselves for
          undertaking the journey from the genesis of an idea to its successful
          business implementation. We shall work to create an environment that
          would allow us to learn from each other and from the experiences of
          people who have undertaken this journey in the past. To the end we
          conduct several events and workshops both for students of and beyond
          our college for the purpose of cultivating entrepreneur spirit.
        </p>
      </>
    );
  }
}

export default Index;
