import React from "react";
import SocketService from "./services/socket.io";
import Weather from "./components/weather";

// Import Styles
import "styles/main.styl";

// Setup socket connection
SocketService.connect();

React.render(<Weather config={ config } />, document.getElementById("weather"));
