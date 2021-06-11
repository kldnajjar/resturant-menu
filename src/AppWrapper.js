import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingOverlay from "react-loading-overlay-ts";

import { connect } from "react-redux";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    {/* <div className="sk-spinner sk-spinner-pulse" /> */}
  </div>
);

const Maintenance = React.lazy(() => import("./pages/maintenance"));
const Page404 = React.lazy(() => import("./pages/404/not-found"));

const Landing = React.lazy(() => import("./pages/landing"));
const Zioals = React.lazy(() => import("./pages/canva/zioals"));

class AppWrapper extends Component {
  render() {
    const { isLoading } = this.props.loaderReducer;

    return (
      <React.Fragment>
        <ToastContainer autoClose={7000} />
        <LoadingOverlay active={isLoading} spinner text="Loading">
          <BrowserRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                {/* <Route
                  path="/:companyName/dashboard/login/reset"
                  name="Reset Password"
                  component={EmployeeResetPassword}
                /> */}

                <Route path="/zioals" name="Zioals Menu" component={Zioals} />

                {/* <Redirect
                  from="/:companyName/dashboard"
                  to="/:companyName/dashboard/users"
                  exact
                /> */}

                {/* <ProtectedRoute
                  path="/:companyName/dashboard"
                  component={EmployeeLayout}
                /> */}
                <Route path="/" component={Landing} exact />
                <Route
                  path="/maintenance"
                  name="Maintenance"
                  component={Maintenance}
                />
                <Route path="/not-found" name="404" component={Page404} />
                {/* <Redirect from="/" to="/dashboard" exact /> */}
                <Redirect to="/not-found" />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ loaderReducer, uploaderReducer }) => ({
  loaderReducer,
  uploaderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
