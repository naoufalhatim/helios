import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppDispatcher from '../../dispatcher';
import './slack.styl';

class SlackPing extends React.Component {
  constructor(props) {
    super(props);
    this.receiveSlackStream = this.receiveSlackStream.bind(this);

    this.state = {
      pings: []
    };
  }

  componentDidMount() {
    this.dispatchToken = AppDispatcher.registerIfType('slack', (payload) => {
      const action = payload.action;
      this.receiveSlackStream(action.data);
    });
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.dispatchToken);
  }

  receiveSlackStream(channelName) {
    const slackColors = [
      'rgba(49, 163, 142, 1)',
      'rgba(237, 180, 49, 1)',
      'rgba(227, 21, 99, 1)',
      'rgba(136, 212, 226, 1)'
    ];

    if (this.state.pings.length > 3) {
      return;
    }

    this.setState({
      channel: channelName,
      pings: this.state.pings.concat({
        color: slackColors[this.state.pings.length % slackColors.length],
        time: Date.now()
      })
    });

    setTimeout(() => {this.setState({pings: this.state.pings.slice(1)});}, 10000);
  }

  render() {
    const {
      channel,
      pings
    } = this.state;

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

export default SlackPing;
