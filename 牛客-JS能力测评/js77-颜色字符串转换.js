function rgb2hex(sRGB) {
    let regexp = /\d{1,3}(?=,|\))/g;
    let result = sRGB.match(regexp);

    if(!result) return sRGB;

    let returnValue = "#";

    for(let item of result) {
        if(+item < 256 && +item > 0) {
            returnValue += (+item).toString(16);
            // 并不是只有0时才需要加一个“0”
        } else if(+item == 0){
            returnValue += '00';
        } else {
            return sRGB;
        }
    }
    
    return returnValue;
}

console.log(rgb2hex('rgb(128,0,128)'));
console.log(rgb2hex('rgb(128,0,257)'));
console.log(rgb2hex('abcdefg'));

function rgb2hex2(sRGB) {
    try{
        // eval:将传入的参数作为js代码执行
        return eval(sRGB);
    } catch(err) {
        return sRGB;
    }
}
// r,g,b的值超过255的情况？
function rgb(r,g,b){
    let rH=r.toString(16)
    let gH=g.toString(16)
    let bH=b.toString(16)
    rH=rH.length==1?'0'+rH:rH
    gH=gH.length==1?'0'+gH:gH
    bH=bH.length==1?'0'+bH:bH
    return "#"+rH+gH+bH
}