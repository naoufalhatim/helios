import React from "react";
import moment from "moment";

import Clock from "../clock";
import CurrentConditions from "../current-conditions";
import ForecastHours from "../forecast-hours";
import ForecastDay from "../forecast-day";
import DateStamp from "../date-stamp";
import Activity from "../activity";
import HourlyIcons from "../hourly-icons";
import Temperature from "../temperature";

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

    this.commandDispatchToken = AppDispatcher.registerIfType("command", (payload) => {
      var action = payload.action;
      this.receiveCommand(action.data);
    });
  },

  receiveWeather: function(data) {
    this.setState({
      data: data,
      updateMessage: "Weather updated: " + moment().format("h:mm:ss A")
    });
  },

  receiveCommand: function(data) {
    // Top level command listeners
    switch (data.name) {
      case "refresh":
        // Reload the page when the "refresh" command is sent
        location.reload();
        break;
    }
  },

  componentDidUnmount: function() {
    AppDispatcher.unregister(this.dispatchToken);
    AppDispatcher.unregister(this.commandDispatchToken);
  },

  render: function() {
    if (this.state.data) {
      return (
        <div className="wrapper">
          <div className="location-watermark">PVD</div>
          <DateStamp />
          <div className="time">
            <div className="primary-clock"><Clock /></div>
            <div className="secondary-clocks">
              <div>
                <Clock hourOffset={ -2 } />
                <span>BLDR</span>
              </div>
              <div>
                <Clock />
                <span>NYC</span>
              </div>
            </div>
          </div>
          <div className="weather">
            <div className="weather-overview">
              <CurrentConditions data={ this.state.data } />
              <ForecastHours
                hours={ this.state.data.hourly.data }
                className="hourly-breakdown" />
            </div>
            <div className="weather-overview">
              <h1 className="current-temp current">
                <Temperature value={ this.state.data.currently.temperature } />
              </h1>
              <HourlyIcons
                hours={ this.state.data.hourly.data }
                className="hourly-breakdown" />
            </div>
            <div className="weather-forecast">
              <ForecastDay
                className="forecast"
                title="Today"
                data={ this.state.data.daily.data[0] } />
              <ForecastDay
                className="forecast"
                title={ moment().add(1, "days").format("dddd") }
                data={ this.state.data.daily.data[1] } />
              <ForecastDay
                className="forecast"
                title={ moment().add(2, "days").format("dddd") }
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
