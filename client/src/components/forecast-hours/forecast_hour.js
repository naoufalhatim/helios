import React from "react";

import Moment from "moment";
import Skycons from "react-skycons";

import Precipitation from "../precipitation";

var ForecastHour = React.createClass({
  render: function() {
    return (
      <li
        key={this.props.hour.time}
        className={ this.props.className }>

        <Skycons
          key={ this.props.color }
          color="#fff"
          icon={ this.props.hour.icon.toUpperCase().replace(/-/g, "_")}
          autoplay={ true } />

        <h3>{ Moment.unix(this.props.hour.time).format("ha") }</h3>
        <h2>{ Math.round(this.props.hour.temperature) }</h2>

        <Precipitation
          precipType={ this.props.hour.precipType }
          precipProbability={ this.props.hour.precipProbability } />
      </li>
    );
  }
});

module.exports = ForecastHour;
