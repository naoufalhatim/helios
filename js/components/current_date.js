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
    this.setState({ date: moment().format("dddd, MMMM Do") });
  },

  render: function() {
    return (
      <div className={ this.props.className }>
        { this.state.date }
      </div>
    );
  }
});

module.exports = CurrentDate;
