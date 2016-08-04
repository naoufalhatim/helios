import React from 'react';
import Plugin from '../../utils/plugin';
import HourlyWeather from './hourly-weather';

export default class HourlyWeatherPlugin extends Plugin {
  constructor() {
    super();

    this.store = {
      hours: []
    };
  }

  registerToDispatcher(dispatcher) {
    dispatcher.registerIfType('weather', (response) => {
      const weather = response.action.data;
      this.setStore({
        hours: weather.hourly.data
      });
    });
  }

  view() {
    return <HourlyWeather {...this.store} />;
  }
}
