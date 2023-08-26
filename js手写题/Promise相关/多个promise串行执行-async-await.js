async function parallelPromise(tasks) {
  let arr = [];
  for(let task of tasks) { // 必须用for of，而不能是forEach或for in！！
    let tmp = await task;
    arr.push(tmp);
  }
  return arr;
}