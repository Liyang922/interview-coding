// 1. 创建一个空对象
// 2. 将对象的原型（__proto__）指定为构造函数的原型对象（prototype）
// 3. 执行构造函数，如果构造函数返回一个对象，则返回该对象。否则返回this。

function newOperator(constructor, ...args) {
    if(typeof constructor !== "function") {
        throw new TypeError("constructor is not a function");
    }

    let obj = Object.create(constructor.prototype);
    // let obj = new Object();
    // Object.setPrototypeOf(obj, constructor.prototype);

    const res = constructor.apply(obj, args);

    const isObj = typeof res === "object" && res !== null;
    const isFunction = typeof res === "function"
    return isObj || isFunction ? res : obj;
    
    // return res instanceof Object ? res : obj;
}

function f() {
    this.name = "li";
    return () => {};
}
console.log(new f()); //() => {}
console.log(typeof new f()); //function
console.log({} === null); // false
console.log(typeof null); // object

