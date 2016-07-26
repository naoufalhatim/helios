import React from "react";
import moment from "moment";

class Alert extends React.Component{
  render() {
    const { expires, title } = this.props;
    const time = moment.unix(expires).format("MMM DD ha");

    return (
      <div className="alert">
        <div>
          {title}
        </div>
        <div className="alert-expires">
          Expires: {time}
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  title: React.PropTypes.string,
  expires: React.PropTypes.number
};

export default Alert;
