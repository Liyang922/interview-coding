// 1. 创建一个空对象
// 2. 将对象的原型（__proto__）指定为构造函数的原型对象（prototype）
// 3. 执行构造函数，如果构造函数返回一个对象，则返回该对象。否则返回this。

/* 
创建一个空的简单 JavaScript 对象（即 {}）；
为步骤 1 新创建的对象添加属性 __proto__，将该属性链接至构造函数的原型对象；
将步骤 1 新创建的对象作为 this 的上下文；
如果该函数没有返回对象，则返回 this。
*/

function newOperator(constructor, ...args) {
    if(typeof constructor !== "function") {
        throw new TypeError("constructor is not a function");
    }

    // 以constructor.prototype作为原型对象创建新对象
    let obj = Object.create(constructor.prototype);
    // 也可以这样(不推荐使用obj.__proto__读取原型)
    // let obj = new Object();
    // obj.__proto__ = constructor.prototype;

    // Object.setPrototypeOf(obj, constructor.prototype);

    const res = constructor.apply(obj, args);

    // 判断res是否为引用数据类型
    const isObj = typeof res === "object" && res !== null; // typeof null >> object
    const isFunction = typeof res === "function"
    return isObj || isFunction ? res : obj;
    
    // 使用instanceof判断即可
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

