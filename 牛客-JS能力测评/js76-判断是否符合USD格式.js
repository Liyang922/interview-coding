function isUSD(str) {
    let regexp = /^\$\d{1,3}(,\d{3})*$/;
    let regexpDot = /^\$\d{1,3}(,\d{3})*\.\d{2}$/;
    return regexp.test(str) || regexpDot.test(str);
}

console.log(isUSD('$20,933,209.93'));
console.log(isUSD('$20,933,209.2'));
console.log(isUSD('$20,933,209'));
console.log(isUSD('$3,432,12.12'));

console.log(isUSD('$,344.34'));
