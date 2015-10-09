import React from "react";

import Clock from "../clock";
import DateStamp from "../date-stamp";
import Activity from "../activity";
import Weather from "../weather";

import AppDispatcher from "../../dispatcher";

module.exports = React.createClass({
  componentDidMount: function() {
    this.commandDispatchToken = AppDispatcher.registerIfType("command", (payload) => {
      var action = payload.action;
      this.receiveCommand(action.data);
    });
  },

  receiveCommand: function(data) {
    // Top level command listeners
    switch (data.name) {
      case "refresh":
        // Reload the page when the "refresh" command is sent
        location.reload();
        break;
    }
  },

  componentDidUnmount: function() {
    AppDispatcher.unregister(this.commandDispatchToken);
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="location-watermark">PVD</div>
        <DateStamp />
        <div className="time">
          <div className="primary-clock"><Clock /></div>
          <div className="secondary-clocks">
            <div>
              <Clock hourOffset={ -2 } />
              <span>BLDR</span>
            </div>
            <div>
              <Clock />
              <span>NYC</span>
            </div>
          </div>
        </div>
        <Weather />
        <Activity />
      </div>
    );
  }
});
