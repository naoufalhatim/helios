import React from "react";

var Precipitation = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    precipProbability: React.PropTypes.number.isRequired,
    precipType: React.PropTypes.string
  },

  render: function() {
    if (Math.round(this.props.precipProbability * 100) > 0) {
      return (
        <span className={ this.props.className }> { Math.round(this.props.precipProbability * 100) }% { this.props.precipType }</span>
      );
    } else {
      return <span></span>;
    }
  }
});

module.exports = Precipitation;
