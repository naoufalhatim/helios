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

  todayAlert(alerts){
    return (
      <Ticker>
        {
          alerts.map((a, i)=>{
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
      forecast,
      alerts
    } = this.props;

    return (
      <div className={className}>
        <h2 className="label-secondary">
          {title}
        </h2>
        <h1 className="label-primary">
          <Temperature value={forecast.temperatureMax} /> / <Temperature value={forecast.temperatureMin} /> {this.dailyPrecipitation(forecast)}
        </h1>
        <div className="forecast-details">{forecast.summary}</div>
        {alerts && this.todayAlert(alerts)}
      </div>
    );
  }
}

ForecastDay.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  forecast: React.PropTypes.object,
  alerts: React.PropTypes.array
};


export default ForecastDay;
