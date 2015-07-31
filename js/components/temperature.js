import React from "react";

var Temperature = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <span>{ Math.round(this.props.value) + String.fromCharCode(176) }</span>
    );
  }
});

module.exports = Temperature;
