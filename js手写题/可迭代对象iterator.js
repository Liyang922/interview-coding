let range = {
  from: 1,
  to: 5,
}
range[Symbol.iterator] = function() {
  return {
    current: this.from,
    last: this.to,
    next() {
      if(this.current <= this.last) {
        return {done: false, value: this.current++};
      } else {
        return {done: true};
      }
    }
  }
}

// 使用generator进行迭代
range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
}

// 测试
for(let a of range) {
  console.log(a);
}

// 异步迭代
range[Symbol.asyncIterator] = function() {
  return {
    current: this.from,
    last: this.to,

    async next() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if(this.current <= this.last) {
        return {done: false, value: this.current++};
      } else {
        return {done: true};
      }
    }
  }
}

// 用异步generator写异步迭代
// async *[Symbol.asyncIterator]() {
//   for(let value = this.from; value <= this.to; value++) {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     yield value;
//   }
// }

// 异步for of
(async () => {
  for await (let value of range) {
    console.log(value);
  }
})()