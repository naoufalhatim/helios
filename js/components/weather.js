import React from 'react';
import Moment from 'moment';

import Clock from './clock';
import CurrentDate from './current_date';
import Temperature from './temperature';
import ForecastHours from './forecast_hours';
import {colorForTemp} from '../utils/helpers';

var Weather = React.createClass({
  componentDidMount: function() {
    this._loadWeatherFromServer();

    setInterval(this._loadWeatherFromServer, 120000);
  },

  render: function() {
    if (this.state) {
      return (
        <div style={{ color: colorForTemp(this.state.data.currently.temperature) }}>
          <div className="row">
            <CurrentDate className="col-sm-4 text-left" />
            <h1 className="col-sm-4">
              <Temperature value={this.state.data.currently.temperature} />
            </h1>
            <Clock className="col-sm-4 text-right"/>
          </div>
          <ForecastHours
            hours={ this.state.data.hourly.data }
            barHeight={ this.props.config.BAR_HEIGHT }
            className="hours clearfix" />
          <p className="text-center">{this.state.data.minutely.summary}</p>
          <p className="text-center">{this.state.data.hourly.summary}</p>
          <p className="text-center update-message">{this.state.updateMessage}</p>
        </div>
      )
    } else {
      return (
        <span>Loading</span>
      )
    }
  },

  _loadWeatherFromServer: function() {
    $.ajax({
      url: this.props.config.API_URL,
      dataType: 'jsonp',
      cache: false,
      success: function(data) {
        this.setState({
          data: data,
          updateMessage: "Last updated: " + Moment().format('h:mm:ss A'),
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = Weather;
