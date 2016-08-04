import Plugin from '../../utils/plugin';

export default class RefreshPlugin extends Plugin {
  registerToDispatcher(dispatcher) {
    dispatcher.registerIfType('command', (response) => {
      if (response.action.data.name === 'refresh') {
        window.location.reload();
      }
    });
  }
}
