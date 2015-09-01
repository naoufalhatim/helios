import React from "react";
import Temperature from "../temperature";

module.exports = React.createClass({
  render: function() {
    return (
      <div className="current">
        <h2 className="label-primary">Currently</h2>
        <h3 className="label-secondary">{ this.props.data.minutely.summary }</h3>
        <h1 className="current-temp">
          <Temperature value={ this.props.data.currently.temperature } />
        </h1>
      </div>
    );
  }
});
