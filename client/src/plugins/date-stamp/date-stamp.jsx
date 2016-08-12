import React from 'react';

class DateStamp extends React.Component {
  render() {
    const {date, day} = this.props;
    return (
      <div className="date-stamp">
        <div className="label-primary">
          <span className="day">{day}</span>
          <span className="date-details">{date}</span>
        </div>
      </div>
    );
  }
}

DateStamp.propTypes = {
  date: React.PropTypes.string,
  day: React.PropTypes.string
};

export default DateStamp;
