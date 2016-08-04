import React from 'react';
import Temperature from '../temperature';
import Precipitation from '../precipitation';
import Ticker from '../ticker';
import Alert from '../alert';

class ForecastDay extends React.Component {
  forecastPrecipitation(forecast) {
    if (forecast.precipType) {
      return (
        <span>
          /&nbsp;
          <Precipitation
            precipType={forecast.precipType}
            precipProbability={forecast.precipProbability} />
        </span>
      );
    }
  }

  todayAlert(alerts) {
    return (
      <Ticker>
        {
          alerts.map((alert, i) => {
            return (
              <Alert key={i} title={alert.title} expires={alert.expires} />
            );
          })
        }
      </Ticker>
    );
  }

  render() {
    const {
      className,
      title,
      forecast,
      alerts
    } = this.props;

    return (
      <div className={className}>
        <h2 className="label-secondary">
          {title}
        </h2>
        <h1 className="label-primary">
          <Temperature value={forecast.temperatureMax} />
          / <Temperature value={forecast.temperatureMin} />
          {this.forecastPrecipitation(forecast)}
        </h1>
        <div className="forecast-details">{forecast.summary}</div>
        {alerts && this.todayAlert(alerts)}
      </div>
    );
  }
}

ForecastDay.propTypes = {
  alerts: React.PropTypes.array,
  className: React.PropTypes.string,
  forecast: React.PropTypes.object,
  title: React.PropTypes.string
};


export default ForecastDay;
