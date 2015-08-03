import React from "react";
import ForecastHour from "./forecast_hour";

import "./forecast-hours.styl";

var ForecastHours = React.createClass({
  render: function() {
    var hours = this.props.hours.map(function (hour, index) {
      if (index > 7) { return false; }

      return (
        <ForecastHour
          key={ hour.time }
          hour={ hour }
        />
      );
    }, this);

    return (
      <ul className={ this.props.className }>{ hours }</ul>
    );
  }
});

module.exports = ForecastHours;
