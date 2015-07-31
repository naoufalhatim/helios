import React from "react";
import ForecastHour from "./forecast_hour";

var ForecastHours = React.createClass({
  render: function() {
    var numberOfHours = 7;

    var hours = this.props.hours.map(function (hour, index) {
      if (index > numberOfHours) { return false; }

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
