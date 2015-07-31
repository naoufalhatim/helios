import React from "react";

import { colorForTemp } from "../utils/helpers";

var TemperatureDot = React.createClass({
  render: function() {
    var tempPercent = Math.round(100 * (this.props.temperature - this.props.minimumTemperature) / (this.props.maximumTemperature - this.props.minimumTemperature));

    return (
      <div className="temp-percent" style={ { top: (-tempPercent) + "%", backgroundColor: colorForTemp(this.props.temperature) } }></div>
    );
  }
});

module.exports = TemperatureDot;
