import AppDispatcher from '../dispatcher';

export default class Plugin {
  constructor() {
    this._listeners = [];
    this.store = {};

    this._callListeners = this._callListeners.bind(this);
    this.setStore = this.setStore.bind(this);
    this.onStoreUpdate = this.onStoreUpdate.bind(this);
    this.registerToDispatcher = this.registerToDispatcher.bind(this);
    this.view = this.view.bind(this);

    this.registerToDispatcher(AppDispatcher);
  }

  _callListeners() {
    this._listeners.forEach((l) => l(this));
  }

  setStore(newStoreValue = {}) {
    this.store = {...this.store, ...newStoreValue};
    this._callListeners()
  }

  onStoreUpdate(cb) {
    this._listeners.push(cb);
  }

  registerToDispatcher(dispatcher) {}

  view() {}
}
