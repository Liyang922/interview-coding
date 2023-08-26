const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise (promiseArr) {
  let data = new Array(promiseArr.length).fill(0);
  return new Promise(async (resolve) => {
    promiseArr.forEach(async (promise, index) => {
      let res = await promise();
      // 因为await之后的都相当于微任务，所以1秒后，index==2，就resolve了
      // 关键是forEach没有等待await，第一个promise还没有settled，就开始下一个promise了！
      data[index] = res;
      if(index == promiseArr.length - 1) resolve(data); // 2,3,done,[0,2,3],1 因为ajax后有then
    });
  })
}

function mergePromise (promiseArr) {
  let len = promiseArr.length;
  let data = [];

  return new Promise(async (resolve) => {
    for(let promise of promiseArr) { // 用for of ok！！
      let res = await promise();
      data.push(res);
      if(data.length == len) resolve(data);
    }
  })
}


function mergePromise (ajaxArray) {
  const data = [];
  let promise = Promise.resolve();
  ajaxArray.forEach(ajax => {
    // 将添加了.then的promise再赋值给promise，达到链式调用的效果
    // 因此会顺序执行几个ajax
    promise = promise.then(ajax).then(res => {
      data.push(res);
      // return data是为了最后return promise的结果是data
      return data;
    });
  });
  return promise;
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

