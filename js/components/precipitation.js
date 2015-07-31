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
        <div className={ this.props.className }>
          <h4>{ Math.round(this.props.precipProbability * 100) } %</h4>
          <h5>{ this.props.precipType }</h5>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
});

module.exports = Precipitation;
