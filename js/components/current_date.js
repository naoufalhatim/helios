var React = require('react');
var Moment = require('moment');

var CurrentDate = React.createClass({
  getInitialState: function() {
    return { date: "" };
  },

  componentDidMount: function() {
    this.setDate();
    setInterval(this.setDate, 60000);
  },

  setDate: function() {
    this.setState({ date: Moment().format("dddd, MMMM Do") });
  },

  render: function() {
    return (
      <div className={ this.props.className }>
        { this.state.date }
      </div>
    )
  }
});

module.exports = CurrentDate;
