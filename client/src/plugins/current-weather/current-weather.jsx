import React from 'react';

class CurrentWeather extends React.Component {
  render() {
    const {temperature, summary} = this.props;
    return (
      <div className="current-forecast">
        <div className="current">
          <h3 className="label-secondary">Currently</h3>
          <h2 className="label-primary">{summary}</h2>
        </div>
        <div className="current-temp">
          {Math.round(temperature) + String.fromCharCode(176)}
        </div>
      </div>
    );
  }
}

CurrentWeather.propTypes = {
  summary: React.PropTypes.string.isRequired,
  temperature: React.PropTypes.number.isRequired
};

export default CurrentWeather;
