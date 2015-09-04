import React from "react";

import Temperature from "../temperature";
import Precipitation from "../precipitation";

module.exports = React.createClass({
  render: function() {
    return (
      <div className={ this.props.className }>
        <h1 className="label-primary">{ this.props.title }</h1>
        <h2 className="label-secondary">
          <Temperature value={ this.props.data.temperatureMax } /> / <Temperature value={ this.props.data.temperatureMin } /> { this.precip() }
        </h2>
        <div className="forecast-details">{ this.props.data.summary }</div>
      </div>
    );
  },

  precip: function() {
    if (this.props.data.precipType) {
      return (
        <span>/ <Precipitation precipType={ this.props.data.precipType } precipProbability={ this.props.data.precipProbability } /></span>
      );
    }
  }
});
