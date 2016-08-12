import React from 'react';
import Plugin from '../../utils/plugin';
import DateStamp from './date-stamp';
import moment from 'moment';

export default class DateStampPlugin extends Plugin {
  constructor() {
    super();

    this.store = {
      date: '',
      day: ''
    };

    this.setDate();
    this.setDateInterval = setInterval(this.setDate, 60000);
  }

  setDate() {
    this.setStore({
      day: moment().format('dddd'),
      date: moment().format('MMMM D, YYYY')
    });
  }

  view() {
    return <DateStamp {...this.store} />;
  }
}
