### JavaScript 函数

#### 声明提前
+ 用 `function` 关键字声明的函数，在JavaScript解析时，会像变量提升那样，进行声明提前(类似变量提升，但早于变量提升)。
+ 用 `var ... = function(){}` 格式的函数表达式生成的函数，不会被提前。
+ 举例
  ```js
    var fn = function(){
      console.log(1);
    }
    function fn(){
      console.log(2);
    }
    fn();//输出 1
  ```

#### 函数的参数
+ 实参：调用函数时，用于传递给函数内部使用的参数，叫实际参数，可以是常量、变量、表达式。
+ 形参：声明函数时，用于接收调用调用函数时传递的实参的变量，叫形式参数。
+ 原始类型的实参的传递是 **值传递** ，即将实参的值拷贝后赋值给形参，这样在函数体内更改形参时，就不会影响外部的实参。

#### 函数需有返回值
+ 可以使用 `return ...;` 语句来使函数返回值。当函数体内不写 `return ...;` 语句，或 `return;` 后面没有内容时，函数返回 `undefined` 。
+ 函数执行时，遇到 `return` 关键字，就直接返回内容并停止函数执行了。

#### 局部变量、全局变量与 window 属性
+ 局部变量
  - 定义：在函数体内部声明的变量。
  - 作用域：函数体内部——局部作用域。
  - 生命周期：函数调用时，被声明后创建，直到函数执行完毕被销毁。
  - 特殊局部变量 **`arguments`** 对象：
    + `arguments` 对象，是所有函数（除箭头函数）中都有的局部变量，是由所有传递过来的参数组成的类数组对象（没有数组的方法）。
    + `typeof arguments` 输出 `object` ； `Object.prototype.toString.call(arguments)` 输出 `[object Arguments]` 。
+ 全局变量
  - 定义：函数体外声明的变量。
  - 作用域：整个 Javascript 程序运行时的环境(如当前的文档窗口)，全局作用域。
  - 生命周期：在被声明时创建，直到窗口被关闭。
  - 特点：全局变量可以通过 `window` 的属性访问。
+ window 属性
  - 当一个“变量”没有用 `var` 关键字声明的时候，该“变量”会变为全局对象 `window` 的一个属性，但它仍具有全局作用域。
  - 与全局变量的区别：变量不能被 `delete` 关键字删除，而属性可以被删除。
    ```js
    var a = 1;//全局
    function hello(){
      var b = 2;//局部
      c = 3;//window 属性
    }
    ```
+ 全局变量与局部变量（包括形参）重名
  - 函数体内全局变量与局部变量重名时，优先操作的是局部变量，两者相互独立互不影响。

#### 试题
  ```js
  //1、输出什么？为什么？
  var a = 1;
  function fn1() {
      function fn2() {
          function fn3() {
              console.log(a);
          }
          fn3();
          var a = 4;
      }
      var a = 2;
      return fn2;
  }
  var fn = fn1();
  fn();//输出 undefined

  //2、输出什么？为什么？
  var a = 1;
  function fn1() {
      function fn2() {
          console.log(a);
      }
      function fn3() {
          var a = 4;
          fn2();
      }
      var a = 2;
      return fn3;
  }
  var fn = fn1();
  fn();//输出 2，为什么不是输出 4 ？

  //3、输出什么？为什么？
  var a = 1;
  function fn1() {
      function fn2() {
          var a = 4;
          fn3();
      }
      var a = 2;
      return fn2;
  }
  function fn3() {
      console.log(a);
  }
  var fn = fn1();
  fn();//输出 1，为什么不是 4 ？

  //4、输出什么？为什么？
  var obj1 = {a: 1,b: 2};
  var obj2 = {a: 1,b: 2};
  console.log(obj1 == obj2);//输出 false ，因为对象的实际内存地址不同
  console.log(obj1 = obj2);//输出 {a: 1,b: 2} ，因为执行赋值语句后返回结果
  console.log(obj1 == obj2);//输出 true ，因为前面执行赋值后，对象的实际内存地址相同

  //5、输出什么？为什么？
  var result = sum(3,4);
  console.log(result);
  function sum(a,b){
      return console.log(a+b);
  }
  /*
  先输出 7
  再输出 undefined
  */
  ```

#### 把函数视为“值”
> 一等值：同时满足 1.赋值给变量,2.作为实参传递,3.作为结果返回。三个条件的值被称为“一等值”。
+ `function` 关键字的双面使用
  - 标准函数声明
    ```js
    //下面是一个标准的函数声明 
    function a(){
        return;
    }
    //通过 函数名() 调用
    a();
    ```
  - 函数表达式/匿名函数 
    ```js
    //下面是用函数表达式/匿名函数来创建函数
    var a = function(){
        return;
    }
    //调用方法相同
    a();
    ```
  - 标准的函数声明与函数表达式的差异
    + 标准的函数声明会在Javascript解释时提升(类似变量提升，但早于变量提升);而函数表达式不会被提升。
    + 函数声明是完整的语句；函数表达式只是语句的一部分。
    + 两者调用方法相同。

#### 嵌套函数及其作用域
  ```js
  var migrating = true;

  var fly = function (num) {
      var sound = "Flying";
      function wingFlapper() {
          console.log(sound);
      } // 在“函数表达式” fly 中，添加了一个名为 wingFlapper 的“函数声明”；

      for (var i = 0; i < num; i++) {
          wingFlapper(); // 调用 wingFlapper；
      }
  };

  function quack(num) {
      var sound = "Quack";
      var quacker = function () {
          console.log(sound);
      }; // 在“函数声明” quack 中，添加了一个“函数表达式”，并将其赋给变量 quacker；

      for (var i = 0; i < num; i++) {
          quacker(); // 调用 quacker。
      }
  }

  if (migrating) {
      quack(4);
      fly(4);
  }
  ```
+ 解释：
  - Javascript第一遍解析时，进行函数声明提升和变量提升。因此先运行
    ```js
    var migrating;
    var fly;
    function quack;
    ```
    且这三个变量或函数为全局变量。
  - Javascript第二遍执行时，当运行到 `fly = function(){}` 的时候，变量 fly 才被定义，在此之前为 `undefined` 。
  - wingFlapper 函数在 fly 函数中是由标准函数声明定义的，因此它会在 fly 内部被提升，且作用域为 fly 整个内部。
  - quacker 函数在 quack 函数中是由函数表达式声明定义的，因此它在 quack 内部不会被提升，且在 `quacker = function(){]` 语句之前都是未定义，但它的被定义后它的作用域仍是 quack 整个内部。

#### 词法作用域
> 仅查看代码结构就能看出变量的作用域，叫词法作用域，无需等待代码执行时才明白。
+ 重点： **JS函数都是在定义它的环境中执行的(不是调用时所处的环境)。** 要确定函数内变量指向何方，应从函数内部一层一层向外查找，直到找到全局。

#### 闭包
> 函数和其内部变量赋值时的环境一起被称为闭包。详细解释为： **包含自由变量的函数** 和 **为所有这些自由变量提供了变量值的绑定的环境** 一起被称作闭包。
+ 作用：封装和暂存数据。
+ 创建方法
  - 将函数表达式用作实参来创建闭包。
  - 用事件处理程序来创建闭包。

#### 深入理解闭包
+ 作用域
  - 作用域是一套用于确定变量(标识符)位置和查找方式的规则。
+ 词法作用域
  - JS中的作用域都是 **词法作用域** ，即在函数定义声明时所在的位置决定的，是一种静态作用域。
+ 作用域嵌套
  - (在ES6的let与const之前)JS只有函数作用域和全局作用域。函数作用域嵌套在全局作用域下，且函数作用域内部还能继续嵌套函数作用域。
  - 作用域嵌套后，内部作用域能够访问外部作用域内的变量，外部作用域却不能访问内部作用域的变量。
+ 作用域链
  - 由于作用域嵌套，某个函数在内部作用域未查找到某一变量时，总是向上一层作用域去查找，直到找到时返回该变量或查找到全局作用域仍未找到时报错，这一查找过程的链路叫作用域链。
+ 执行上下文环境
  - 执行上下文是指运行 **函数调用** 时在 **执行栈** 中创建的变量对象，这个对象我们无法直接访问，但能够访问其内部的变量， `this` 对象等。
  - 每次函数调用运行时都会创建一个上下文环境，Javascript引擎会以栈（先进后出）的形式来管理所有的上下文环境。栈底永远都是全局上下文环境，而栈顶是当前活动函数的执行上下文环境。
+ 闭包
  - 当函数可以记住并访问其词法作用域时，就产生了闭包，即使函数是在当前的词法词法作用域之外被执行。
  - 例子
    ```js
    //例子一
    function fn1(){
      var name = "hello";
      function fn2(){
        console.log(name);
      }
      return fn2;
    }
    var fn3 = fn1();
    fn3();
    /**
    这个例子中，
    先声明了函数 fn1，然后声明变量 fn3，接着执行函数 fn1，并用变量 fn3 接收 fn1 的返回值
    在 fn1 内部声明函数 fn2，然后声明变量 name，将 "hello" 赋值给 name，然后将函数 fn2 作为 fn1 的返回值返回，
    变量 fn3 接收到 fn1 的返回值 fn2 后，变量 fn3 等同于函数 fn2 ，
    然后执行 fn3 能够打印变量 name 输出 "hello"，
    说明 fn3 对应的 fn2 记住并能够访问其词法作用域，并有外部的函数 fn3 调用执行。
    */

    //当然闭包不一定非要是将函数当值返回这一形式，还有参数传递调用形式，如
    //例子二
    function fn1(){
      var name = "hello";
      function fn2(){
        console.log(name);
      }
      fn3(fn2);
    }
    function fn3(fn){
      fn();
    }
    //上面的例子比较抽象，举个实际点的：一段时间后执行什么
    function doSomeWaitTime(name,time){
      setTimeout(function(){
        alert("Hello,"+name);
      },time);
    }
    doSomeWaitTime("world",1000);
    //上面的定时器创建了一个匿名函数，然后在一定时间后调用该匿名函数，并访问其匿名函数原来的词法作用域。
    //再举个常见的面试坑
    for(var i = 0;i<5;i++){
      setTimeout(function(){
        console.log(i);
      },1000);
    }
    /**
     上面这个例子，原本期望的是，每隔1秒输出 i ，最终输出 0,1,2,3,4
     而实际上却输出了 5,5,5,5,5
     原因是函数实际解释为下面这样，
     i 在 for 语句中声明时是声明的全局变量，
     在执行 setTimeout 之前 for 循环已经结束，此时 i 值为 5，
     而匿名函数执行时，是在全局执行，而其内部没有局部变量 i ，只能通过作用域链访问全局变量 i，
     因此打印 5,5,5,5,5
     解决办法，在 for 循环内，为每个 i 创建独立的局部函数作用域。如下
     */
     for(var i = 0;i<5;i++){
       (function(){
         var j = i;
         setTimeout(function(){
           console.log(j);
         },1000);
       })();
     }
     //或者
     for(var i = 0;i<5;i++){
       (function(j){
         setTimeout(function(){
           console.log(j);
         },1000);
       })(i);
     }
    ```