import React from 'react';
import {colorForTemp} from '../utils/helpers.js';
import ForecastHour from './forecast_hour';

var ForecastHours = React.createClass({
  render: function() {
    var hours = this.props.hours.map(function (hour, index) {
      if (index > 24 || (index %2 == 0 )  ) { return }

      return (
        <ForecastHour
          key={ hour.time }
          className="col-xs-1"
          hour={ hour }
          color={ colorForTemp(hour.temperature) }
        />
      );
    }, this);

    return (
      <ul className={ this.props.className }>{ hours }</ul>
    )
  }
});

module.exports = ForecastHours;
