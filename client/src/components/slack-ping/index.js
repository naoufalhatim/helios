import React from "react/addons";
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import AppDispatcher from "../../dispatcher";
import "./slack.styl";

module.exports = React.createClass({
  getInitialState: function() {
    return {
      pings: []
    };
  },

  componentDidMount: function() {
    this.dispatchToken = AppDispatcher.registerIfType("slack", () => {
      this.receiveSlackStream();
    });
  },

  receiveSlackStream: function() {
    var slackColors = ["rgba(49, 163, 142, 1)", "rgba(237, 180, 49, 1)", "rgba(227, 21, 99, 1)", "rgba(136, 212, 226, 1)"];
    if (this.state.pings.length > 3) {
      return;
    }
    this.setState({pings: this.state.pings.concat({
      color: slackColors[this.state.pings.length % slackColors.length],
      time: Date.now()
    })});
    setTimeout(() => {this.setState({pings: this.state.pings.slice(1)}); }, 10000);
  },

  componentDidUnmount: function() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  render: function() {
    return (<slack-ping>
        <ReactCSSTransitionGroup transitionName="message-orbs">
          { this.state.pings.map(function(t) {
            return <div key={ t.time } style={{background: t.color}}></div>;
            })
          }
        </ReactCSSTransitionGroup>
      </slack-ping>);
  }
});

