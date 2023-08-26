// 发布/订阅设计模式(Pub/Sub)
class EventBus {
    constructor() {
        this._eventList = {}
    }

    static Instance() {
        if (!EventBus._instance) {
            Object.defineProperty(EventBus, "_instance", {
                value: new EventBus()
            });
        }
        return EventBus._instance;
    }

    onEvent(type, fn) {
        if (!this.isKeyInObj(this._eventList, type)) {
            Object.defineProperty(this._eventList, type, {
                value: [],
                writable: true,
                enumerable: true,
                configurable: true
            })
        }
        this._eventList[type].push(fn)
    }

    emitEvent(type, data) {
        if (this.isKeyInObj(this._eventList, type)) {
            for (let i = 0; i < this._eventList[type].length; i++) {
                this._eventList[type][i] && this._eventList[type][i](data)
            }
        }
    }

    offEvent(type, fn) {
        for (let i = 0; i < this._eventList[type].length; i++) {
            if (this._eventList[type][i] && this._eventList[type][i] === fn) {
                this._eventList[type][i] = null
            }
        }
    }

    isKeyInObj(obj, key) {
        if (Object.hasOwnProperty.call(obj, key)) {
            return true
        }
        return false
    }
}

module.exports = EventBus.Instance()


// 发布订阅
// 这个版本非常类似我自己写的，应该是对的吧？？
class EventBus {
    constructor() {
      this.eventList = [];
    }
  
    on(type, handler) {
      if(!this.eventList[type]) {
        this.eventList[type] = [handler];
      } else {
        this.eventList[type].push(handler);
      }
    }
  
    off(type, handler) {
      if(!this.eventList[type]) {
        return;
      } else {
        this.eventList[type] = this.eventList[type].filter(item => item != handler);
      }
    }
  
    emit(type, data) {
      this.eventList[type] &&
        this.eventList[type].forEach(handler => handler(data));
    }
  
    once(type, handler) {
      function fn() {
        handler();
        this.off(type, fn);
      }
      this.on(type, fn);
    }
}

