import React from "react";

import Temperature from "../temperature";
import Precipitation from "../precipitation";

module.exports = React.createClass({
  render: function() {
    return (
      <div className={ this.props.className }>
        <h2 className="label-secondary">
          { this.props.title }
        </h2>
        <h1 className="label-primary">
          <Temperature value={ this.props.data.temperatureMax } /> / <Temperature value={ this.props.data.temperatureMin } /> { this.dailyPrecipitation() }
        </h1>
        <div className="forecast-details">{ this.props.data.summary }</div>
      </div>
    );
  },

  dailyPrecipitation: function() {
    if (this.props.data.precipType) {
      return (
        <span>/ <Precipitation precipType={ this.props.data.precipType } precipProbability={ this.props.data.precipProbability } /></span>
      );
    }
  }
});
