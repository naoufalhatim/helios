import React from "react";

module.exports = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <span>{ Math.round(this.props.value) + String.fromCharCode(176) }</span>
    );
  }
});
