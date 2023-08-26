function iterate(obj) {
    return Object.keys(obj).map(item => item + ": " + obj[item]);
}
var C = function() {this.foo = 'bar'; this.baz = 'bim';}; 
C.prototype.bop = 'bip'; 
console.log(iterate(new C()));