var React = require('react');

var Bar = React.createClass({
  propTypes: {
    containerHeight: React.PropTypes.number.isRequired,
    barHeight: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <div className="bar-container" style={{"height" : this.props.containerHeight}}>
        <div
          className="bar"
          style={{
            height: this.props.barHeight,
            backgroundColor: this.props.color,
          }}>
        </div>
      </div>
    )
  }
});

module.exports = Bar;
