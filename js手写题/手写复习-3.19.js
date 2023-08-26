// 观察者模式
class Observer {
  subscribe(target, fn) {
    target.callbackList.push(fn);
  }
}

class Subject {
  constructor() {
    this.callbackList = [];
  }

  fireEvent(data) {
    this.callbackList.forEach(item => {
      item(data);
    })
  }
}

// 发布订阅模式
// 观察者模式的增强版，观察者模式观察者和主题直接交互，但发布订阅由一个统一的中间者管理订阅
class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  emit(eventName, data) {
    if(!this.events[eventName]) return;
    this.events[eventName].forEach(item => item(data));
  }

  off(eventName, callback) {
    if(!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(item => item !== callback);
  }

  once(eventName, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(eventName, fn);
    }
    this.on(eventName, fn);
  }
}

// 防抖
// 防止多次点击提交，先取消之前的定时器，再设一个新的定时器
function debounce(fn, timeout) {
  let timerId;
  return function() {
    if(timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(() => {
      fn.apply(this, arguments);
      timerId = null;
    }, timeout);
  }
}

// 节流
// 保证执行频率不会大于每timeout一次，如果发现有正在执行的定时器，就不执行本次逻辑
function throttle(fn, timeout) {
  let flag = false;
  return function() {
    if(flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = false;
    })
  }
}

// 简单的promise
// 不考虑then的链式调用
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED'; // resolved
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.result = undefined;
    this.reason = undefined;
    this.fulCallback = [];
    this.rejCallback = [];

    // 要先判断状态是不是pending
    // 改变状态，改变值，执行回调
    const resolve = (result) => {
    }

    const reject = (reason) => {
    }

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  then(fulCallback, rejCallback) {
    // 判断参数类型！！！不是函数的话赋值
    if(this.state == PENDING) {
      this.fulCallback.push(fulCallback);
      this.rejCallback.push(rejCallback);
    }
    if(this.state == FULFILLED) {
      fulCallback(this.value); //是要把值传进去而不是this.resolve啊！！
    }
    if(this.state == REJECTED) {
      rejCallback(this.reason);
    }
  }
}

// 数组扁平化
const flat = (arr) => {
  const res = [];
  arr.forEach(item => {
    if(typeof item !== 'object') { // 用Array.isArray!!!
      res.push(item);
    } else {
      res.push(...flat(item));
    }
  })
  return res;
}

// call
Function.prototype.call = function(thisArg, ...args) {
  let symobl = new Symbol("fn");
  thisArg[symobl] = this;
  let result = thisArg[symobl](...args);
  delete thisArg[symobl];
  return result;
}

// apply和call一样

// bind
Function.prototype.bind = function(thisArg, ...args) {
  const self = this;
  return function f() {
    if(this instanceof f) {
      return new self(...args, ...arguments);
    }
    self.call(thisArg, ...args, ...arguments);
  }
}
// 都没写类型判断，也就是判断this是否为function

// 函数柯里化
function curry(fn) {
  let args = [];
  
  let f = function() {
    args.push(...arguments);
    if(args.length == fn.length) {
      return fn(...args);
    }
    return (...args) => f(...args);
  };
  return f;
}
// 柯里化返回的是一个函数
// 这个函数里需要根据累积参数的个数是否==原函数的length来判断是执行原函数，还是继续返回一个函数
// 没有达到原函数长度时返回的函数是柯里化后的函数本身

// 函数组合compose
function compose(fnArr) {
  return function(x) {
    return fnArr.reduceRight((prev, fn) => { // reduceRight！！！
      return fn(prev);
    }, x); // 返回的函数是有输入参数的！！！
  }
}

// 对象深拷贝（考虑数组！）
function deepClone(map = new WeakMap(), source) {
  if(map.has(source)) return map.get(source);
  // let target = {}; 
  let target = new source.constructor();
  map.set(source, target); // !!!

  let allKeys = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));
  for(let key of allKeys) {
    if(typeof source[key] == 'object' && source[key] !== null) { // 排除null！！！！
      target[key] = deepClone(map, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// 实现new
function newOperator(fn, data) {
  let result = {};
  fn.apply(result, data); // 这里要判断函数返回值是不是typeof的object function
  Object.setPrototypeOf(result, fn.prototype); // 可以直接用Object.create
  return result;
}

// 重写
function newOperator(fn, ...args) {
  if(typeof fn !== 'function') {
    throw new TypeError();
  }

  let obj = Object.create(fn.prototype);
  let res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
} 

// 实现instanceof
function myInstanceof(obj, fn) {
  let fnPro = fn.prototype;
  let prototype = Object.getPrototypeOf(obj);
  while(prototype) {
    if(prototype === fnPro) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}

// 实现寄生组合继承
function inheritPrototype(subType, superType) {
  subType.prototype = Object.create(superType.prototype); // 子类的原型对象是以父类原型对象为原型的空对象
  subType.prototype.constructor = subType;
}

