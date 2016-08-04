import React from 'react';
import $ from 'jquery';
import plugins from '../../plugins';
import AppDispatcher from '../../dispatcher';
import Layout from '../../layout';

const CONFIG_DID_LOAD = 'CONFIG_DID_LOAD';

class Helios extends React.Component {
  constructor(props) {
    super(props);

    this.receiveConfig = this.receiveConfig.bind(this);

    const viewPlugins = [];
    const initializedPlugins = plugins.map((Plugin) => {
      const p = new Plugin();
      if (p.view()) {
        viewPlugins.push(p);
      }
      return p;
    });

    this.state = {
      plugins: initializedPlugins,
      viewPlugins
    };
  }

  componentDidMount() {
    $.get('/config', (result) => {
      AppDispatcher.handleApiAction({
        type: CONFIG_DID_LOAD,
        data: result
      });
    });

    this.configDispatchToken = AppDispatcher.register((payload) => {
      const action = payload.action;
      if (action.type === CONFIG_DID_LOAD) {
        this.receiveConfig(action.data);
      }
    });
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this.configDispatchToken);
  }

  receiveConfig(data) {
    this.setState(data);
  }

  render() {
    const {
      watermark,
      viewPlugins
    } = this.state;

    return (
      <div className="wrapper">
        <div className="location-watermark">{watermark}</div>
        <Layout plugins={viewPlugins} />
      </div>
    );
  }
}

export default Helios;
