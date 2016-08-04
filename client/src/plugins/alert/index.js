import React from 'react';
import Plugin from '../../utils/plugin';
import Alert from './alert';

export default class AlertPlugin extends Plugin {
  constructor() {
    super();

    this.store = {
      title: "",
      expires: 0
    };
  }

  registerToDispatcher(dispatcher) {
    dispatcher.registerIfType('weather', (response) => {
      const weather = response.action.data;
      this.setStore({
        title: weather.alerts[0].title,
        expires: weather.alerts[0].expires
      });
    });
  }

  view() {
    return <Alert {...this.store} />;
  }
}
