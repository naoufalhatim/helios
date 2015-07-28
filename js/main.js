import React from 'react';
import config from '../config.json';
import Weather from './components/weather';

React.render(<Weather config={ config } />, document.getElementById('weather'));
