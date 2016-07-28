import React from "react";
import Temperature from "../temperature";
import Precipitation from "../precipitation";
import Ticker from "../ticker";
import Alert from "../alert";

class ForecastDay extends React.Component {
  dailyPrecipitation(data) {
    if (data.precipType) {
      return (
        <span>
          /&nbsp;
          <Precipitation
            precipType={data.precipType}
            precipProbability={data.precipProbability} />
        </span>
      );
    }
  }

  todayAlert(alertData){
    return (
      <Ticker>
        {
          alertData.map((a, i)=>{
            return (
              <Alert key={i} title={a.title} expires={a.expires} />
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
      dailyData,
      alertData
    } = this.props;

    return (
      <div className={className}>
        <h2 className="label-secondary">
          {title}
        </h2>
        <h1 className="label-primary">
          <Temperature value={dailyData.temperatureMax} /> / <Temperature value={dailyData.temperatureMin} /> {this.dailyPrecipitation(dailyData)}
        </h1>
        <div className="forecast-details">{dailyData.summary}</div>
        {alertData && this.todayAlert(alertData)}
      </div>
    );
  }
}

ForecastDay.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  dailyData: React.PropTypes.object,
  alertData: React.PropTypes.array
};


export default ForecastDay;
