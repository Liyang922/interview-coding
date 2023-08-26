// 定义三个状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// Promise是个容器，里面存储三种状态
// 用户想执行某个操作——状态改变，存储结果和错误——状态改变之后触发某些操作
// 1. 执行用户传来的操作，并根据结果改变promise的status、value、reason——resolve，reject
// 2. 提供方法，根据status执行用户定义的后续行为——then、catch

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // 新增代码——支持异步调用
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 原型方法
  // then接收两个函数作为参数
  then(onFulfilled, onRejected) {
    // Promise支持值穿透（当then传入的参数不是函数时，该then无效，这个promise返回上一个promise的值）
    if (typeof onFulfilled !== "function") onFulfilled = (value) => value;
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw new Error(reason instanceof Error ? reason.message : reason);
      };
    }

    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(self.value);
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
        self.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(self.value);
              result instanceof Promise
                ? result.then(resolve, reject)
                : reject(result);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(self.value);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(self.value);
            result instanceof Promise
              ? result.then(resolve, reject)
              : reject(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch() {
    return this.then(null, onRejected);
  }

  // 静态方法
  // Promise.resolve(value)——用结果value创建一个resolved的promise
  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    } else {
      return new Promise((resolve) => resolve(value));
    }
  }
  // Promise.reject方法的参数会原封不动地作为reject的参数
  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason));
  }
  // Promise.resolve和Promise.reject都很少使用

  // parament：可迭代对象
  static all(promiseAll) {
    const len = promiseAll.length;
    const values = new Array(len);
    let count = 0;

    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        // Promise.resolve确保每一项都是promise
        Promise.resolve(promiseAll[i]).then(
          (res) => {
            values[i] = res;
            count++;
            if (count === len) resolve(values);
          },
          (reason) => reject(reason)
        );
      }
    });
  }

  static race(promiseAll) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseAll.length; i++) {
        Promise.resolve(promiseAll[i]).then(
          (res) => resolve(res),
          (reason) => reject(reason)
        );
      }
    });
  }

  static allSettled(promiseAll) {
    const len = promiseAll.length;
    const values = new Array(len);
    // 记录settled的promise的个数
    let count = 0;

    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseAll[i]).then(
          (res) => {
            values[i] = { status: "fulfilled", value: res };
            count++;
            if (count === len) resolve(values);
          },
          (reason) => {
            values[i] = { status: "rejected", reason: reason };
            count++;
            if (count === len) resolve(values);
          }
        );
      }
    });
  }

  static any(promiseAll) {
    const len = promiseAll.length;
    const errors = new Array(len);
    // 记录rejected的promise的个数
    let count = 0;

    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseAll[i]).then(
          (res) => {
            resolve(res);
          },
          (reason) => {
            errors[i] = reason;
            count++;
            if (count === len) reject(new AggregateError(errors));
          }
        );
      }
    });
  }
}

// 1.基础
const promise = new Promise((resolve, reject) => {
  Math.random() < 0.5 ? resolve(1) : reject(-1);
}).then(
  (value) => console.log(value),
  (err) => console.log(err)
);

// 2.异步
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
}).then((res) => console.log(res));

// 3.链式调用
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((res) => res * 2)
  .then((res) => res * 2);
