import {Dispatcher} from 'flux';


class AppDispatcher extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    });
  }

  handleSocketAction(action) {
    this.dispatch({
      source: 'SOCKET_ACTION',
      action
    });
  }

  handleApiAction(action) {
    this.dispatch({
      source: 'API_ACTION',
      action
    });
  }

  registerIfType(type, cb) {
    this.register((payload) => {
      const action = payload.action;
      if (action.actionType === type) {
        cb(payload);
      }
    });
  }

}

module.exports = new AppDispatcher();
