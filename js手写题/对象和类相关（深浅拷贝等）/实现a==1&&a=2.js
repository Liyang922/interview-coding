// 非全等
class A {
  constructor(value) {
    this.value = value;
  }
  valueOf() {
    return this.value++;
  }
}

const a = new A(1);
console.log(a);
if (a == 1 && a == 2 && a == 3) {
  console.log("Hi Eno!");
}


// 全等
Object.defineProperties(window, {
  _a: {
    value: 0,
    writable: true
  },
  a: {
    get: function() {
      return  ++_a
    }
  }
})