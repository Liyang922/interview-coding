// 考虑对象和数组
// 通过WeakMap解决循环引用问题
function deepClone(target, hash = new WeakMap()) {
    if(typeof target !== "object") {
        throw new TypeError();
    }

    if(hash.has(target)) return hash.get(target);

    let res = target instanceof Array ? [] : {}; //Array.isArray()
    // const res = new source.constructor(); // 妙啊
    hash.set(target, res);

    let allKeys = Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    // Reflect.ownKeys(source); // 妙啊
    for(let key of allKeys) {
        if(typeof target[key] === "object" && target[key] !== null) {
            res[key] = deepClone(target[key], hash);
        } else {
            res[key] = target[key];
            // 如果需要保留属性描述符
            // Object.defineProperty(res, key, Object.getOwnPropertyDescriptor(target, key));
        }
    }
    return res;
}

let a = {
    b: 1,
    c: {
        d: 3,
        f: 4
    }
}
// 循环引用
a.xunhuan = a;
let clone = deepClone(a);
console.log(clone)


// 也可以借助JSON实现深拷贝
JSON.parse(JSON.stringify()) //适用于Object和Array