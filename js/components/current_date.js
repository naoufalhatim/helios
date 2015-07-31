import React from "react";
import moment from "moment";

var CurrentDate = React.createClass({
  getInitialState: function() {
    return { date: "" };
  },

  componentDidMount: function() {
    this.setDate();
    setInterval(this.setDate, 60000);
  },

  setDate: function() {
    this.setState({
      day: moment().format("dddd"),
      date: moment().format("MMMM D, YYYY")
    });
  },

  render: function() {
    return (
      <div className={ this.props.className }>
        <strong>{ this.state.day }</strong> <span>{ this.state.date }</span>
      </div>
    );
  }
});

module.exports = CurrentDate;
