import React from 'react';
import {colorForTemp} from '../utils/helpers.js';
import ForecastHour from './forecast_hour';

var ForecastHours = React.createClass({
  render: function() {
    var temps = this.props.hours.map(function (hour) { return hour.temperature }).slice(0, 24).sort(function (a, b) { return a - b })

    var highTemp = temps.pop();
    var lowTemp = temps.shift();
    var spread = (highTemp - lowTemp);

    var hours = this.props.hours.map(function (hour, index) {
      if (index > 24 || (index %2 == 0 )  ) { return }

      return (
        <ForecastHour
          key={ hour.time }
          className="col-xs-1"
          hour={ hour }
          color={ colorForTemp(hour.temperature) }
          height={ this.props.barHeight + 10 }
          barHeight={ (((hour.temperature - lowTemp) / spread) * this.props.barHeight) + 10 }
        />
      );
    }, this);

    return (
      <ul className={ this.props.className }>{ hours }</ul>
    )
  }
});

module.exports = ForecastHours;
