import React from "react";
import ForecastHour from "./forecast_hour";

import "./forecast-hours.styl";

var ForecastHours = React.createClass({
  render: function() {
    var hours = this.props.hours.map(function (hour, index) {
      if (index > 7) { return false; }

      return (
        <ForecastHour
          className="hour"
          key={ hour.time }
          hour={ hour }
        />
      );
    }, this);

    return (
      <div className={ this.props.className }>{ hours }</div>
    );
  }
});

module.exports = ForecastHours;
