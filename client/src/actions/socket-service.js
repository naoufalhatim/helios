import AppDispatcher from "../dispatcher";

var ServiceActions = {

  receiveEvent: function(type, payload) {
    AppDispatcher.handleSocketAction({
      actionType: type,
      data: payload
    });
  }

};

module.exports = ServiceActions;
