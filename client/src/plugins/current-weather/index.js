import React from 'react';
import Plugin from '../../utils/plugin';
import CurrentWeather from './current-weather';

export default class CurrentWeatherPlugin extends Plugin {
  constructor() {
    super();

    this.store = {
      temperature: 0,
      summary: ''
    };
  }

  registerToDispatcher(dispatcher) {
    dispatcher.registerIfType('weather', (response) => {
      const weather = response.action.data;
      this.setStore({
        temperature: weather.currently.temperature,
        summary: weather.minutely ? weather.minutely.summary : weather.hourly.summary
      });
    });
  }

  view() {
    return <CurrentWeather {...this.store} />;
  }
}
