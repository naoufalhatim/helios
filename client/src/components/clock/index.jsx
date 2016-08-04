import React from 'react';
import moment from 'moment';
import './clock.styl';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.getCurrentHour = this.getCurrentHour.bind(this);
    this.setTime = this.setTime.bind(this);

    this.state = {
      secondHandRotation: moment().seconds() / 60 * 360,
      minuteHandRotation: moment().minutes() / 60
    };
  }

  componentDidMount() {
    this.setTime();
    this.setTimeInterval = setInterval(this.setTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setTimeInterval);
  }

  getCurrentHour() {
    const currentHour = (this.props.hourOffset + moment().hours());

    return currentHour > 12 ? currentHour - 12 : currentHour;
  }

  setTime() {
    const minutes = (moment().minutes() / 60);
    const seconds = (moment().seconds() / 60);

    this.setState({
      secondHandRotation: this.state.secondHandRotation + 6,
      minuteHandRotation: ((minutes * 360) + (seconds * 6)),
      hourHandRotation: ((this.getCurrentHour() / 12 * 360) + (360 / 12 * minutes))
    });
  }

  render() {
    const {
      width,
      height,
      mainFaceMarksColor,
      secondaryFaceMarksColor,
      hourHandColor,
      minuteHandColor,
      secondHandColor
    } = this.props;

    return (
      <svg
        viewBox="0 0 300 300"
        x="0px"
        y="0px"
        width={width}
        height={height}>
        <g>
          <g style={{fill: mainFaceMarksColor}}>
            <rect width="10" height="30" x="146.9" />
            <rect width="30" height="10" y="147" />
            <rect width="10" height="30" x="146.9" y="273.8" />
            <rect width="30" height="10" x="273.8" y="147" />
          </g>

          <g style={{fill: secondaryFaceMarksColor}}>
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
            style={{WebkitTransform: `rotate(${this.state.hourHandRotation}deg)`}}
            className="clock-hand"
            x="146.9"
            y="70"
            fill={hourHandColor}
            width="10"
            height="83"/>
          <rect
            style={{WebkitTransform: `rotate(${this.state.minuteHandRotation}deg)`}}
            className="clock-hand"
            x="146.9"
            y="40"
            fill={minuteHandColor}
            width="10"
            height="113" />
          <g className="clock-hand" style={{WebkitTransform: `rotate(${this.state.secondHandRotation}deg)`}}>
            <rect
              x="146.9"
              y="40"
              fill={secondHandColor}
              width="10"
              height="113"/>
            <circle
              fill="none"
              stroke={secondHandColor}
              strokeWidth="10"
              cx="152"
              cy="34"
              r="10" />
          </g>
          <g className="clock-center">
            <circle
              fill={secondHandColor}
              width="10"
              height="10"
              cx="153"
              cy="153"
              r="10" />
          </g>
        </g>
      </svg>
    );
  }
}


Clock.propTypes = {
  height: React.PropTypes.string,
  hourHandColor: React.PropTypes.string,
  hourOffset: React.PropTypes.number,
  mainFaceMarksColor: React.PropTypes.string,
  minuteHandColor: React.PropTypes.string,
  secondHandColor: React.PropTypes.string,
  secondaryFaceMarksColor: React.PropTypes.string,
  width: React.PropTypes.string
};

Clock.defaultProps = {
  height: '600',
  hourHandColor: '#FFFFFF',
  hourOffset: 0,
  mainFaceMarksColor: '#FFFFFF',
  minuteHandColor: '#FFFFFF',
  secondHandColor: '#EF4136',
  secondaryFaceMarksColor: '#FFFFFF',
  width: '600'
};

export default Clock;
