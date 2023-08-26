// 检查构造函数的prototype是否出现在实例对象的原型链上
// 检查对象的原型链上是否有类型（构造函数）的prototype
function myInstanceof(left, right) {
    if(typeof left !== "object" || left === null) {
        return false;
    }
    let proto = Object.getPrototypeOf(left);
    while(true) {
        if(proto === null) return false;
        if(proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}