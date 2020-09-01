### JavaScript 对象

#### 创建对象 1 字面量模式
+ 如：
  ```js
  var myCar = {
      mark: "Mitsubishi",
      model: "ASX",
      year: 2013,
      color: "white",
      passengers: 5,
      convertible: false,
      mileage: 102400
  };
  ```
+ 注意：
  - 属性之间用 `,` 号隔开。
  - 属性名不能重复。
  - 属性名由多个单词组成且包含空格时，用引号引起。

#### 对象属性的操作
> 可以对对象的属性进行增删改查的操作。
+ 访问(查询)属性值
  - 举例
    ```js
    myCar.mark
    //或
    myCar["mark"]
    //或
    myCar[111]
    //不能 myCar.111
    ```
    注：当属性名为数字时只能通过 `[]` 形式访问，而通过 `[]` 形式访问，除了纯数字属性名，其他都得用引号 `""` 引起，防止被认为是变量。
  - 访问不存在的属性返回 `undefined` （可以用来判断属性是否已经声明）。
+ 新增/修改属性值
  - 在 访问属性值 的形式右边写上 赋值表达式 即可对对象属性值进行修改(不存在的属性直接新增)。
  - 举例
    ```js
    //修改
    myCar.year = 6;
    myCar["year"] = 7;
    //新增
    myCar.height = 2;
    myCar["width"] = 1.5;
    ```
+ 删除对象的属性
  - 用 `delete` 关键字删除对象属性。
  - 举例
    ```js
    delete myCar.height;
    ```
    注：不存在或可以删除返回 true ，不可删除才返回 false
+ 查询对象所有的属性名 `object.keys()`
  - 如：
    ```js
    myCar.keys();//返回属性名的数组
    ```

#### 对象的行为--方法
> 对象的属性也可以是一个函数，即将匿名函数赋值给对象的属性。这样的函数属性叫做方法。
+ 如：
  ```js
  var myCar = {
      mark: "Mitsubishi",
      model: "ASX",
      year: 2013,
      color: "white",
      passengers: 5,
      convertible: false,
      mileage: 102400,
      //这里的 drive 属性是一个匿名函数，因此它也可以被叫做是 myCar 的方法
      drive:function(){
        console.log("Zoom Zoom~");
      }
  }
  //而调用对象的方法是
  myCar.drive();
  ```

#### 构造函数
> 前面我们创建对象使用的是 **字面量模式** ，这可以让我们轻松创建多个独立的对象实例，
但如果我们要创建一类有关联的对象实例就需要用到 **工厂模式** ，即 **对象构造函数** 。通过对构造函数的调用创建不同的对象实例。
+ 如：
  ```js
  function Dog(name,weight,breed){
    this.name = name;
    this.weight = weight;
    this.breed = breed;
  }
  /**
  这样就创建了一个名为 Dog 的构造函数，可以理解为创建了 狗Dog 这个类，然后通过这个类创建不同的 小狗实例。
  构造函数命名时，为了区分与函数的区别，尽量采用 首字母大写，表明是一个 类。
  构造函数中， this 指向被实例化的对象，因此 对该对象的属性进行初始化值时采用赋值语句。
  注意这个构造函数没有返回值。
  */

  //如何使用 构造函数 创建不同的小狗实例。
  var fido = new Dog("fido",42,"Mixed");
  /**
  通过 new 和 调用构造函数 的表达式，来实例化一个对象。并将实例化的的新对象的结果(地址)赋值给变量 fido 。
  重点是明白 new 做了什么？
  */
  ```
+ 运算符 `new` ，在实例化一个对象时做了什么？
  - 首先，通过执行运算符 `new` 创建一个 **空对象** 。
  - 然后，将构造函数中的 `this` 指向 **空对象** 。
  - 接着，调用 **构造函数** 接受形参，执行构造函数，给 **空对象** 声明添加设置的属性，并将形参赋值给属性。
  - 最后， **构造函数** 执行完毕，自动返回 `this` (新对象的引用)，并将 `this` 赋值给变量 `fido` 。
> 即当我们用运算符 `new` 调用 **构造函数** 时都会创建一个新对象的实例。
+ 如何在 **构造函数** 中创建对象的方法。
  - 如：
    ```js
    function Dog(name,weight,breed){
      this.name = name;
      this.weight = weight;
      this.breed = breed;

      //构造函数中方法的创建，思考有什么问题。
      this.bark = function(){
        if(this.weight>30){
          console.log(this.name+" says woof!");
        }else{
          console.log(this.name+" says yip!");
        }
      }
    }
    ```
+ **字面量模式** 与 **工厂模式** 的结合
> 并不是说工厂模式一定好于字面量模式，因为当工厂模式需要的参数越多时，可能导致参数缺少或丢失，
最好先通过字面量模式创建一个 **属性特征集合对象** ，然后将给集合对象传递给 **工厂模式** ，以此方便的创建对象。
  - 如：
    ```js
    function Dog(feature){
      this.name = feature.name;
      this.weight = feature.weight;
      this.breed = feature.breed;
      this.gender = feature.gender;
      this.age = feature.age;
      this.bark = function(){
        if(this.weight>30){
          console.log(this.name+" says woof!");
        }else{
          console.log(this.name+" says yip!");
        }
      }
    }
    var fidoFeature = {
      name: "Fido",
      breed: "Mixed",
      weight: 38,
      gender: "male",
      age: 5
    };
    var fido = new Dog(fidoFeature);
    //这样创建对象时，就不用担心参数缺少报错，或参数顺序混乱，导致属性混乱的问题了
    ```

#### 理解 `instanceof`
> 可以通过运算符 `instanceof` 来判断一个对象实例是由哪个类创建的。 `instanceof` 不仅判断当前类，还判断其继承的类，故任何对象的 `instanceof Object` 都是 `true` ；
+ 如：
  ```js
  fido instanceof Dog;//true
  fido instanceof Array;//false
  fido instanceof Object;//true
  fido instanceof Array;//false
  ```

#### JavaScript内置对象的 字面量模式 和 工厂模式
+ Array
  - 前面创建一个数组，是用的 字面量模式，如 `[0,1,2]` 。
  - 那么不知道数组项，可以用工厂模式创建数组 `new Array(arrayLenth)` 。
+ Object
  - 对象字面量模式 `{}` 。
  - 对象工厂模式 `new Object()` 。两者等价。

#### 原型
+ 构造函数中创建方法引起的不足
> 由于用运算符 `new` 调用构造函数，都会创建一个新的对象实例，其方法也是独立不同的，因此这就造成了 **方法的重复** 。
因此为了 **重用方法** ，可以在构造函数的原型上声明方法。这样通用的方法都指向一个函数。
+ 原型是什么？
> JavaScript中使用 **原型式继承** ，其中其行为被继承的对象被称为 **原型** 。旨新对象继承已有的属性和方法，又覆盖或添加其独有的属性和方法。
+ 继承的作用
> 当对象实例中找不到某一属性或方法时会向其原型中查找，直到找到（或查找到 `Object` 类还未找到，抛出错误）。
+ 重写原型
> 任何时候都可以重写原型的属性与方法。
+ 使用原型
  - 通过 `.prototype` 属性访问原型。
  - 对原型设置属性和方法需要在调用构造函数前进行。
+ 原型链
> 原型链原理：当在对象实例中访问某一属性或调用某一方法时，首先是在实例中查找，如果找不到，就按照原型链，依次向上查找，直到找到（或查找到 `Object` 类还未找到，抛出错误）。
 - **重点** (一定要理解)
   + 在用运算符 `new` 调用构造函数时，先是创建了一个空对象，然后调用构造函数，将构造函数中的 `this` 指向空对象，最后将形参赋值给空对象的属性。
   + 那么一个构造函数(子类)继承另一个构造函数(父类)时，为了保证子类创建的实例具有父类的方法，需要在用运算符 `new` 调用子类构造函数时，先创建一个父类的实例化对象，然后调用子类构造函数，将子类构造函数中的 `this` 指向父类的实例化对象，然后将父类构造函数中的 `this` 绑定为 子类构造函数的 `this`，接着调用父类构造函数将子类构造函数的形参传递给父类构造函数，以此初始化父类实例化对象(此时父类的实例化对象，子类构造函数中的 `this` ，父类构造函数中的 `this` 都指向同一对象)的属性和方法。然后执行子类构造函数的语句，将子类特有的属性和方法赋值给实例化对象，然后 `new` 返回该对象的引用，将其赋值给变量。