import React from 'react';
import CurrentWeather from '../plugins/current-weather';
import ClockPlugin from '../plugins/clock';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.handleStoreUpdate = this.handleStoreUpdate.bind(this);

    const initializedPluginViews = props.plugins.map((p, i) => {
      p.onStoreUpdate(this.handleStoreUpdate(i))
      return p;
    });

    this.state = {
      views: initializedPluginViews
    };
  }

  handleStoreUpdate(i) {
    return (p) => {
      const newArray = [...this.state.views];
      newArray[i] = p;
      this.setState({views: newArray})
    }
  }

  render() {
    return (
      <div className="layout">
        {
          this.state.views.map((plugin, i) => {
            return React.cloneElement(plugin.view(), {key: i});
          })
        }
      </div>
    );
  }
}

Layout.propTypes = {
  plugins: React.PropTypes.array
};

export default Layout;
