import React from "react";
import moment from "moment";

var Clock = React.createClass({
  getInitialState: function() {
    return { time: "" };
  },

  componentDidMount: function() {
    this.setTime();
    setInterval(this.setTime, 1000);
  },

  setTime: function() {
    this.setState({ time: moment().format("h:mm:ss A") });
  },

  render: function() {
    return (
      <div className={ this.props.className }>
        { this.state.time }
      </div>
    );
  }
});

module.exports = Clock;
