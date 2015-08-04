import React from "react";
import config from "../config.json";
import Weather from "./components/weather";

// Import Styles
import "styles/main.styl";

React.render(<Weather config={ config } />, document.getElementById("weather"));
