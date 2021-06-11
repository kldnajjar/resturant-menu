import React, { Component } from "react";
import { connect } from "react-redux";
// import Maintenance from "../maintenance/index";
import LandingWrapper from "./landingWrapper";

class Landing extends Component {
  render() {
    // return <Maintenance />;
    return <LandingWrapper />;
  }
}

const mapStateToProps = ({ loaderReducer }) => ({
  loaderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
