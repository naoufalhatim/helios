import React from 'react';
import Moment from 'moment';

var Clock = React.createClass({
  getInitialState: function() {
    return { time: "" };
  },

  componentDidMount: function() {
    this.setTime();
    setInterval(this.setTime, 1000);
  },

  setTime: function() {
    this.setState({ time: Moment().format('h:mm:ss A') });
  },

  render: function() {
    return (
      <div className={ this.props.className }>
        { this.state.time }
      </div>
    )
  }
});

module.exports = Clock;
