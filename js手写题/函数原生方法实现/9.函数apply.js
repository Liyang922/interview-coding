// apply(thisArg, argsArray)
Function.prototype.apply = function(thisArg = window, ...args) { //thisArg默认值
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    
    let fn = Symbol("fn"); //用symbol防止与context的其他属性名重复
    thisArg[fn] = this;

    return thisArg[fn](args);
}