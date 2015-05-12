var React = require('react');
var Weather = require('./components/weather');

colorForTemp = function(tempInF) {
  var t = ((tempInF - 32) * (5 / 9));
  var hue = 30 + 240 * (31 - t) / 50;

  return 'hsl(' + [hue, '90%', '50%'] + ')';
}

React.render(<Weather />, document.getElementById('weather'));
