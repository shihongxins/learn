# 理解原型与原型链

## 说明

+ 引用类型皆对象，对象是属性的集合。
+ JavaScript中所有对象都是 `Object` 方法(类)的实例，则都会继承 `Object.prototype` 的对象的属性。
  ```js
    typeof Object;//"function"
    console.dir(Object.prototype)
    /*
    Object
      constructor: ƒ Object()
      hasOwnProperty: ƒ hasOwnProperty()
      isPrototypeOf: ƒ isPrototypeOf()
      propertyIsEnumerable: ƒ propertyIsEnumerable()
      toLocaleString: ƒ toLocaleString()
      toString: ƒ toString()
      valueOf: ƒ valueOf()
      __defineGetter__: ƒ __defineGetter__()
      __defineSetter__: ƒ __defineSetter__()
      __lookupGetter__: ƒ __lookupGetter__()
      __lookupSetter__: ƒ __lookupSetter__()
      get __proto__: ƒ __proto__()
      set __proto__: ƒ __proto__()
    */
  ```
+ JavaScript中每个对象都拥有 `__proto__` 属性；
+ 函数在JavaScript中也是一种对象，那么他也有 `__proto__` 属性，而且他还有独有的 `prototype` 属性。
  ```js
    function Fun(){}
    console.log(Fun instanceof Object);//true
    console.dir(Fun);
    /*
    ƒ Fun()
      arguments: null
      caller: null
      length: 0
      name: "Fun"
      prototype: {constructor: ƒ}
      __proto__: ƒ ()
      [[FunctionLocation]]: VM403:2
      [[Scopes]]: Scopes[2]
    */
  ```
+ 所有对象都是由函数创建的。即使是 **字面量模式** ，也只是函数的一种语法糖。
  ```js
    var obj = {a:1,b:2};
    //实际上是等同于
    var obj = new Object();
    obj.a = 1;
    obj.b = 2;

    var arr = [1,2];
    //实际上是等同于
    var arr = new Array();
    arr[0] = 1;
    arr[1] = 2;
  ```
> 看到这里是不是有些疑惑：引用类型皆对象，且函数也是一种对象，但对象却又是由函数创建的。

## 原型 `prototype` 与构造函数 `constructor`

首先，我们知道函数是一个对象，而且他还有一个独有的属性 `prototype` 。那么这独有的属性 `prototype` 是什么呢？打印看看
```js
  function Fun(){}
  console.dir(Fun.prototype);
  /*
  Object
      constructor: ƒ Fun()
      __proto__: Object
  */
```
可以看出 `Fun.prototype` 属性在函数声明后就自动创建了， `Fun.prototype` 属性的值指向一个 **对象**，这个对象就是 **原型** 。
而且原型有一个属性 `constructor` ，而这个 `constructor` 属性的值指向函数 `Fun` 本身（原因后面说）。

前面已经知道，当按工厂模式声明一个类，并用这个类实例化一个对象的时候，运算符 `new` 会创建一个空对象，然后调用函数，将空对象复制给函数内部的 `this` ，接着执行 `this` 对象的属性声明和赋值语句，最后自动返回 `this` 并复制给实例化对象，那我们打印看看：
```js
  var that;
  function Human(name,age,gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    that = this;
    console.log(this);
    /*
    Human {name: "小明", age: 5, gender: "男"}
      age: 5
      gender: "男"
      name: "小明"
      __proto__: Object
    */
    console.log(Human.prototype);
    /*
    {Kindom: "动物界", eat: ƒ, constructor: ƒ}
      Kindom: "动物界"
      eat: ƒ (food)
      constructor: ƒ Human(name,age)
      __proto__: Object
    */
  }
  Human.prototype.Kindom = "动物界";
  Human.prototype.eat = function(food){
    console.log(this.name+"在吃"+food);
  }
  var xiaoming = new Human("小明",5,"男");
  console.log(that===xiaoming);
  //true
  console.log(xiaoming);
  /*
  Human {name: "小明", age: 5, gender: "男"}
    age: 5
    gender: "男"
    name: "小明"
    __proto__: Object
  */
  var xiaofang = new Human("小芳",7,"女");
  console.log(xiaofang);
  /*
  Human {name: "小芳", age: 7, gender: "女"}
    age: 7
    gender: "女"
    name: "小芳"
    __proto__: Object
  */
```
从这一段代码中，可以看出实例化一个对象后的确是运算符 `new` 将创建的空对象，调用函数，将空对象赋值给函数的 `this` ，然后接收参数，接着执行 `this` 对象的属性声明和赋值语句。
> 而调用 `Human()` 函数进行属性声明和复制这一段函数便是类似其他语言中的 **构造函数** ，而由于 `Human.prototype.constructor` 指向 `Human` 本身，因此 `constructor` 也可以认为是构造函数 。而调用构造函数时由于接收的参数不同，最后实例化的对象结果也不同，由此可以认为构造函数所声明的属性是私有属性（可以理解为其他语言的 **private**）。

> `constructor` 是一个公有且不可枚举的属性。一旦我们改变了函数的 `prototype` ，那么新对象就没有这个属性了，在类的继承时尤其注意（当然可以通过原型链取到其他的 `constructor` ）。

## 原型 `prototype` 与原型链 `__proto__`

搞清楚了 **构造函数 constructor** 、 **构造函数中的 this** 和 **实例化的对象** 之后。我们想知道 `xiaoming` 和 `xiaofang` 是属于什么界的，然后让他们吃东西试试。
```js
  console.log(xiaoming.Kindom);
  //动物界
  xiaoming.eat("面条");
  //小明在吃面条
  console.log(xiaofang.Kindom);
  //动物界
  xiaofang.eat("包子");
  //小芳在吃包子
```
发现都能成功执行，且打印出了相应的信息。再结合前面打印的 `xiaoming` 和 `xiaofang` 的信息，并没有发现 `xiaoming` 和 `xiaofang` 的 `Kindom` 属性和 `eat(food)` 方法。那么这两属性是从哪来的？我们展开 `xiaoming` 的所有信息发现：
```js
  console.log(xiaoming);
  /*
  Human {name: "小明", age: 5, gender: "男"}
    age: 5
    gender: "男"
    name: "小明"
    __proto__:
      Kindom: "动物界"
      eat: ƒ (food)
      constructor: ƒ Human(name,age,gender)
      __proto__: Object
  */
```
在 `xiaoming.__proto__` 属性中出现了 `Kindom` 和 `eat(food)` 属性。但这两个属性不是在 `Human` 的 `prototype` 中声明的吗？那再展开 `Human` 的所有信息发现：
```js
  console.log(Human.prototype);
  /*
  {Kindom: "动物界", eat: ƒ, constructor: ƒ}
    Kindom: "动物界"
    eat: ƒ (food)
    constructor: ƒ Human(name,age,gender)
    __proto__: Object
  */
 console.log(xiaoming.__proto__===Human.prototype);
 //true
```
好啊！原来 `xiaoming.__proto__` 属性就是指向的 `Human.prototype` 。在调用 `xiaoming` 的 `Kindom` 和 `eat(food)` 属性时，由于 `xiaoming` 自身没有，会向 `__proto__` 中查找，因此在 `Human.prototype` 中找到，便成功执行返回了。
> 因为每个函数都有 `prototype` 属性，该属性是一个对象，即 **原型** ，并且通过该构造函数实例化出来的对象都能访问原型对象里面的属性（可理解为其他语言中的 **public** ），故原型 `prototype` 也叫 **显示原型** ；
而每一个对象都有一个 `__proto__` 属性，该属性指向创建此对象的 **构造方法** 的原型，故 `__proto__` 也叫做 **隐式原型** 。

然后我们再看看 `xiaoming.__proto__` 发现它里面还有 `__proto__` 展开看看：
```js
  console.log(xiaoming.__proto__.__proto__);
  /*
  {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__()
  */
```
是不是很熟悉，这不就是我们最开始说明处打印的 `Object.prototype` 吗？试试调用里面的方法。
```js
  xiaoming.toString();
  //"[object Object]"
  xiaoming.__proto__.__proto__.toString();
  //"[object Object]"
  Human.prototype.__proto__.toString();
  //"[object Object]"
  Object.prototype.toString();
  //"[object Object]"
  console.log(xiaoming.__proto__.__proto__.toString===xiaoming.toString);
  //true
  console.log(Object.prototype.toString===xiaoming.toString);
  //true
```
从最初的 `xiaoming` 访问 `Kindom` 属性和 `eat(food)` 方法，到这里访问 `toString()` 方法可以得出：
> 一个实例化对象在访问某属性时，会先在自身查找，找不到便会沿着隐式原型 `__proto__` 在向原型对象里查找，一直延续下去直到找到为止。那么沿隐式原型 `__proto__` 构成的查找链路，就叫 **原型链** 。

上面这句话有些漏洞，并不是一定会一直找下去，万一确实该属性不存在，应该是会停止报错。说明原型链有终点
```js
  xiaoming.sleep();
  /*
  Uncaught TypeError: xiaoming.sleep is not a function
    at <anonymous>:1:10
  */
```
由于前面调用 `toString` 方法时已经发现此方法来自 `Object.prototype` ，我们知道 `Object.prototype` 的值是原型对象，也是一个对象，那么它也应该有隐式原型 `__proto__` ，实际打印时我们却只看到了 `get __proto__` 方法和 `set __proto__` 方法。
```js
  console.log(Object.prototype.__proto__);
  //null
  Object.prototype.__proto__ = 1;
  console.log(Object.prototype.__proto__);
  //null
```
> 可以得出 `Object.prototype.__proto__` 指向空 `null` ，并且不能更改！且由此推断 `Object.prototype` 的原型对象是JavaScript引擎自创的！
又知道 `Object` 是一个构造函数，而函数又是对象，那么我们看看 `Object` 的隐式原型 `__proto__` 。
```js
  console.dir(Object.__proto__);
  /*
  ƒ anonymous()
    apply: ƒ apply()
    arguments: (...)
    bind: ƒ bind()
    call: ƒ call()
    caller: (...)
    constructor: ƒ Function()
    length: 0
    name: ""
    toString: ƒ toString()
    Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
    get arguments: ƒ ()
    set arguments: ƒ ()
    get caller: ƒ ()
    set caller: ƒ ()
    __proto__: Object
    [[FunctionLocation]]: <未知>
    [[Scopes]]: Scopes[0]
  */
  //看不出是什么，那 Human 也是构造函数也是对象，打印下看看
  console.dir(Human.__proto__);
  /*
  ƒ anonymous()
    apply: ƒ apply()
    arguments: (...)
    bind: ƒ bind()
    call: ƒ call()
    caller: (...)
    constructor: ƒ Function()
    length: 0
    name: ""
    toString: ƒ toString()
    Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
    get arguments: ƒ ()
    set arguments: ƒ ()
    get caller: ƒ ()
    set caller: ƒ ()
    __proto__: Object
    [[FunctionLocation]]: <未知>
    [[Scopes]]: Scopes[0]
  */
  console.log(Object.__proto__===Human.__proto__);
  //true
```
发现两者打印了同样的对象信息。但我们发现了有一个属性 `constructor` ，因为前面已经知道， `constructor` 指向构造函数本身：
```js
  console.dir(Object.__proto__.constructor);
  /*
  ƒ Function()
    arguments: (...)
    caller: (...)
    length: 1
    name: "Function"
    prototype: ƒ ()
    __proto__: ƒ ()
    [[Scopes]]: Scopes[0]
  */
  console.log(Object.__proto__===Function.prototype);
  //true
```
可以看出构造函数 `Object` 是由函数 `Function` 创建的。我们知道函数都有 `prototype` 属性，而函数也是一个对象，也有 `__proto__` 属性，那么对函数 `Function` 也是这样吗？
```js
  console.dir(Function.__proto__);
  /*
  ƒ anonymous()
    apply: ƒ apply()
    arguments: (...)
    bind: ƒ bind()
    call: ƒ call()
    caller: (...)
    constructor: ƒ Function()
    length: 0
    name: ""
    toString: ƒ toString()
    Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
    get arguments: ƒ ()
    set arguments: ƒ ()
    get caller: ƒ ()
    set caller: ƒ ()
    __proto__: Object
    [[FunctionLocation]]: <未知>
    [[Scopes]]: Scopes[0]
  */
```
可以看出和前面 `Object.__proto__` 、 `Human.__proto__` 的结果一样，测试一下
```js
  console.log(Function.__proto__===Object.__proto__);
  //true
  console.log(Function.__proto__===Human.__proto__);
  //true
```
而我们知道对象的 `__proto__` 指向构造函数的原型，而前面已经说过构造函数 `Object` 和 `Human` 都是由构造函数 `Function` 创建的，那么这里是不是说明构造函数 `Function` 是他自己创建的呢？
```js
  console.dir(Function.prototype);
  /*
  ƒ anonymous()
    apply: ƒ apply()
    arguments: (...)
    bind: ƒ bind()
    call: ƒ call()
    caller: (...)
    constructor: ƒ Function()
    length: 0
    name: ""
    toString: ƒ toString()
    Symbol(Symbol.hasInstance): ƒ [Symbol.hasInstance]()
    get arguments: ƒ ()
    set arguments: ƒ ()
    get caller: ƒ ()
    set caller: ƒ ()
    __proto__: Object
    [[FunctionLocation]]: <未知>
    [[Scopes]]: Scopes[0]
  */
  console.dir(Function.prototype.constructor);
  /*
  ƒ Function()
    arguments: (...)
    caller: (...)
    length: 1
    name: "Function"
    prototype: ƒ ()
    __proto__: ƒ ()
    [[Scopes]]: Scopes[0]
  */
  console.log(Function.__proto__===Function.prototype);
  //true
```
> 这里说明构造函数 `Function` 是由自身创建的。

又因为构造函数 `Function` 的原型 `Function.prototype` 是一个对象，那么它的构造函数是不是 `Object` 呢？
```js
  console.dir(Function.prototype.__proto__);
  /*
  Object
  constructor: ƒ Object()
  hasOwnProperty: ƒ hasOwnProperty()
  isPrototypeOf: ƒ isPrototypeOf()
  propertyIsEnumerable: ƒ propertyIsEnumerable()
  toLocaleString: ƒ toLocaleString()
  toString: ƒ toString()
  valueOf: ƒ valueOf()
  __defineGetter__: ƒ __defineGetter__()
  __defineSetter__: ƒ __defineSetter__()
  __lookupGetter__: ƒ __lookupGetter__()
  __lookupSetter__: ƒ __lookupSetter__()
  get __proto__: ƒ __proto__()
  set __proto__: ƒ __proto__()
  */
  console.log(Function.prototype.__proto__===Object.prototype);
  //true
```
果然如此，那么结合前面可以理出一条完整的原型链了：

`xiaoming.__proto__===Human.prototype` > `Human.prototype.__proto__===Object.prototype` > `Object.prototype.__proto__===null`

与 `Function` 的关系还是上图说明吧！

![x](https://camo.githubusercontent.com/8c32afe801835586c6ee59ef570fe2b322eadd6e/68747470733a2f2f79636b2d313235343236333432322e636f732e61702d7368616e676861692e6d7971636c6f75642e636f6d2f626c6f672f323031392d30362d30312d3033333932352e706e67)

## `instansceof` 原理
> `xiaoming instanceof Object` 沿着 `xiaoming.__proto__` 这条线来找  `Object.prototype` ，如果找到有原型等于 `Object.prototype` ，那么就返回 `true` 。如果找到终点(`Object.prototype.__proto__===null`)还未找到，则返回 `false` 。

结合上图，试着解释下面语句
```js
  console.log(Function instanceof Object);
  //true
  console.log(Object instanceof Function);
  //true
  console.log(Function instanceof Function);
  //true
  console.log(Object instanceof Object);
  //true
  console.log(xiaoming instanceof Function);
  //false
```

## 类的继承
现在我们要将人类分为两类，男人负责打猎，女人负责做饭。但他们都属于人类，都有人类的属性。这就涉及到 **类的继承** 了。
举个例子，注意注释 1 2 3 处。
```js
  function Human(name,age,gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    return null;
  }
  Human.prototype.Kindom = "动物界";
  Human.prototype.eat = function(food){
    console.log(this.name+"在吃"+food);
  }

  function Male(name,age,gender,strength,carefulness){
    Human.call(this,name,age,gender);//a
    this.strength = strength;
    this.carefulness = carefulness;
  }
  Male.prototype = new Human();//b
  Male.prototype.constructor = Male;//c
  Male.prototype.hunting = function(){
    console.log(this.name+"在打猎！");
  }

  function Female(name,age,gender,strength,carefulness){
    Human.call(this,name,age,gender);//a
    this.strength = strength;
    this.carefulness = carefulness;
  }
  Female.prototype = new Human();//b
  Female.prototype.constructor = Female;//c
  Female.prototype.cooking = function(){
    console.log(this.name+"在煮饭！");
  }
```
> 注释 a b c 的执行顺序其实为 b c a ；结合 `new` 运算符的执行理解：
> 1. 首先在 `function Human` 声明方法(类) 的时候，就将 `Human` 的原型对象设置为 `Object` 的实例： `Human.prototype = new Object();` 。
> 2. 然后由于设置了原型对象 `Human.prototype` 为 `Object` 的实例，导致 `prototype.constructor` 构造函数属性丢失，需手动设置 `Human.prototype.constructor = Human;` 。
> 3. 接着执行 `new Human()` 实例化对象时，先创建一个空对象。
> 4. 将空对象的隐式原型 `__proto__` 指向构造函数的原型 `Human.prototype` ，与第 1 步一起建立了完整原型链。
> 5. 将空对象绑定到构造函数 `Human` 的执行上下文环境 `this` ，然后执行构造函数，这样对构造函数中 `this` 的属性修改，即为对空对象的修改。
> 6. 构造函数执行完成，判断是否有返回值，如果没有返回值或返回值类型为原始类型，则默认自动返回空对象，如果有返回值且返回值类型为引用类型，则返回该引用类型，赋值给目标变量，完成实例化。

> 那么类的继承中的 b c a 就相当于 1 2 5 。
> b. 将 `Male` 的原型对象设置为 `Human` 的实例： `Male.prototype = new Human(); ` 。
> c. 由于重置了 `Male.prototype` 导致 `Male.prototype.constructor` 属性丢失，需重新设置为自身 `Male.prototype.constructor = Male;` 。
> a. 将 `Male` 的上下文环境 `this` 绑定到 `Human` 的上下文环境 `this` 。这样调用构造函数 `Male` 的时候，保证了 新建的空对象, `Male` 的 `this` , `Human` 的 `this` 都是指向同一个引用，它们的私有属性才能设置成功。

[多种继承方式的例子](\JavaScript\Exercise\6 Object\prototype.js)