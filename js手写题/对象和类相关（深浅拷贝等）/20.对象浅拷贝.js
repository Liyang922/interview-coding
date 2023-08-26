let user = {
  name: "li",
}

// assign
// 可枚举、自身属性
// Object.getOwnPropertyDescriptor() Object.defineProperty()
let clone = Object.assign({}, user);

// 展开运算符
let clone2 = {...user};