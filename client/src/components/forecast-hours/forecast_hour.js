import React from "react";

import Moment from "moment";

import Precipitation from "../precipitation";
import Temperature from "../temperature";

var ForecastHour = React.createClass({
  render: function() {
    return (
      <div
        key={this.props.hour.time}
        className={ this.props.className }>

        <h2 className="label-primary hour-title">{ Moment.unix(this.props.hour.time).format("ha") }</h2>
        <h3 className="label-secondary hour-details"><Temperature value={ this.props.hour.temperature } /></h3>

        <Precipitation
          precipType={ this.props.hour.precipType }
          precipProbability={ this.props.hour.precipProbability } />
      </div>
    );
  }
});

module.exports = ForecastHour;
