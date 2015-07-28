import React from 'react';

import ForecastHour from './forecast_hour';

var ForecastHours = React.createClass({
  render: function() {
    var temps = [];
    i = 0;

    while (i < 24) {
      temps.push(this.props.hours[i].apparentTemperature)
      i++;
    }

    var highTemp = temps.sort().slice(-1)[0];
    var lowTemp = temps.sort()[0];
    var spread = (highTemp - lowTemp);

    var hours = this.props.hours.map(function (hour, index) {
      if (index > 24 || (index %2 == 0 )  ) { return }

      return (
        <ForecastHour
          key={ hour.time }
          className="col-xs-1"
          hour={ hour }
          color={ colorForTemp(hour.apparentTemperature) }
          height={ 110 }
          barHeight={ (((hour.apparentTemperature - lowTemp) / spread) * 100) + 10 }
        />
      );
    });

    return (
      <ul className={ this.props.className }>{ hours }</ul>
    )
  }
});

module.exports = ForecastHours;
