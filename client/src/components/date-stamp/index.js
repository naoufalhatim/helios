import React from "react";
import moment from "moment";

module.exports = React.createClass({
  getInitialState: function() {
    return { date: "" };
  },

  componentDidMount: function() {
    this.setDate();
    this.setDateInterval = setInterval(this.setDate, 60000);
  },

  setDate: function() {
    this.setState({ day: moment().format("dddd"), date: moment().format("MMMM M, YYYY") });
  },

  componentWillUnmount: function() {
    clearInterval(this.setDateInterval);
  },

  render: function() {
    return (
      <div className="date-stamp">
        <div className="label-primary">
          <span className="day">{ this.state.day }</span>
          <span className="date-details"> { this.state.date }</span>
        </div>
      </div>
    );
  }
});
