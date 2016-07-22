import React from "react";
import Precipitation from "../precipitation";
import Skycons from "react-skycons";
import _ from "lodash";

class HourlyIcons extends React.Component {
  render() {
    const {hours, className} = this.props;

    return (
      <div className={className}>
        {_.take(hours, 8).map((hour) => {
            return (
              <div className="hour" key={ hour.time }>
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

HourlyIcons.propTypes = {
  hours: React.PropTypes.array,
  className: React.PropTypes.string
};

export default HourlyIcons;
