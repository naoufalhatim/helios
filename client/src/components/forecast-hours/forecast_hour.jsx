import React from 'react';
import moment from 'moment';
import Temperature from '../temperature';

class ForecastHour extends React.Component {
  render() {
    const {className, hour} = this.props;
    return (
      <div className={className}>
        <h3 className="label-secondary hour-details">
          {moment.unix(hour.time).format('ha')}
        </h3>
        <h2 className="label-primary hour-title">
          <Temperature value={hour.temperature} />
        </h2>
      </div>
    );
  }
}

ForecastHour.propTypes = {
  className: React.PropTypes.string,
  hour: React.PropTypes.object
};

export default ForecastHour;
