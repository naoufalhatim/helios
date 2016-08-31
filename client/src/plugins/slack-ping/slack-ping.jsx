import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './slack.styl';

class SlackPing extends React.Component {

  render() {
    const {
      channel,
      pings
    } = this.props;

    return (
      <slack-ping>
        <span className="channel-name">
          {channel && pings.length > 0 ? `#${channel}` : ''}
        </span>
        <ReactCSSTransitionGroup transitionName="message-orbs" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            pings.map((ping) => {
              return (
                <div key={ping.time} style={{background: ping.color}} />
              );
            })
          }
        </ReactCSSTransitionGroup>
      </slack-ping>
    );
  }
}

SlackPing.propTypes = {
  channel: React.PropTypes.string,
  pings: React.PropTypes.array
};

export default SlackPing;
