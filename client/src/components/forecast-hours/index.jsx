import React from "react";
import ForecastHour from "./forecast_hour";
import Precipitation from "../precipitation";
import Skycons from "react-skycons";
import "./forecast-hours.styl";
import _ from "lodash";

class ForecastHours extends React.Component {
  render() {
    const {hours, className} = this.props;

    return (
      <div className={className}>
        {_.take(hours, 8).map((hour) => {
            return (
              <div className='hour' key={hour.time}>
                <ForecastHour
                  hour={hour} />
                <Skycons
                    color="#fff"
                    icon={hour.icon.toUpperCase().replace(/-/g, "_")}
                    autoplay={true} />
                <h3 className="label-secondary">
                  <Precipitation
                    precipType={hour.precipType}
                    precipProbability={hour.precipProbability} />
                </h3>
              </div>
            );
          }
        )}
      </div>
    );
  }
}

ForecastHours.propTypes = {
  hours: React.PropTypes.array,
  className: React.PropTypes.string
};

export default ForecastHours;
