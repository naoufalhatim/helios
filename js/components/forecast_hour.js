var React = require('react');

var Moment = require('moment');
var Skycons = require('react-skycons');

var Bar = require('./bar');
var Precipitation = require('./precipitation');

var ForecastHour = React.createClass({
  render: function() {
    return (
      <li
        key={this.props.hour.time}
        className={ this.props.className }
        style={{ color: this.props.color }}>

        <Bar
          containerHeight={ this.props.height }
          barHeight={ this.props.barHeight }
          color={ this.props.color } />

        <h3>{ Moment.unix(this.props.hour.time).format("ha") }</h3>
        <h2>{ Math.round(this.props.hour.apparentTemperature) }</h2>

        <Skycons
          key={ this.props.color }
          color={ this.props.color }
          icon={ this.props.hour.icon.toUpperCase().replace(/-/g, '_')}
          autoplay={ true } />

        <Precipitation
          precipType={ this.props.hour.precipType }
          precipProbability={ this.props.hour.precipProbability } />
      </li>
    )
  }
});

module.exports = ForecastHour;
