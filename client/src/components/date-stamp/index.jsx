import React from "react";
import moment from "moment";

class DateStamp extends React.Component {
  constructor(props) {
    super(props);

    this.setDate = this.setDate.bind(this);

    this.state = {
      date: ""
    };
  }

  componentDidMount() {
    this.setDate();
    this.setDateInterval = setInterval(this.setDate, 60000);
  }

  setDate() {
    this.setState({ day: moment().format("dddd"), date: moment().format("MMMM D, YYYY") });
  }

  componentWillUnmount() {
    clearInterval(this.setDateInterval);
  }

  render() {
    const {date, day} = this.state;
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

export default DateStamp;
