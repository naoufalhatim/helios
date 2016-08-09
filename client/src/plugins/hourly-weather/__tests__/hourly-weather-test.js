import React from 'react';
import renderer from 'react-test-renderer';
import HourlyWeather from '../hourly-weather';
import moment from 'moment';

jest.mock('react-skycons', () => 'Skycons');

const testHours = [
  {time: moment().startOf('day').add(1, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(2, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(3, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(4, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(5, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(6, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(7, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(8, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'},
  {time: moment().startOf('day').add(9, 'hour').unix(), temperature: 70, icon: 'partly-cloudy', precipPercent: 20, precipType: 'rain'}
];

describe('HourlyWeather Component', () => {
  it('renders', () => {
    const hourlyOutput = renderer.create(
      <HourlyWeather hours={testHours} />
    );

    expect(hourlyOutput.toJSON()).toMatchSnapshot();
  });
});
