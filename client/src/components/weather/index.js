import React from "react";
import moment from "moment";
import io from "socket.io-client";
import $ from "jquery";

import SlackPing from "../slack-ping";
import Temperature from "../temperature";
import ForecastHours from "../forecast-hours";

var Weather = React.createClass({
  getInitialState: function() {
    return {
      pings: []
    };
  },
  componentDidMount: function() {
    this.loadWeatherFromServer();
    this.connectToSlackStream();
    setInterval(this.loadWeatherFromServer, 120000);
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
          <SlackPing pings={ this.state.pings }></SlackPing>
        </div>
      );
    } else {
      return (
        <span>Loading</span>
      );
    }
  },

  connectToSlackStream: function() {
    var socket = io({path: "/socket/"});
    var slackColors = ["rgba(49, 163, 142, 1)", "rgba(237, 180, 49, 1)", "rgba(227, 21, 99, 1)", "rgba(136, 212, 226, 1)"];
    socket.on("slack", () => {
      if (this.state.pings.length > 3) {
        return;
      }

      this.setState({pings: this.state.pings.concat({
        color: slackColors[this.state.pings.length % slackColors.length],
        time: Date.now()
      })});
      setTimeout(() => {this.setState({pings: this.state.pings.slice(1)}); }, 10000);
    });
  },

  loadWeatherFromServer: function() {
    $.ajax({
      url: this.props.config.API_URL,
      dataType: "jsonp",
      cache: false,
      context: this,
      success: function(data) {
        this.setState({
          data: data,
          updateMessage: "Last updated: " + moment().format("h:mm:ss A")
        });
      }
    });
  }
});

module.exports = Weather;
