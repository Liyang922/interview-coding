// 数组方法

const { func } = require("prop-types");

// filter forEach map
Array.prototype.filter = function(fn) {
  let self = this;
  let res = [];
  for(let i = 0; i < self.length; i++) {
    if(i in self) { // 排除空值
      if(fn(self[i], i, self)) res.push(self[i]);
    }
  }
  return res;
}

// reduce
Array.prototype.reduce = function(fn, init) {
  let self = this;
  // let res = init == undefined ? self[0] : init;
  // let start = init == undefined ? 1 : 0; 
  let k = 0;
  if(init == undefined) {
    while(!(k in self) && k < self.length) { // 不是判断self[k]是不是undefined，而是判断k in self
      k++;
    }
    if(k == self.length - 1) {
      throw new Error("数组为空");
    }
  }
  let accumulator = self[k];
  

  for(let i = k; i < self.length; i++) {
    if(i in self) {
      res = fn(accumulator, self[i], i, self);
    }
  }
  return accumulator;
}

// 函数apply
Function.prototype.apply = function(thisArg = window, ...args) {
  let fn = new Symbol("fn");
  thisArg[fn] = this;

  let res = thisArg[fn](args);
  delete thisArg[fn];
  return res;
}

// 函数bind
Function.prototype.bind = function(thisArg = window, ...args) {
  const self = this;
  return function fn() {
    if(this instanceof fn) {
      // let obj = {};
      // let res = self.call(obj, ...args, ...arguments);
      // return typeof res == 'object' ? res : obj;
      return new self(...args, ...arguments);
    } else {
      return self.call(thisArg, ...args, ...arguments);
    }
  }
}

// 防抖
function debounce(fn, timeout) {
  let timerId;
  return function() {
    if(timerId) {
      clearTimeout(timerId);
      timerId = null;
    } else {
      timerId = setTimeout(() => {
        fn.apply(this, arguments);
        timerId = null;
      }, timeout)
    }
  }
}

function throttle(fn, timeout) {
  let flag = false;
  return function() {
    if(flag) {
      return;
    }
    flag = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = false;
    }, timeout)
  }
}

// 函数curry和compose
function curried(fn) {
  let len = fn.length;
  let args = [];
  return function f() {
    args.push(...arguments);
    if(args.length >= len) {
      return fn(...args);
    } else {
      return (...args) => f(...args); // 返回一个新函数
    }
  }
}

// 不用闭包的写法
function curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...args2) => curried.apply(this, args.concat(args2));
    }
  }
}

// 实现new
function newOperator(contructor, ...args) {
  let obj = Object.create(contructor.prototype);
  let res = contructor.apply(obj, args);
  return res instanceof Object ? res : obj;
}

// instanceof
function myInstanceof(obj, fn) {
  let proto = fn.prototype;
  let objProto = Object.getPrototypeOf(obj);
  while(objProto) {
    if(objProto == proto) return true;
    objProto = Object.getPrototypeOf(objProto);
  }
  return false;
}

// 寄生组合继承
// 子类代用复用构造函数
// 子类的原型对象为一个新对象，该对象的原型为父类构造函数的原型对象
// 子类原型对象的constructor属性设为子类的构造函数



