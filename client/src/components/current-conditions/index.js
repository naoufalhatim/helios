import React from "react";

module.exports = React.createClass({
  render: function() {
    return (
      <div className="current">
        <h3 className="label-secondary">Currently</h3>
        <h2 className="label-primary">
          {
            this.props.data.minutely
            ? this.props.data.minutely.summary
            : this.props.data.hourly.summary
          }
        </h2>
      </div>
    );
  }
});
