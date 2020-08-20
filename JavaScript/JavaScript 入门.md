### JavaScript 记录
> ECMAScript6 即 ECMAScript 2015 ,后续还有 ES2016 、ES2017 、ES2018 、ES2019 等。 

变量的声明：
+ 变量名称
  - 必须以字母、下划线或美元符号开头；
  - 然后以任意长度字母、下划线、美元和数字作变量名；
+ 语句结束
  - 语句总是以 `;` 为结尾，代表该语句结束；
  - **换行** 也代表该行的语句的结束，面试时常见的坑；
+ 循环语句： `...while()` 、 `do...while()` 、 `for()...` 、 `for...in...` 、`for...of...` 、 `foreach()` 。
+ 分支语句
  - `if()`
  - `if()...else`
  - `if()...else if()...`
  - `switch()...case...case...default...` 注意，只要当进入一个 `case` 后，如果没有 `break` 那么后续 `case` 里的语句也会执行！不是每遇到一个 `case` 都会判断！
+ 运算符与运算符优先级
  - 问题
    + 为什么 `console.log(0.1+0.2==0.3);` 输出 `false` ？
    > 因为 JavaScript 中的 Number 类型就是浮点型，实际上是用的 二进制浮点表示法，这种不能表示 0.1 或者 0.5 等小数，会有舍入误差，再计算 0.1+0.2 时先将数字转换为二进制，再进行比较，这一过程出现误差。
    + 下列代码输出什么？
      ```js
        var a = 1;
        a+++a;//等同于 (a++)+a
        typeof a+2;//等同于 (typeof(a))+2 输出 "number2"
      ```
    + 以下代码输出什么？
      ```js
        var d = a = 3;b = 4;//等同于 var d = (a = 3);b = 4;
        console.log(d);//输出 3
      ```
    + 以下代码输出什么？
      ```js
        var d = (a = 3,b = 4);
        console.log(d);//输出 4 参考逗号运算符
      ```
    + 以下代码输出什么？
      ```js
        var a = 1,b = 2, c = 3;
        var val = typeof a + b || c > 3 ;//等同于 var val = (typeof(a)+b)||(c>3); 
        //优先级 typeof 高于 + 和 > 高于 || ,且 || 运算时，存在为真的表达式，直接返回该表达式的结果。
        console.log(val);//输出 "number2"

        var d = 5;
        var data = d == 5 && console.log("dd");//输出 "dd"
        //赋值表达式右边 == 优先级高于 && ，而 d == 5 为真，继续执行 && 后面的语句，故输出 "dd"
        console.log(data);//输出 undefined 因为 执行 && 后面的语句后，输出 "dd" ，但 console.log() 无返回值，故 data = undefined

        var data2 = d = 5 || console.log("haha");//等同于 var data2 = d = (5 || console.log("haha"));
        console.log(data2);//输出 5

        var x = !!"hello"+ (!"world",!!"shx");
        console.log(x);//2 参考逗号表达式

        var a = 1;
        console.log(a+++a);//输出 3 
      ```
  - 重点
    + `+` 号运算符，当只有一个操作对象且在操作在右边时，会尝试将右边的操作对象转为 数字，如果无法转换为数字，则返回 `NaN` 。如
      ```js
        console.log(+"1");
        //输出 1
        console.log(+"shx");
        //输出 NaN
      ```
    + `+` 号运算符，如果有一个操作对象的类型为对象时，会先尝试调用对象的 `valueOf()` ，不存在的化调用 `toString()` 。
    + `-` ， `*` ， `/` （减、乘、除）运算符，会先将操作对象转为数字，不能转换返回 `NaN` 。
    + `++` 、 `--` 自增、自减运算符。
      ```js
        var a = 1;
        var b = a++;
        console.log(a);//输出 2
        console.log(b);//输出 1
        var c = ++a;
        console.log(a);//输出 3
        console.log(b);//输出 1
        console.log(c);//输出 3
      ```
    + `=` 赋值运算符。表示把 **右边表达式的值** 赋值给左边，即先计算出右边的值。如
      ```js
        var a = "s";
        var b;
        var c = b = a;//等同于 var c = (b = a);
        console.log(c);//输出 "s"
      ```
    + 布尔运算符，将表达式计算结果进行比较或布尔运算，返回 `true` 或 `false` 。
      - 比较运算符
        比较运算符|意义
        --|--
        `==` | 值相等运算符(会自动进行类型转换)
        `!=` | 值不等运算符
        `===` | 严格相等运算符(值和类型都相同)
        `!==` | 严格不等运算符
        `>` | 大于
        `<` | 小于
        `>=` | 大于等于
        `<=` | 小于等于
      - 逻辑运算符
        逻辑运算符|意义
        --|--
        `&&` | 逻辑与 ，前后表达式都为真 `true` 返回 **最后一个表达式的值** ，一个为假 `false` ，返回 `false` 。
        `\|\|` | 逻辑或 , 前后表达式有一个为 `true` 返回 **为真的表达式的值** ，都为假 `false` ，返回 `false` 。
        `!` | 逻辑非 , 表达式结果 **转为布尔值后** 再取反。
    + 其他运算符
      - `()` 括号运算符，内含表达式时，作用是执行表达式；跟在函数名后面时，作用是调用函数。
      - `void` 运算符，作用是执行表达式，并返回 `undefined` 。
      - `,` 号运算符，作用是，执行前后表达式，并返回后一个表达式的值。如
        ```js
          var a = 1;
          var b = 2;
          var c = (a,b);
          console.log(c);//输出 2
        ```
      - `typeof` 运算符，判断数据类型。
  - 运算符优先级
    + 记忆：括号，属性，实例化；函数调用，后增减；取非，正负，前增减；关键字，幂乘除模加减位移，大小比较判断存在；是否相等，按位与或，逻辑与或；三目赋值迭代展开逗号。
    + 参考：[算数优先级 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
+ 语句与表达式
  - 语句用于用于执行一定的操作，一般不需要返回值。
  - 表达式用于运算的式子的值，返回式子运算后的值。
+ 变量提升
  - JS引擎在解析代码时，会先将所有的变量声明提升到前面，声明后再运行后面的语句。如
  ```js
    console.log(a);
    var a = 5;
    //运行并不会报错，因为解析后的语句为
    /*
    var a;
    console.log(a);
    a = 5;
    */
  ```
+ 代码区块
  - 将一段JavaScript代码写在 `{}` 中组合成一个代码区块。但与大多数语言不同，区块并不会构成一个新的作用域。即括号中的变量和括号内的变量属于同一作用域。
+ 数据类型
  - 原始类型：String,Number,Boolean,undefined,null,Symbol
  - 对象类型：Objiect,Array,Function
+ 数据类型判断
  - `typeof`
    + 缺点：
    ```js
      typeof [];//Object
      typeof null;//Object
      typeof {};//Object
    ```
  - `instanceof`
    + 缺点：能判断复杂对象类型，不能判断简单原始类型。
  - `Object.prototype.toString.call()`
+ 类型转换
  - `()` 中的类型转换：在 `if()`,`while()` 语句的括号中的表达式会强制转换为布尔(Boolean)类型。
    + `""` 转换后为 `false`
    + `" "` 转换后为 `true`
    + Object 类型转换为 `true`
  - `==` 两边的类型转换：在 `==` 两边的表达式在比较相等时，会尽力转换为数字(Number)类型。
    + 如果一边是 Object 类型，则先尝试调用对象的 `valueOf()` 没有再调用 `toString()` 。
    + ```js
        ''==true;//返回 false
        ''==false;//返回 true
        ' '==true;//返回 false
        ' '==false;//返回 true
        ''==0;//返回 true
        ' '==0;//返回 true
        ''==' ';//返回 true
      ```
+ 函数参数传递
  - 原始数据类型再进行参数传递的时候，是 **值传递** ，函数内部对形参的修改，不会影响原有的实参。
  - 对象数据类型再进行参数传递的时候，是 **引用传递** ，传递的是该实参的内存地址，函数内部对形参的修改，会同步影响原有的实参，但如果重新声明对象赋值给形参，则形参有了新地址，不会再影响实参。
+ 流程控制语句
  - `switch(){case...:...;break;}` 中，`break` 是为了 **跳出 `switch` 语句** ，而不是 结束 `case` 。故当进入某一 `case` 而没有 `break` 时，程序会一直运行后续的 `case` 内容直到遇到 `break` 或 `switch` 结束。如：
    ```js
      switch("小花"){
        case "小明":console.log("小明");break;
        case "小花":console.log("小花");
        case "小芳":console.log("小芳");
        case "小刘":console.log("小刘");break;
        default:console.log("小强");
      }
      /*
      "小花"
      "小芳"
      "小刘"
      */
    ```
  - `return` 语句： `return` 语句只能用于函数体内，当遇到 `return ...;` 语句时，立即结束函数，并返回 `return` 后面表达式的值。