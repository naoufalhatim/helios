import React from "react";
import moment from "moment";
import "./clock.styl";

var Clock = React.createClass({
  getInitialState: function() {
    return {
      secondHandRotation: moment().seconds() / 60 * 360,
      minuteHandRotation: moment().minutes() / 60
    };
  },

  getDefaultProps: function() {
    return {
      hourOffset: 0,
      mainFaceMarksColor: "#FFFFFF",
      secondaryFaceMarksColor: "#FFFFFF",
      secondHandColor: "#EF4136",
      minuteHandColor: "#FFFFFF",
      hourHandColor: "#FFFFFF",
      width: 600,
      height: 600
    };
  },

  componentDidMount: function() {
    this.setTime();
    this.setTimeInterval = setInterval(this.setTime, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.setTimeInterval);
  },

  setTime: function() {
    var minutes = (moment().minutes() / 60);
    var seconds = (moment().seconds() / 60);

    this.setState({
      secondHandRotation: this.state.secondHandRotation + 6,
      minuteHandRotation: ((minutes * 360) + (seconds * 6)),
      hourHandRotation: ((this.getCurrentHour() / 12 * 360) + (360 / 12 * minutes))
    });
  },

  render: function() {
    return (
      <svg viewBox="0 0 300 300" x="0px" y="0px" width={ this.props.width } height={ this.props.height }>
        <g>
          <g style={{ fill: this.props.mainFaceMarksColor }}>
            <rect width="10" height="30" x="146.9" />
            <rect width="30" height="10" y="147" />
            <rect width="10" height="30" x="146.9" y="273.8" />
            <rect width="30" height="10" x="273.8" y="147" />
          </g>

          <g style={{ fill: this.props.secondaryFaceMarksColor }}>
            <rect
              transform="matrix(-0.8809 0.4733 -0.4733 -0.8809 549.1896 424.4109)"
              x="216.2" y="276.3"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.8809 0.4733 -0.4733 -0.8809 165.1149 3.6909)"
              x="77.1" y="17.6"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.8809 -0.4733 0.4733 -0.8809 21.2759 567.9572)"
              x="77.1" y="276.3"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.8809 -0.4733 0.4733 -0.8809 405.3509 147.2368)"
              x="216.2" y="17.6"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.5519 -0.8339 0.8339 -0.5519 -148.9517 385.879)"
              x="24.2" y="228"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.5519 -0.8339 0.8339 -0.5519 366.5014 338.5128)"
              x="269.2" y="65.8"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.5519 0.8339 -0.8339 -0.5519 619.5043 133.2028)"
              x="269" y="228"
              width="10" height="10"/>
            <rect
              transform="matrix(-0.5519 0.8339 -0.8339 -0.5519 104.1569 85.3939)"
              x="24.1" y="65.7"
              width="10" height="10"/>
          </g>

          <rect
            style={{ WebkitTransform: "rotate(" + this.state.hourHandRotation + "deg)" }}
            className="clock-hand"
            x="146.9"
            y="70"
            fill={ this.props.hourHandColor }
            width="10"
            height="83"/>
          <rect
            style={{ WebkitTransform: "rotate(" + this.state.minuteHandRotation + "deg)" }}
            className="clock-hand"
            x="146.9"
            y="40"
            fill={ this.props.minuteHandColor }
            width="10"
            height="113" />
          <g className="clock-hand" style={{ WebkitTransform: "rotate(" + this.state.secondHandRotation + "deg)" }}>
            <rect x="146.9" y="40" fill={ this.props.secondHandColor } width="10" height="113"/>
            <circle fill="none" stroke={ this.props.secondHandColor } strokeWidth="10" cx="152" cy="34" r="10" />
          </g>
          <g className="clock-center">
            <circle fill={ this.props.secondHandColor } width="10" height="10" cx="153" cy="153" r="10" />
          </g>
        </g>
      </svg>
    );
  },

  getCurrentHour: function() {
    var currentHour = (this.props.hourOffset + moment().hours());

    return currentHour > 12 ? currentHour - 12 : currentHour;
  }
});

module.exports = Clock;
