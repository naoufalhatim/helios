import React from "react";
import Precipitation from "../precipitation";
import Skycons from "react-skycons";

module.exports = React.createClass({
  render: function() {
    var hours = this.props.hours.map(function (hour, index) {
      if (index > 7) { return false; }

      return (
        <div className="hour">
          <Skycons
            key={ hour.time }
            color="#fff"
            icon={ hour.icon.toUpperCase().replace(/-/g, "_") }
            autoplay={ true } />

          <h3 className="label-secondary">
            <Precipitation
              precipType={ hour.precipType }
              precipProbability={ hour.precipProbability } />
          </h3>
        </div>
      );
    }, this);

    return (
      <div className={ this.props.className }>{ hours }</div>
    );
  }
});
