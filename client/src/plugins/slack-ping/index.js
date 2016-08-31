import React from 'react';
import Plugin from '../../utils/plugin';
import SlackPing from './slack-ping';

const slackColors = [
  'rgba(49, 163, 142, 1)',
  'rgba(237, 180, 49, 1)',
  'rgba(227, 21, 99, 1)',
  'rgba(136, 212, 226, 1)'
];

export default class CurrentWeatherPlugin extends Plugin {
  constructor() {
    super();

    this.store = {
      channel: '',
      pings: []
    };
  }

  registerToDispatcher(dispatcher) {
    dispatcher.registerIfType('slack', (response) => {
      const channelName = response.action.data;
      if (this.store.pings.length <= 3) {
        this.setStore({
          channel: channelName,
          pings: this.store.pings.concat({
            color: slackColors[this.store.pings.length % slackColors.length],
            time: Date.now()
          })
        });
        setTimeout(() => {this.setStore({pings: this.store.pings.slice(1)});}, 10000);
      }
    });
  }

  view() {
    return <SlackPing {...this.store} />;
  }
}
