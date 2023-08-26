function valueAtBit(num, bit) {
    let number = +(num.match(/\d/g).join(""));
    return number.toString(2)[bit-1];
}
// console.log(valueAtBit("128, 8",1));

function valueAtBit(num, bit) {
    //let number = +(num.match(/\d/g).join(""));
    let str = num.toString(2);
    return str[str.length - bit];
    
    // this指向global
    // 在没有对象的情况下调用this，严格模式下this的值为undefined
    // 非严格模式下，是global
    return num.toString(2).charAt(this.length - bit);
}
console.log(valueAtBit(128, 8));

// let str = "hello";
// str += "0";
// console.log(str);

function convertToBinary(num) {
    let str = num.toString(2);
    let diff = 8 - str.length;
    while(diff > 0) {
        str = "0" + str;
        diff--;
    }
    return str;
}
// console.log(convertToBinary(65));