import React from "react";

import Moment from "moment";
import Temperature from "../temperature";

var ForecastHour = React.createClass({
  render: function() {
    return (
      <div
        key={this.props.hour.time}
        className={ this.props.className }>
        <h3 className="label-secondary hour-details">{ Moment.unix(this.props.hour.time).format("ha") }</h3>
        <h2 className="label-primary hour-title"><Temperature value={ this.props.hour.temperature } /></h2>
      </div>
    );
  }
});

module.exports = ForecastHour;
