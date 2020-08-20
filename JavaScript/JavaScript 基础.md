### JavaScript 函数

#### 声明提前
+ 用 `function` 关键字声明的函数，在JavaScript解析时，会像变量提升那样，进行声明提前。
+ 用 `var ... = function(){}` 格式的函数表达式生成的函数，不会被提前。

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