// 柯里化
function curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        curried.apply(this, args.concat(args2));
      }
    }
  }
}

// 节流
// 鼠标滚动
function throttle(fn, timeout) {
  let flag = false;
  return function() {
    if(flag) return;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = false;
    }, timeout);

    flag = true;
  }
}

// 防抖
// 表单多次提交，鼠标多次点击
function debounce(fn, timeout) {
  let timerId = null;
  return function f() {
    if(timerId) {
      clearTimeout(timerId);
      timerId = null; // clearTimeout并不会改变timerId的值
    }
    timerId = setTimeout(() => {
      fn.apply(this, arguments);
      timerId = null;
    }, timeout);
  }
}

// 深拷贝（对象和数组）
function deepClone(source, map = new WeakMap()) {
  if(typeof source !== "object" || source == null) {
    throw new Error();
  }
  if(map.has(source)) return map.get(source);
  const res = new source.constructor();
  map.set(source, ans);

  Reflect.ownKeys(source).forEach((key) => {
    if(typeof source[key] === "object" && source[key] !== null) {
      res[key] = deepClone(source[key], map);
    } else {
      res[key] = source[key];
      // Object.defineProperty(res, key, Object.getOwnPropertyDescriptors(source, key));
    }
  });
  return res;
}

// 模拟instanceof
function myInstanceof(left, right) { // right是构造函数！！！不是对象。所以要先获取right的原型
  let proto = Object.getPrototypeOf(left);
  const rProto = Object.getPrototypeOf(right);

  while(proto) {
    if(proto === rProto) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// call，apply，bind
Function.prototype.call = function(thisArg = window, ...args) {
  
  let fn = Symbol("fn");
  thisArg[fn] = this;

  let res = thisArg[fn](...args);
  delete thisArg[fn];
  return res;
}

Function.prototype.bind = function(thisArg, ...args) {
  const self = this;
  return function fn() {
    if(this instanceof fn) return new self(...args, ...arguments);
    return self.apply(thisArg, [...args, ...arguments]);
  }
}