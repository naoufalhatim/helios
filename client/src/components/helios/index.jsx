import React from "react";

import Clock from "../clock";
import DateStamp from "../date-stamp";
import Activity from "../activity";
import Weather from "../weather";
import $ from "jquery";

import AppDispatcher from "../../dispatcher";

const CONFIG_DID_LOAD = "CONFIG_DID_LOAD";

class Helios extends React.Component {
  constructor(props) {
    super(props);

    this.receiveConfig = this.receiveConfig.bind(this);

    this.state = {};
  }

  componentDidMount() {
    $.get("/config", (result) => {
      AppDispatcher.handleApiAction({
        type: CONFIG_DID_LOAD,
        data: result
      });
    });

    this.commandDispatchToken = AppDispatcher.registerIfType("command", (payload) => {
      var action = payload.action;
      this.receiveCommand(action.data);
    });

    this.configDispatchToken = AppDispatcher.register((payload) => {
      let action = payload.action;
      if (action.type === CONFIG_DID_LOAD) {
        this.receiveConfig(action.data);
      }
    });
  }

  receiveCommand(data) {
    // Top level command listeners
    switch (data.name) {
      case "refresh":
        // Reload the page when the "refresh" command is sent
        location.reload();
        break;
    }
  }

  receiveConfig(data) {
    this.setState(data);
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.commandDispatchToken);
    AppDispatcher.unregister(this.configDispatchToken);
  }

  render() {
    const {
      watermark,
      firstClockOffset,
      firstClockLabel,
      secondClockOffset,
      secondClockLabel
    } = this.state;
    return (
      <div className="wrapper">
        <div className="location-watermark">
          {watermark}
        </div>
        <DateStamp />
        <div className="time">
          <div className="primary-clock">
            <Clock width="300" height="300" />
          </div>
          <div className="secondary-clocks">
            <div>
              <Clock hourOffset={firstClockOffset} />
              <span>{firstClockLabel}</span>
            </div>
            <div>
              <Clock hourOffset={secondClockOffset} />
              <span>{secondClockLabel}</span>
            </div>
          </div>
        </div>
        <Weather />
        <Activity />
      </div>
    );
  }
}

export default Helios;
