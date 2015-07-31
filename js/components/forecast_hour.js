import React from "react";

import Moment from "moment";
import Skycons from "react-skycons";

import Temperature from "./temperature";
import Precipitation from "./precipitation";

var ForecastHour = React.createClass({
  render: function() {
    return (
      <li
        key={this.props.hour.time}
        className={ this.props.className }>

        <h5>{ Moment.unix(this.props.hour.time).format("hA") }</h5>
        <h6>
          <Temperature value={ this.props.hour.temperature }/>
          <Precipitation
            precipType={ this.props.hour.precipType }
            precipProbability={ this.props.hour.precipProbability } />
        </h6>

        <Skycons
          key={ this.props.color }
          color="#fff"
          icon={ this.props.hour.icon.toUpperCase().replace(/-/g, "_")}
          autoplay={ true } />
      </li>
    );
  }
});

module.exports = ForecastHour;
