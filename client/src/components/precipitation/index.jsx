import React from "react";

class Percipitation extends React.Component {
  render() {
    const {className, precipProbability, precipType} = this.props;
    const precipPercent = Math.round(precipProbability * 100);

    if (precipPercent > 0) {
      return (
        <span className={className}>
          {precipPercent}% {precipType}
        </span>
      );
    } else {
      return <span></span>;
    }
  }
}

Percipitation.propTypes = {
  className: React.PropTypes.string,
  precipProbability: React.PropTypes.number.isRequired,
  precipType: React.PropTypes.string
};

export default Percipitation;
