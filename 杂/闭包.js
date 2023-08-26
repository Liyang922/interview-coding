function staleClosure() {
  let a = '1';
  setTimeout(() => {
     a = '2';
     console.log(a);
  }, 1000);

  const message = `a: ${a}`;
  function b() {
    setTimeout(() => {
      console.log(message); // a: 1
      console.log(a); // 2
    }, 1500);
  }
  b();
}
staleClosure();