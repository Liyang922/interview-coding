// function.bind(thisArg[, arg1[, arg2[, ...]]])
Function.prototype.bind = function(thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    
    // 保存旧函数
    const self = this;
    
    return function F() {
        // 如果通过new调用——new F()
        if(this instanceof F) { //this指向new出的实例
            return new self(...args, ...arguments); //args为原函数的参数，arguments为F()的参数
        }
        // new.target也可以用来检查一个函数是否被new调用
        return self.apply(thisArg, [...args, ...arguments]);
    }
}

function f() {

}
let f2 = f.bind(this);
// 新函数通过new调用，函数内部的this会指向实例，而不是当时bind时传入的this
// 因此相当于bind无效，等于new f()
let a = new f2();