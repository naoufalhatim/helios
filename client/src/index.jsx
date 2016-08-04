import React from 'react';
import ReactDOM from 'react-dom';
import SocketService from './services/socket.io';
import Helios from './components/helios';

// Import Styles
import 'styles/main.styl';

// Setup socket connection
SocketService.connect();

ReactDOM.render(<Helios />, document.getElementById('helios'));
