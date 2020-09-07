function Father(firstname){
    this.firstname = firstname;
    this.gender = "male";
}
Father.prototype.sayName = function(){
    console.log("My name is "+this.firstname+" "+this.lastname);
}
//继承1
function Children1(firstname,lastname,age,gender,order){
    Father.call(this,firstname);
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.order = order;
}
Children1.prototype = new Father();
Children1.prototype.constructor = Children1;
Children1.prototype.sayOrder = function(){
    console.log("My name is "+this.firstname+" "+this.lastname+",I'm the "+this.order+" child of my father");
}
//继承2
function Children2(firstname,lastname,age,gender,order){
    Father.call(this,firstname);
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.order = order;
}
Children2.prototype = Object.create(Father.prototype);
Children2.prototype.constructor = Children2;
Children2.prototype.sayOrder = function(){
    console.log("My name is "+this.firstname+" "+this.lastname+",I'm the "+this.order+" child of my father");
}
//继承3
function Children3(firstname,lastname,age,gender,order){
    Father.call(this,firstname);
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.order = order;
}
function fn(){};
fn.prototype = Father.prototype;
Children3.prototype = new fn();
Children3.prototype.constructor = Children3;
Children3.prototype.sayOrder = function(){
    console.log("My name is "+this.firstname+" "+this.lastname+",I'm the "+this.order+" child of my father");
}
//继承4
function Children4(firstname,lastname,age,gender,order){
    Father.call(this,firstname);
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.order = order;
}
Children4.prototype.__proto__ = Father.prototype;
//Children4.prototype.constructor = Children4;
Children4.prototype.sayOrder = function(){
    console.log("My name is "+this.firstname+" "+this.lastname+",I'm the "+this.order+" child of my father");
}

var child_1 = new Children1("Zhang","san",15,"male","first");
var child_2 = new Children2("Li","si",12,"female","secend");
var child_3 = new Children3("Wang","wu",20,"male","third");
var child_4 = new Children4("Song","liu",8,"female","fourth");

console.dir(child_1);
console.dir(child_2);
console.dir(child_3);
console.dir(child_4);
debugger;

/*
区别1 
Children1.prototype = new Father(); 即 Children1 的原型是 Father 的实例化对象（ child_1.__proto__ 指向 Father 的实例化对象，会带有 Father 的私有属性），
而其他三种 Children 的原型是 Father.prototype 的实例化，不会带有 Father 的私有属性。
区别2
由于 Children4 是直接修改的隐式原型 Children4.prototype.__proto__ = Father.prototype ，不会重置 Children4.prototype 因此不必重新设置 Children4.prototype.constructor = Children4;
*/