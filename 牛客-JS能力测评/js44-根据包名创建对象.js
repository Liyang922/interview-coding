// 对象的深浅拷贝
function namespace(oNamespace, sPackage) {
    // tmpWrap：引用复制
    let tmpWrap = oNamespace;
    sPackage.split(".").forEach(item => {
        // 第一次执行：tmpWrap[item]指向oNameSpace[item]，因此更改了原对象
            // 第二个赋值符号，使得tmpWrap存储的是对oNameSpace[item]的引用，从而可以更改oNameSpace[item]的子项

        tmpWrap = tmpWrap[item] = Object.assign({}, tmpWrap[item]);
        
        // 推荐用spread语法代替assign
        // tmpWrap = tmpWrap[item] = {...tmpWrap[item]};
    });
    return oNamespace;
}
let a = {};
console.log(namespace(a, 'a.b.c.d.e.f.g')); 

// Object.assign() 浅拷贝
// 如果对象的属性是一个对象，那么只用assign是不行的，可以通过循环检查对象的属性是否是一个对象
// 用递归实现深拷贝