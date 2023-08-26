// function test2() {
//   return Promise.resolve(1);
// }
// test2().then(res => {
//   console.log(res); // 1
// })

// function test() {
//   Promise.resolve(1);
// }
// test().then(res => {
//   console.log(res);
// })
// Uncaught TypeError TypeError: Cannot read properties of undefined (reading 'then')


Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(1);
  }, 0);
}).then((res) => {
  setTimeout(() => {
    console.log(res); // undefined
  }, 0);
});