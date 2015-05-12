var React = require('react');

var config = require('../../config.json');

var Clock = require('./clock');
var CurrentDate = require('./current_date');
var Temperature = require('./temperature');
var ForecastHours = require('./forecast_hours');

var Weather = React.createClass({
  componentDidMount: function() {
    this._loadWeatherFromServer();

    setInterval(this._loadWeatherFromServer, 120000);
  },

  render: function() {
    if (this.state) {
      return (
        <div style={{ color: colorForTemp(this.state.data.currently.apparentTemperature) }}>
          <div className="row">
            <Clock className="col-sm-4"/>
            <h1 className="col-sm-4">
              <Temperature value={this.state.data.currently.apparentTemperature} />
            </h1>
            <CurrentDate className="col-sm-4 text-right" />
          </div>
          <ForecastHours hours={ this.state.data.hourly.data } className="hours clearfix" />
          <p className="text-center">{this.state.data.minutely.summary}</p>
          <p className="text-center">{this.state.data.hourly.summary}</p>
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
      url: config.API_URL,
      dataType: 'jsonp',
      cache: false,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

module.exports = Weather;
