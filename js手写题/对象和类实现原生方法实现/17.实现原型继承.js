// 以下知识点来自红宝书

/* 
    原型继承
        指定原型为某个类型的实例对象，从而继承该类型的属性和方法 
*/
function Animal() {
    this.colors = ["green", "white"];
}
function Bird () {}
Bird.prototype = new Animal();

let bird1 = new Bird();
bird1.colors.push("red");
let bird2 = new Bird();
console.log(bird2.colors); // ['green', 'white', 'red']

/* 
    问题：
        1.原型中包含引用值时，引用值在所有实例对象中共享。
        2.子类型在实例化时不能给父类型的构造函数传参。
        （不懂）
    因此，原型链基本不会单独使用。
*/

/* 
    盗用构造函数：
        在子类构造函数中调用父类构造函数
*/
function Animal2() {
    this.colors = ["green", "white"];
}
function Bird2 () {
    Animal2.call(this);
}

let bird21 = new Bird();
bird21.colors.push("red");
let bird22 = new Bird();
console.log(bird22.colors); // ['green', 'white']
/* 
    解决了原型继承的两个问题。
    问题：
        1.必须在构造函数内定义方法，函数不能重用。（？？）
        2.子类不能访问父类原型上的方法。
*/

/* 
    组合继承：
        结合原型链和盗用构造函数。
        原型链继承原型上的属性和方法，构造函数继承实例属性。
*/
function Animal3() {
    this.colors = ["green", "white"];
}
function Bird3 () {
    Animal3.call(this);
}
Bird3.prototype = new Animal3();
Bird3.prototype.contructor = Bird3;

/* 
    原型式继承：
        不自定义类型实现继承。
        Object.create()就是原型式继承。
*/
function object(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}// 实际上是创建了传入对象obj的浅拷贝
/* 
    适用于不单独创建构造函数，但需要在对象间共享信息的场景。
    属性中的引用值始终是共享的，与原型继承一致。
*/

/* 
    寄生式继承：
       “复制”基准对象，对复制品进行修改，然后返回。
       适用于不关注类型和构造函数的场景。
       导致函数难以复用。 
*/
function createAnother(obj) {
    let clone = object(obj);
    clone.sayHi = function() {

    }
    return clone;
}

/* 
    寄生组合式继承：
        最完备的继承方式。
*/
function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype); // 创建父类型原型对象的副本
    prototype.contructor = subType; // 解决重设原型导致的构造函数丢失
    subType.prototype = prototype; // 设置子类型原型

    // 另一种写法
    subType.prototype = Object.create(superType.prototype);
    subType.prototype.contructor = subType;
}
// 完整的写法
function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
}
function Child5() {
    Parent5.call(this);
    this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;
