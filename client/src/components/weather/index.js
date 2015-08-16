import React from "react";
import moment from "moment";

import SlackPing from "../slack-ping";
import Temperature from "../temperature";
import ForecastHours from "../forecast-hours";

import AppDispatcher from "../../dispatcher";

var Weather = React.createClass({
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
        <div>
          <div className="row">
            <div className="col-xs-6">
              <h1>
                <Temperature value={this.state.data.currently.temperature} />
              </h1>
            </div>

            <div className="col-xs-6">
              <p>{this.state.data.minutely.summary}</p>
              <p>{this.state.data.hourly.summary}</p>
            </div>
          </div>
          <ForecastHours
            hours={ this.state.data.hourly.data }
            barHeight={ this.props.config.BAR_HEIGHT }
            className="hours clearfix" />

          <p className="text-center update-message">{this.state.updateMessage}</p>
          <SlackPing></SlackPing>
        </div>
      );
    } else {
      return (
        <span>Loading</span>
      );
    }
  }
});

module.exports = Weather;
