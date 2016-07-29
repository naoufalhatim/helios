import React from "react";
import moment from "moment";

import CurrentConditions from "../current-conditions";
import ForecastHours from "../forecast-hours";
import ForecastDay from "../forecast-day";
import HourlyIcons from "../hourly-icons";
import Temperature from "../temperature";

import AppDispatcher from "../../dispatcher";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.dispatchToken = AppDispatcher.registerIfType("weather", (payload) => {
      var action = payload.action;
      this.receiveWeather(action.data);
    });
  }

  receiveWeather(data) {
    this.setState({
      data: data,
      updateMessage: "Weather updated: " + moment().format("h:mm:ss A")
    });
  }

  componentDidUnmount() {
    AppDispatcher.unregister(this.dispatchToken);
  }

  render() {
    const {data} = this.state;

    if (data) {
      return (
        <div className="weather">
          <div className="weather-today">
            <div className="current-forecast">
              <CurrentConditions data={data} />
              <Temperature className='current-temp' value={data.currently.temperature} />
            </div>
            <div className="hourly-forecast">
              <ForecastHours
                hours={data.hourly.data}
                className="hourly-breakdown" />
              <HourlyIcons
                hours={data.hourly.data}
                className="hourly-breakdown" />
            </div>
          </div>
          <div className="future-forecast">
            <ForecastDay
              className="forecast"
              title="Today"
              dailyData={ this.state.data.daily.data[0] }
              alertData={ this.state.data.alerts } />
            <ForecastDay
              className="forecast"
              title={ moment().add(1, "days").format("dddd") }
              dailyData={ this.state.data.daily.data[1] } />
            <ForecastDay
              className="forecast"
              title={ moment().add(2, "days").format("dddd") }
              dailyData={ this.state.data.daily.data[2] } />
          </div>
        </div>
      );
    } else {
        return (
          <span>Loading</span>
        );
    }
  }
}

export default Weather;
