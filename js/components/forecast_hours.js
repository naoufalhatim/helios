import React from "react";
import ForecastHour from "./forecast_hour";

var ForecastHours = React.createClass({
  render: function() {
    var numberOfHours = 7;
    var temperatures = this.props.hours.slice(0, numberOfHours + 1).map(function(hour){ return hour.temperature; });
    var max = Math.max.apply(null, temperatures);
    var min = Math.min.apply(null, temperatures);

    var hours = this.props.hours.map(function (hour, index) {
      if (index > numberOfHours) { return false; }

      return (
        <ForecastHour
          key={ hour.time }
          hour={ hour }
          maximumTemperature={ max }
          minimumTemperature={ min }
        />
      );
    }, this);

    return (
      <ul className={ this.props.className }>{ hours }</ul>
    );
  }
});

module.exports = ForecastHours;
