import React from "react";

class Spinner extends React.Component {
  render() {
    return (
      <div className="custom-spinner-loading">
        <div className="custom-spinner-circle"></div>
        <div className="custom-spinner-circle"></div>
        <div className="custom-spinner-circle"></div>
        <div className="custom-spinner-circle"></div>
      </div>
    );
  }
}

export default Spinner;
