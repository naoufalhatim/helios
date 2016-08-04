import React from 'react';
import moment from 'moment';
import CurrentConditions from '../current-conditions';
import ForecastHours from '../forecast-hours';
import ForecastDay from '../forecast-day';
import Temperature from '../temperature';
import AppDispatcher from '../../dispatcher';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.dispatchToken = AppDispatcher.registerIfType('weather', (payload) => {
      const action = payload.action;
      this.receiveWeather(action.data);
    });
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.dispatchToken);
  }

  receiveWeather(data) {
    this.setState({
      weather: data,
      updateMessage: `Weather updated: ${moment().format('h:mm:ss A')}`
    });
  }

  renderWeather(weather) {
    return (
      <div className="weather">
        <div className="weather-today">
          <div className="current-forecast">
            <CurrentConditions data={weather} />
            <Temperature className="current-temp" value={weather.currently.temperature} />
          </div>
          <div className="hourly-forecast">
            <ForecastHours
              hours={weather.hourly.data}
              className="hourly-breakdown" />
          </div>
        </div>
        <div className="future-forecast">
          <ForecastDay
            className="forecast"
            title="Today"
            forecast={weather.daily.data[0]}
            alerts={weather.alerts} />
          <ForecastDay
            className="forecast"
            title={moment().add(1, 'days').format('dddd')}
            forecast={weather.daily.data[1]} />
          <ForecastDay
            className="forecast"
            title={moment().add(2, 'days').format('dddd')}
            forecast={weather.daily.data[2]} />
        </div>
      </div>
    );
  }

  render() {
    const {weather} = this.state;

    return (
      <div>
        {weather ? this.renderWeather(weather) : <span>Loading</span>}
      </div>
    );
  }
}

export default Weather;
