import React from 'react';
import renderer from 'react-test-renderer';
import DateStamp from '../date-stamp';

const dateStampData = {
  day: 'Friday',
  date: 'August 12, 2016'
};

describe('DateStampComponent', () => {
  it('renders', () => {
    const dateStampOutput = renderer.create(
        <DateStamp
          date={dateStampData.date}
          day={dateStampData.day}/>
    );

    expect(dateStampOutput.toJSON()).toMatchSnapshot();
  });
});
