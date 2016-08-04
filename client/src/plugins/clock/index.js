import React from 'react';
import Plugin from '../../utils/plugin';
import Clock from './clock';

export default class ClockPlugin extends Plugin {
  view() {
    return <Clock width="300" height="300" />;
  }
}
