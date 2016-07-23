import React from "react";

class Ticker extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      iteration: 0
    };
  };

  componentDidMount(){
    const { timeOut } = this.props;

    this.interval = setInterval(() => {
      this.setState({
        iteration: this.state.iteration + 1
      });
    }, timeOut);
  };

  componentWillUnmount(){
    clearInterval(this.interval);
  };

  render(){
    const { children } = this.props;

    return (children[this.state.iteration % children.length]);
  }
}

Ticker.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
  timeOut: React.PropTypes.number
};

Ticker.defaultProps = {
  timeOut: 5 * 1000
};

export default Ticker;
