// node中回调函数机制
// 观察者模式
class EventEmitter {
    constructor() {
        // 存储所有type类型的事件的回调函数
        // type : {callback: fn, once: true}
        this.events = new Map();
    }

    addListener(type, fn, once = false) {
        const handler = this.events.get(type);
        if(!handler) {
            // 没有type绑定事件
            this.events.set(type, wrapCallback(fn, once));
        } else if (handler && typeof handler === "function") {
            // 目前type事件只有一个回调
            this.events.set(type, [handler, wrapCallback(fn, once)]);
        } else {
            // 目前type事件回调>=2
            handler.push(wrapCallback(fn, once));
        }
    }

    removeListener(type, listener) {
        const handler = this.events.get(type);
        if(!handler) {
            return;
        } else if(!Array.isArray(handler)) {
            if(handler.callback === listener.callback) {
                this.events.delete(type);
            }
            else return;
        } else {
            handler.forEach((item, index) => {
                if(item.callback === listener.callback) {
                    handler.splice(index, 1);
                    // type事件回调只剩一个时，将数组改为单个值
                    if(handler.length == 1) {
                        this.events.set(type, handler[0]);
                    }
                }
            })
        }
    }

    once(type, listener) {
        this.addListener(type, listener, true);
    }

    emit(type, ...args) {
        const handler = this.events.get(type);
        if(!handler) {
            return;
        } else if (Array.isArray(handler)) {
            handler.forEach(item => {
                item.callback.apply(this, args);
                if(item.once) {
                    this.removeListener(type, item);
                }
            })
        } else {
            handler.callback.apply(this, args); 
            if(handler.once) {
                this.removeListener(type, handler);
            }           
        }
        return true;
    }

    removeAllListener(type) {
        const handler = this.events.get(type);
        if(!handler) {
            return;
        } else {
            this.events.delete(type);
        }
    }
}
function wrapCallback(fn, once = false) {
    return {callback: fn, once};
}

const eventEmitter = new EventEmitter();
// 观察者绑定回调
eventEmitter.addListener("test", data => {
    console.log(data);
})
// 发生一些事情，触发事件
eventEmitter.emit("test", 1);