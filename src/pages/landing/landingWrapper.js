import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class LandingWrapper extends Component {
  demo = () => {
    const from = "kn_87@hotmail.com";
    const subject = "spinix Demo";
    const body =
      "Dear spinix Team,\n\nyour body \n\nLook forward to hearing from you.\n\nKind regards,";

    window.location.href = `mailto:${from}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  render() {
    return (
      <div className="landing-container">
        <Container fluid>
          <Row className="banner">
            <Col>We're sorry, working on our landing page</Col>
          </Row>
          <Row>
            <Col>
              {/* <img
                className="homie"
                src={require("../../assets/img/common/homie-logo.png")}
                alt="homie.rent"
              /> */}
              <h1 className="mb-0 navy-blue-color">spinix</h1>
            </Col>
          </Row>

          <Row>
            <Col xl="6" lg="12">
              <h1 className="res-auto-margin">Adding your menu</h1>

              <div className="res-text-center email-container res-auto-margin">
                <button onClick={this.demo}>Contact us for a demo</button>
                <div className="my-2">
                  Or email us at <strong>agents@realpro.ai</strong>
                </div>
              </div>
            </Col>
            {/* <Col
              className="life-cycle-container res-text-center"
              xl="6"
              lg="12"
            >
              <img
                className="stock"
                src={require("../../assets/img/landing/life-cycle.jpg")}
                alt="Life cycle"
              />
            </Col> */}
          </Row>
          {/* <AppFooter className="landing-footer">
            <Suspense fallback={this.loading()}>
              <span>Spinix &copy; 2021.</span>
              <span>
                Powered by <span className="custom-color">spinix limited</span>
              </span>
            </Suspense>
          </AppFooter> */}
        </Container>
      </div>
    );
  }
}

export default LandingWrapper;
