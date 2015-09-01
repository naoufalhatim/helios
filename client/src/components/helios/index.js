import React from "react";
import moment from "moment";

import Clock from "../clock";
import CurrentConditions from "../current-conditions";
import ForecastHours from "../forecast-hours";
import ForecastDay from "../forecast-day";
import DateStamp from "../date-stamp";
import Activity from "../activity";

import AppDispatcher from "../../dispatcher";

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.dispatchToken = AppDispatcher.registerIfType("weather", (payload) => {
      var action = payload.action;
      this.receiveWeather(action.data);
    });
  },

  receiveWeather: function(data) {
    this.setState({
      data: data,
      updateMessage: "Weather updated: " + moment().format("h:mm:ss A")
    });
  },

  componentDidUnmount: function() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  render: function() {
    if (this.state.data) {
      return (
        <div className="wrapper">
          <DateStamp />
          <div className="time"><Clock /></div>
          <div className="weather">
            <div className="weather-overview">
              <CurrentConditions data={ this.state.data } />
              <ForecastHours
                hours={ this.state.data.hourly.data }
                className="hourly-breakdown" />
            </div>
            <div className="weather-forecast">
              <ForecastDay
                className="forecast today"
                title="Today"
                data={ this.state.data.daily.data[0] } />
              <ForecastDay
                className="forecast extended"
                title={ moment().add("days", 1).format("dddd") }
                data={ this.state.data.daily.data[1] } />
              <ForecastDay
                className="forecast extended"
                title={ moment().add("days", 2).format("dddd") }
                data={ this.state.data.daily.data[2] } />
            </div>
            <Activity />
          </div>
        </div>
      );
    } else {
      return (
        <span>Loading</span>
      );
    }
  }
});
