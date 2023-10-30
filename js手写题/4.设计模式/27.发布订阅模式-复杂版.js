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

    // 相比1，就是在判断对象属性的增加了严谨性，只判断对象自身的属性，不用in判断
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
