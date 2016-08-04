import React from 'react';
import moment from 'moment';

class Alert extends React.Component {
  render() {
    const {expires, title} = this.props;
    const time = moment.unix(expires).format('MMM DD ha');

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
  expires: React.PropTypes.number,
  title: React.PropTypes.string
};

export default Alert;
