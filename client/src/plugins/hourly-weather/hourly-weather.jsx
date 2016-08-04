import React from 'react';
import Skycons from 'react-skycons';
import moment from 'moment';
import './hourly-weather.styl';
import _ from 'lodash';

class HourlyWeather extends React.Component {
  render() {
    const {hours} = this.props;

    return (
      <div className="hourly-forecast">
        {_.take(hours, 8).map((hour) => {
          return (
            <div className="hour" key={hour.time}>
              <h3 className="label-secondary hour-details">
                {moment.unix(hour.time).format('ha')}
              </h3>
              <h2 className="label-primary hour-title">
                {Math.round(hour.temperature) + String.fromCharCode(176)}
              </h2>
              <div className="forecast-skycon">
                <Skycons
                  color="#fff"
                  icon={hour.icon.toUpperCase().replace(/-/g, '_')}
                  autoplay={true} />
              </div>
              <h3 className="label-secondary">
                {(hour.precipPercent > 0) && `${hour.precipPercent}% ${hour.precipType}`}
              </h3>
            </div>
          );
        })}
      </div>
    );
  }
}

HourlyWeather.propTypes = {
  hours: React.PropTypes.array
};

export default HourlyWeather;
