import React from "react";
import SlackPing from "../slack-ping";

module.exports = React.createClass({
  render: function() {
    return (
      <div className="activity">
        <div className="activity-slack">
          <SlackPing></SlackPing>
        </div>
      </div>
    );
  }
});
