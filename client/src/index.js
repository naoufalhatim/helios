import React from "react";
import SocketService from "./services/socket.io";
import Helios from "./components/helios";

// Import Styles
import "styles/main.styl";

// Setup socket connection
SocketService.connect();

React.render(<Helios/>, document.getElementById("helios"));
