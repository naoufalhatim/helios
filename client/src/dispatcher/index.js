import {Dispatcher} from "flux";


class AppDispatcher extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  }

  handleSocketAction(action) {
    this.dispatch({
      source: "SOCKET_ACTION",
      action: action
    });
  }

  registerIfType(type, cb) {
    this.register((payload) => {
      var action = payload.action;
      if (action.actionType === type) {
        cb(payload);
      }
    });
  }

}

module.exports = new AppDispatcher();
