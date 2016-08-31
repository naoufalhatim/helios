import React from 'react';
import renderer from 'react-test-renderer';
import SlackPing from '../slack-ping';
import moment from 'moment';

const data = {
  channel: '#general',
  pings: [
    {color: 'rgba(49, 163, 142, 1)', time: moment().startOf('day').add(1, 'minute').unix()},
    {color: 'rgba(237, 180, 49, 1)', time: moment().startOf('day').add(2, 'minute').unix()},
    {color: 'rgba(227, 21, 99, 1)', time: moment().startOf('day').add(3, 'minute').unix()}
  ]
};

jest.mock('react/lib/ReactDefaultInjection');

describe('SlackPing Component', () => {
  it('renders', () => {
    const slackPingOutput = renderer.create(
        <SlackPing {...data}/>
    );

    expect(slackPingOutput.toJSON()).toMatchSnapshot();
  });
});
