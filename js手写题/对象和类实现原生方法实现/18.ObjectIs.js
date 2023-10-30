/* 
Object.is(value1, value2);
    判断两个值是否为一个值
    
    Object.is()：
        +0，-0不相等
        Number.NaN 与 NaN 相等
    ===
        +0 === -0  // true
        NaN === NaN // false
*/

function is(x, y) {
    if(x === y) { // -0 === +0 不对，修正
        return x!==0 || y!== 0 || 1/x === 1/y;
    } else { //NaN !== NaN 不对，修正
        return x !== x && y !== y;
    }
}

console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(NaN === NaN); // false
console.log(1/(-0) === 1/(+0)); // false
console.log(1/(-0)); // -Infinity
