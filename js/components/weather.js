import React from "react";
import moment from "moment";
import io from "socket.io-client";
import $ from "jquery";

import CurrentDate from "./current_date";
import SlackPing from "./slack-ping";
import DailyTemperatures from "./daily_temperatures";
import Temperature from "./temperature";
import ForecastHours from "./forecast_hours";

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
            <div className="col-xs-9 col-xs-offset-3">
              <div className="row header">
                <CurrentDate className="date col-xs-6" />

                <div className="col-xs-6 text-right">
                  <SlackPing pings={ this.state.pings }></SlackPing>
                </div>
              </div>
              <div className="row main">
                <div className="col-xs-4">
                  <h5>Currently</h5>
                  <h6 className="update-message">{this.state.updateMessage}</h6>

                  <h1><Temperature value={this.state.data.currently.temperature} /></h1>
                </div>

                <div className="col-xs-8">
                  <ForecastHours
                    hours={ this.state.data.hourly.data }
                    barHeight={ this.props.config.BAR_HEIGHT }
                    className="hours clearfix" />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-4">
                  <h5>Today</h5>
                  <h6><DailyTemperatures day={ this.state.data.daily.data[0] } /></h6>

                  <p>{this.state.data.minutely.summary}</p>
                </div>

                <div className="col-xs-4">
                  <h5>{ moment().add("days", 1).format("dddd") }</h5>
                  <h6><DailyTemperatures day={ this.state.data.daily.data[1] } /></h6>

                  <p>{this.state.data.daily.data[1].summary}</p>
                </div>

                <div className="col-xs-4">
                  <h5>{ moment().add("days", 2).format("dddd") }</h5>
                  <h6><DailyTemperatures day={ this.state.data.daily.data[2] } /></h6>

                  <p>{this.state.data.daily.data[2].summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <span>Loading</span>
      );
    }
  },

  connectToSlackStream: function() {
    var socket = io("http://localhost:9999");
    var slackColors = ["rgba(49, 163, 142, 1)", "rgba(237, 180, 49, 1)", "rgba(227, 21, 99, 1)", "rgba(136, 212, 226, 1)"];
    socket.on("message", () => {
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
          updateMessage: "As of " + moment().format("h:mm A")
        });
      }
    });
  }
});

module.exports = Weather;
