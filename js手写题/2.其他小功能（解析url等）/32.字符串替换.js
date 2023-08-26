var a = {
	b: 123,
	c: '456',
	e: '789',
}
var str=`a{a.b}aa{a.c}aa {a.d}aaaa`;
// => 'a123aa456aa {a.d}aaaa'
console.log(fn1(str, a));

function fn1(str, obj) {
    let res = '';
    let flag = false;
    let start;
    
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if(char === "{") {
            flag = true;
            start = i + 1;
            continue;
        }
        if(char === "}") {
            flag = false;
            res += match(str.slice(start, i), obj);
            continue;
        }
        if(flag === false) {
            res += str[i];
        }
    }
    return res;
}

function match(str, obj) {
    let keys = str.split(".").slice(1);
    let len = keys.length;
    let tmpObj = obj;

    for (let i = 0; i < len; i++) {
        let key = keys[i];
        if(!(key in tmpObj)) {
            return `{${str}}`;
        } else {
            tmpObj = tmpObj[key];
        }
    }
    return tmpObj;
}