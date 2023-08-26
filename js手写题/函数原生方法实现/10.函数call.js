// function.call(thisArg, arg1, arg2, ...)
Function.prototype.call = function(thisArg = window, ...args) { //thisArg默认值
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    
    let fn = Symbol("fn"); //用symbol防止与context的其他属性名重复
    thisArg[fn] = this;

    return thisArg[fn](...args);
    // 删除thisArg[fn]
}