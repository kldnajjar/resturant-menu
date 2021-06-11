import React, { Component } from "react";

class Maintenance extends Component {
  render() {
    return (
      <article
        style={{
          display: "block",
          textAlign: "left",
          width: "650px",
          margin: "250px auto 0",
        }}
      >
        <h1
          style={{
            display: "inline-block",
            marginLeft: "20px",
            marginBottom: "1em",
            fontSize: "50px",
            fontFamily: "Helvetica, sans-serif",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          We&rsquo;ll be back soon!
        </h1>
        <div>
          <p
            style={{
              font: "20px Helvetica, sans-serif",
              color: "#333",
              marginBottom: "3em",
            }}
          >
            Sorry for the inconvenience but we&rsquo;re performing some
            maintenance at the moment. If you need to you can always contact us,
            otherwise we&rsquo;ll be back online shortly!
          </p>

          <p style={{ font: "20px Helvetica, sans-serif", color: "#333" }}>
            &mdash; The Team
          </p>
        </div>
      </article>
    );
  }
}

export default Maintenance;
