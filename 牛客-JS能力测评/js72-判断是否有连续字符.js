function containsRepeatingLetter(str) {
    return str.split("").some((elem, index, arr) => 
        elem == arr[index + 1] && index != arr.lastIndexOf(elem) && ifLetter(elem)
    );
}

// 可以用正则代替
// 
function ifLetter(str) {
    let code = str.charCodeAt(0);
    return (code > 64 && code < 91) || (code > 96 && code < 123);
}
console.log(containsRepeatingLetter("bookkeeping"));
// console.log("a".charCodeAt(0));
// console.log("z".charCodeAt(0));
// console.log("A".charCodeAt(0));
// console.log("Z".charCodeAt(0));
// console.log(ifLetter("o"));