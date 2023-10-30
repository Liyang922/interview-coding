// 找bug并修复

function getPrice(price) {
  return new Promise(resolve => {
    resolve(price);
  })
}

let total = 0;
async function addItem(price) {
  // 有bug写法
  return total += await getPrice(price);
  // 问题是出在+=，addItem(1)和addItem(2)都会执行到total +=
  // 然后才遇到await，也就是它们执行到await之前，total都是0

  // 修复后写法
  // let res = await getPrice(price);
  // return total += res;
}

console.log(total); // 0
addItem(1);
addItem(2);
setTimeout(() => {
  console.log(total); // 3
})