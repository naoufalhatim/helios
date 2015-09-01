import React from "react";
import Temperature from "../temperature";

module.exports = React.createClass({
  render: function() {
    return (
      <div className="current">
        <div className="label-primary">Currently</div>
        <div className="label-secondary">{ this.props.data.minutely.summary }</div>
        <h1 className="current-temp">
          <Temperature value={ this.props.data.currently.temperature } />
        </h1>
      </div>
    );
  }
});
