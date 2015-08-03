import React from "react/addons";
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import "./slack.styl";

module.exports = React.createClass({
  render: function() {
    return (<slack-ping>
        <ReactCSSTransitionGroup transitionName="message-orbs">
          { this.props.pings.map(function(t) {
            return <div key={ t.time } style={{background: t.color}}></div>;
            })
          }
        </ReactCSSTransitionGroup>
      </slack-ping>);
  }
});

