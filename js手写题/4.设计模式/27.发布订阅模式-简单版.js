class EventEmiter {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [callback];
    }
    this._events[eventName] = [...(this._events[eventName] || []), callback];
  }

  emit(eventName, ...args) {
    if (!this._events[eventName]) {
      return;
    }
    this._events[eventName].forEach((fn) => fn(...args));
  }

  off(eventName, cb) {
    if (!this._events[eventName]) {
      return;
    }
    this._events[eventName] = this._events[eventName].filter(
      (fn) => fn != cb && fn.l != cb
    );
  }

  once(eventName, callback) {
    const one = (...args) => {
      callback(args);
      this.off(eventName, one);
    };
    one.l = callback; // ??
    this.on(eventName, one);
  }
}

let event = new EventEmiter();

let login1 = function (...args) {
  console.log("login success1", args);
};
let login2 = function (...args) {
  console.log("login success2", args);
};
// event.on('login',login1)
event.once("login", login2);
event.off("login", login1); // 解除订阅
event.emit("login", 1, 2, 3, 4, 5);
event.emit("login", 6, 7, 8, 9);
event.emit("login", 10, 11, 12);
