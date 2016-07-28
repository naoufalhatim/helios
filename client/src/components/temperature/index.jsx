import React from "react";

class Temperature extends React.Component {
  render() {
    return (
      <span>
        {Math.round(this.props.value) + String.fromCharCode(176)}
      </span>
    );
  }
}

Temperature.propTypes = {
  value: React.PropTypes.number.isRequired
};

export default Temperature;
