function debounce(fn, time) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {fn.aplly(this, arguments)}, time)
  };
}

function throttle(fn, time) {
  let flag = false;
  return function() {
    if(flag) return;
    flag = true;
    setTimeout(() => {
      fn.aplly(this, arguments);
      flag = false
    }, time);
  };
}

function deepClone(source, hash = new WeakMap()) {
  if(typeof source !== "object" || source == null) {
    throw new Error();
  }
  
  if(hash.has(source)) return hash.get(source);

  let target = source instanceof Array ? [] : {};
  hash.set(source, target);

  let allKeys = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));
  for(let key of allKeys) {
    if(typeof source[key] == "object" && source[key] != null) {
      target[key] = source[key];
    } else {
      target[key] = deepClone(source[key], hash);
    }
  }

  return target;
}

function newOperator(fn, ...args) {
  if(typeof fn !== "function") {
    throw new Error();
  }

  let obj = Object.create(fn.prototype);
  let res = fn.apply(obj, args);

  return res instanceof Object ? res : obj; 
}

// bind
Function.prototype.bind = function(thisArg, ...args) {
  if(typeof this !== "function") {
    throw new Error;
  }

  const self = this;

  return function F() {
    if(this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(thisArg, [...args, ...arguments]);
  }
}

// 发布订阅（事件列表用数组）
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
      this.off(type, handler);
    }
    this.on(type, fn);
  }

}

// 数组去重
const set = new Set(arr);
arr = Array.from(set);

arr = arr.filter((item, index) => {
  arr.indexOf(item) == index;
})




