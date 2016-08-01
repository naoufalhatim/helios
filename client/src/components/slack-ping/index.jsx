import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AppDispatcher from "../../dispatcher";
import "./slack.styl";

class SlackPing extends React.Component {
  constructor(props) {
    super(props);
    this.receiveSlackStream = this.receiveSlackStream.bind(this);

    this.state = {
      pings: []
    };
  }

  componentDidMount() {
    this.dispatchToken = AppDispatcher.registerIfType("slack", (payload) => {
      var action = payload.action;
      this.receiveSlackStream(action.data);
    });
  }

  receiveSlackStream(channelName) {
    var slackColors = [
      "rgba(49, 163, 142, 1)",
      "rgba(237, 180, 49, 1)",
      "rgba(227, 21, 99, 1)",
      "rgba(136, 212, 226, 1)"
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

    setTimeout(() => {this.setState({pings: this.state.pings.slice(1)}); }, 10000);
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.dispatchToken);
  }

  render() {
    return (
      <slack-ping>
        <span className="channel-name">
          {this.state.channel && this.state.pings.length > 0 ? "#" + this.state.channel : ""}
        </span>
        <ReactCSSTransitionGroup transitionName="message-orbs" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            this.state.pings.map(function(t) {
              return (
                <div key={ t.time } style={{background: t.color}}></div>
              );
            })
          }
        </ReactCSSTransitionGroup>
      </slack-ping>
    );
  }
}

export default SlackPing;
