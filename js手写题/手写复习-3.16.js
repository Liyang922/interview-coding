/**
 * jsonp函数
 * 1. 传入url，params，和callback，返回一个promise
 * 2. promise resolve收到的结果（动态脚本）
 */
function jsonp(url, params, callbackName) {
  const generateUrl = () => {
    let res = '';
    Object.keys(params).forEach(key => {
      res += `${key}=${params[key]}`;
    });
    res += `${callback}=${callbackName}`
    return `${url}${res}`;
  }

  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = generateUrl();
    document.body.append(script);
    window[callbackName] = (data) => {
      resolve(data);
      script.remove();
    }
  })
}

// promise
// 考虑和不考虑链式调用，then方法和catch方法有很大区别
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if(this.state == PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    }

    const reject = (reason) => {
      if(this.state == PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
      }
    }

    try{
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  // 不考虑链式调用
  // then(onFulfilled, onRejected) {
  //   onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v;
  //   onRejected = typeof onRejected == 'function' ? onRejected : r => {throw new Error(r)};

  //   if(this.state == PENDING) {
  //     this.onFulfilledCallbacks.push(onFulfilled);
  //     this.onRejectedCallbacks.push(onRejected);
  //   }
  //   if(this.state == FULFILLED) {
  //     onFulfilled(this.value);
  //   }
  //   if(this.state == REJECTED) {
  //     onRejected(this.reason);
  //   }
  // }

  // 考虑链式调用
  then(onFulfilled, onRejected) {
    if(typeof onFulfilled !== 'function') {
      onFulfilled = v => v;
    }
    if(typeof onRejected !== 'function') {
      onRejected = r => {throw new Error(r instanceof Error ? r.message : r)};
    }

    const self = this;
    return new Promise((resolve, reject) => {
      if(self.state == PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
             const result = onFulfilled(self.value); 
            });
            result instanceof Promise ? result.then(resolve, reject) : resolve(result);
          } catch(err) {
            reject(err);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
             const result = onRejected(self.value); 
            });
            result instanceof Promise ? result.then(resolve, reject) : reject(result);
          } catch(err) {
            reject(err);
          }
        });
      }
      if(self.state == FULFILLED) {
        try {
          setTimeout(() => {
           const result = onFulfilled(self.value); 
          });
          result instanceof Promise ? result.then(resolve, reject) : resolve(result);
        } catch(err) {
          reject(err);
        }
      }
      if(self.state == REJECTED) {
        try {
          setTimeout(() => {
           const result = onRejected(self.value); 
          });
          result instanceof Promise ? result.then(resolve, reject) : reject(result);
        } catch(err) {
          reject(err);
        }
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if(value instanceof Promise) {
      return value;
    } else {
      return new Promise(resolve => resolve(value));
    }
  }

  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static all(allPromises) {
    const len = allPromises.length;
    let count = 0;
    let resArr = new Array(len).fill(0);
    
    return new Promise((resolve, reject) => {
      for(let i = 0; i < len; i++) {
        Promise.resolve(allPromises[i]).then(
          value => {
            resArr[i] = value;
            count++;
            if(count === len) resolve(resArr);
          },
          reason => reject(reason)
        )
      }
    })
  }

  
}

// promise调度器
class Scheduler {
  constructor() {
    this.queue = []; // 先进先出
    this.maxCount = 2;
    this.runCount = 0;
  }

  add(task) {
    this.queue.push(task);
  }

  request() {
    if(!this.queue || !this.queue.length || this.runCount >= this.maxCount) {
      return;
    }
    this.runCount++;
    this.queue.shift()().then(() => {
      this.runCount--;
      this.request();
    })
  }

  taskStart() {
    for(let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
}

// 图片懒加载
// 图片窗口坐标 < 窗口可视区域高度
function lazyLoad() {
  let img = document.querySelectorAll("img");
  
  let windowHeight = document.documentElement.clientHeight;
  img.forEach(img => {
    if(img.getBoundingClientRect().y < windowHeight) {
      img.src = img.dataset.src;
    }
  })
}
window.addEventListener("scroll", lazyLoad); // 节流



