import io from "socket.io-client";
import ServiceActions from "../actions/socket-service";
import {EventEmitter} from "events";

let CONNECTED_EVENT = "connected";
let DISCONNECTED_EVENT = "disconnected";

// Socket Service. Extend event emitter for broadcasting connect and disconnect events
class SocketService extends EventEmitter {
  connect(host) {
    this.socket = io(host, {path: "/socket/"});

    // Setup socket events
    this.socket.on("connect", () => {
      this.emit(CONNECTED_EVENT);

      this.socket.on("event", (data) => {
        ServiceActions.receiveEvent(data.type, data.data);
      });

      this.socket.on("disconnect", () => {
        this.emit(DISCONNECTED_EVENT);
      });
    });
  }

  addConnectedListener(callback) {
    this.on(CONNECTED_EVENT, callback);
  }

  addDisconnectedListener(callback) {
    this.on(DISCONNECTED_EVENT, callback);
  }

  removeConnectedListener(callback) {
    this.removeListener(CONNECTED_EVENT, callback);
  }

  removeDisonnectedListener(callback) {
    this.removeListener(DISCONNECTED_EVENT, callback);
  }
}

module.exports = new SocketService();
