import React from "react";

class CurrentConditions extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="current">
        <h3 className="label-secondary">Currently</h3>
        <h2 className="label-primary">
          {data.minutely ? data.minutely.summary : data.hourly.summary}
        </h2>
      </div>
    );
  }
}

export default CurrentConditions;
