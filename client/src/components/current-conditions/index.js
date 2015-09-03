import React from "react";

module.exports = React.createClass({
  render: function() {
    return (
      <div className="current">
        <h2 className="label-primary">Currently</h2>
        <h3 className="label-secondary">{ this.props.data.minutely.summary }</h3>
      </div>
    );
  }
});
