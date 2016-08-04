import React from 'react';

class Temperature extends React.Component {
  render() {
    const {value, className} = this.props;
    return (
      <span className={className}>
        {Math.round(value) + String.fromCharCode(176)}
      </span>
    );
  }
}

Temperature.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number.isRequired
};

export default Temperature;
