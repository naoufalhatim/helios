import React from "react";
import SlackPing from "../slack-ping";

class Activity extends React.Component {
  render() {
    return (
      <div className="activity">
        <div className="activity-slack">
          <SlackPing />
        </div>
      </div>
    );
  }
}

export default Activity;
