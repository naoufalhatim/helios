

import React from "react";

import Temperature from "./temperature";

var DailyTemperatures = React.createClass({
  propTypes: {
    day: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <span>
        <Temperature value={ this.props.day.temperatureMax } /> / <Temperature value={ this.props.day.temperatureMin } />
      </span>
    );
  }
});

module.exports = DailyTemperatures;
