import AppDispatcher from '../dispatcher';

const ServiceActions = {

  receiveEvent(type, payload) {
    AppDispatcher.handleSocketAction({
      actionType: type,
      data: payload
    });
  }

};

module.exports = ServiceActions;
