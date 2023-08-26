function cssStyle2DomStyle(sName) {
    let strs = sName.split("-");
    let result = "";
    for(let str of strs) {
        if(result == "") {
            result += str;
        } else {
            result += (str.slice(0,1).toUpperCase() + str.slice(1));
        }
    }
    return result;
}

// console.log(cssStyle2DomStyle('font-size'));
console.log(cssStyle2DomStyle('-webkit-border-image'));
