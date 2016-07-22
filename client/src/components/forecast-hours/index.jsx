import React from "react";
import ForecastHour from "./forecast_hour";
import "./forecast-hours.styl";
import _ from "lodash";

class ForecastHours extends React.Component {
  render() {
    const {hours, className} = this.props;

    return (
      <div className={className}>
        {_.take(hours, 8).map((hour) => {
            return (
              <ForecastHour
                className="hour"
                key={hour.time}
                hour={hour} />
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
