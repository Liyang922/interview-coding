/* 
    Object.assign(target, ...sources)
        自身，可枚举（字符串+symbol）
        浅拷贝（只复制属性值）
*/

Object.defineProperty(Object, "assign", {
    value: function(target, ...sources) {
        if(target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        const to = Object(target);
        for(let source of sources) {
            if(source !== null) {
                // 双重判断确保只拿到可枚举的自身属性
                for(let key in source) { // 但是for in只能获得字符串类型的属性啊
                    if(Object.prototype.hasOwnProperty.call(source, key)) {
                        to[key] = source[key];
                    }
                }
            }
            
            // 字符串+symbol 
            if(source !== null) {
                const allKeys = Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source));
                for(let key of allKeys) { 
                    if(Object.prototype.hasOwnProperty.call(source, key)) {
                        to[key] = source[key];
                    }
                }
            }
        }
        return to;
    },
    enumerable: false,
    writable: true,
    configurable: true,
})