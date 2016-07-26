import React from "react";

import Temperature from "../temperature";
import Precipitation from "../precipitation";
import Ticker from "../ticker";
import Alert from "../alert";

module.exports = React.createClass({
  render: function() {
    return (
      <div className={ this.props.className }>
        <h2 className="label-secondary">
          { this.props.title }
        </h2>
        <h1 className="label-primary">
          <Temperature value={ this.props.dailyData.temperatureMax } /> / <Temperature value={ this.props.dailyData.temperatureMin } /> { this.dailyPrecipitation() }
        </h1>
        <div className="forecast-details">{ this.props.dailyData.summary }</div>
        { this.props.alertData && this.todayAlert() }
      </div>
    );
  },

  dailyPrecipitation: function() {
    if (this.props.dailyData.precipType) {
      return (
        <span>/ <Precipitation precipType={ this.props.dailyData.precipType } precipProbability={ this.props.dailyData.precipProbability } /></span>
      );
    }
  },

  todayAlert: function () {
    return (
      <Ticker>
        {
          this.props.alertData.map((a, i)=>{
            return (
              <Alert key={ i } title={ a.title } expires={ a.expires } />
            );
          })
        }
      </Ticker>
    );
  }
});
