import React from "react";
import {colorForTemp} from "../utils/helpers";

var Temperature = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <span style={{ color: colorForTemp(this.props.value) }}>
        { Math.round(this.props.value) + String.fromCharCode(176) }
      </span>
    );
  }
});

module.exports = Temperature;
