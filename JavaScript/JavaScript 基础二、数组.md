### Javascript 数组

#### ES3 数组方法
> 以下方法会更改原数组
+ `push(item1,...,itemN)` 向数组末尾推入元素作为数组元素，会改变原数组，返回改变后的长度 `length`。可以不写参数或写多个参数。
+ `pop()` 从数组末尾弹出(删除)一个数组元素，会改变原数组，返回被弹出(删除)的元素。当数组为空时，返回 `undefined` 。
+ `unshift(item1,...,itemN)` 与 `push` 类似，区别是 `unshift` 是向数组开头添加元素。
+ `shift()` 与 `pop` 类似，区别是 `shift` 是从数组开头弹出(删除)。
+ `splice(beginIndex[,deleteCount[,replaceItem1,...,replaceItemN]])`
  - 作用：通过删除、替换或新增元素的方法来改变原数组。
  - 返回值：以数组形式返回被删除的元素。如果没有删除元素，则返回空数组。
  - beginIndex
    + beginIndex >= length 则表示从数组末尾操作。
    + beginIndex < 0 则表示从 (length-|beginIndex|) 位置开始操作。如果 (length-|beginIndex|) < 0 则表示从 0 开始。
  - deleteCount
    + deleteCount <= 0 则默认为 0 ，表示不删除元素。
+ `reverse()` 反转(颠倒)原数组，即将原数组前后颠倒，会改变原数组。
+ `sort([compareFunction])` 使用原地算法，按指定的比较方法排列数组元素，如果省略比较方法，则按照 Unicode 字符串比较排列。可能会出现 80 在 9 之前的问题。
  - 比较方法必须返回一个数字(正数,0,负数)。
    + 返回负数，则将比较项中第一项放在第二项前面。
    + 返回正数，则将比较项中第一项放在第二项后面。
    + 返回0，比较项位置不发生改变。
  - 全部为数字类型的比较，可以直接返回两者相减的结果。升序：第一项减第二项；降序：第二项减第一项。
  - 如果是字符串类型的比较，推荐使用 `String.prototype.localeCompare(other)` 方法。如
    ```js
        'a'.localeCompare('b');//return -1 表示 'a' 在 'b' 前面
        'c'.localeCompare('b');//return 1 表示 'c' 在 'b' 后面
        'a'.localeCompare('a');//return 0
    ```
> 以下方法不会更改原数组
+ `concat([item1[,...,itemN]])` 合并一个或多个数组，不会改变原数组，而是返回新数组。
  - 浅拷贝
  - 如果参数是 对象引用，则拷贝其对象引用到新数组。那么原数组和新数组中的参数都指向同一个对象引用，对该对象引用的修改，会引起原数组和新数组的更改。
  - 如果参数是 String,Number,Boolean 原始类型，则是将其值复制到新数组中。
  ```js
    var num1 = [[1]];
    var num2 = [2,3];

    var nums = num1.concat(num2);
    console.log(nums);// [[1],2,3]

    num1[0].push(4);
    console.log(num1);// [[1,4]]
    console.log(nums);// [[1,4],2,3]
  ```
+ `slice([beginIndex,endIndex))` 切分数组，从 beginIndex 开始到 endIndex 结束(包含 beginIndex 而不包含 endIndex )进行切分提取，返回一个新数组。
  - beginIndex
    + beginIndex < 0 表示从倒数第几个元素开始提取，如 `[1,2,3].slice(-2);` 返回 `[2,3]` 。
    + beginIndex 省略，默认为 0 。
    + beginIndex >= length 返回空数组。
  - endIndex
    + endIndex < 0 表示提取到倒数第几个元素为止(不包含 endIndex 元素)。
    + endIndex 省略或 endIndex >= length 都表示提取到末尾。
  - 如果 beginIndex > endIndex 则返回空数组。
  - 浅拷贝
+ `join([separator])` 将数组元素通过指定连接符连接成字符串。
  - separator 省略 默认为 `,` 连接。
  - 如果某元素为 `undefined` 或 `null` 则该元素转换为空字符串。
  - 如果为空数组，则返回空字符串 '';
  - 与此方法相反的是 `String.prototype.split()` ，[参考 split](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

#### ES5 数组方法
> 查找
+ `indexOf(searchItem[,beginIndex])` 从指定地方开始 **向后** 查找搜索数组元素。
  - 返回搜索到的第一个元素的位置，没有找到返回 -1。
  - beginIndex 省略，默认从 0 开始查找整个数组。
  - beginIndex < 0 则从 (length-|beginIndex|) 位置开始。
  - 注意查找相等是使用的 **严格相等** `===` 。
+ `lastIndexOf(searchItem[,beginIndex])` 从指定的地方开始 **向前** 查找元素。要点同 `indexOf` 。
> 迭代
+ 检测方法：用回调函数观察数组内每项的内容。
  - 通用回调函数 `callback(item[,index[,originalArray]])`
  - `forEach(callback[,thisArg])` 对数组的每一项都执行一次回调函数。
    + `forEach` 函数无法终止（不同于 `for...in...` 和 `for...of...`）。
    + 执行 `callback` 函数总是返回 `undefined` 。
    + 已被删除或者未初始化的项会被跳过。
    + `callback` 函数中的 `this` 总是指向 `thisArg` 参数，如果省略或 `thisArg` 为 `null` 或 `undefined` ，则 `callback` 中的 `this` 指向全局。
    + 在 `forEach` 迭代的时候不会改变原数组，但可以在 `callback` 中更改原数组。
      - `forEach` 的最大循环次数，在最开始的时候就已经确定，因此就算后面在 `callback` 中修改了数组，也最多循环最开始的 `length` 次，而如果是将数组长度减小，则最多循环现有现有 `length` 次。即 min(oldLength,newLength) 次。
      - `forEach` 取到的项是 `originalArray` 的最新项，即如果在 `callback` 中修改了某项，那么在迭代到该项时，取得是该项的最新值。
  - `every(callback[,thisArg])` 对数组的每一项都执行一次回调函数，判断其是否满足某规则，进而判断数组是否 **每项都满足** 这规则。
    + 如果每项都满足回调函数的规则（回调函数返回真值），那么 `every` 返回 `true` ；只要有一项不满足（回调函数返回假值），那么 `every` 立即停止迭代，并返回 `false` 。
    + 空数组 `[]` 的 `every` 总是返回 `true` 且不会执行 `callback` 。
    + 它的 `this` 指向、对原数组的修改、最大迭代次数和每次迭代取到的项都似于 `forEach` 。
  - `some(callback[,thisArg])` 对数组每一项都执行一次回调函数，判断其是否满足某规则，进而判断数组是否 **至少有一项满足** 这规则。
    + 如果有一项满足回调函数规则（回调函数返回真值），那么 `some` 立即停止迭代，并返回 `true` ；否则要每项都不满足（回调函数返回假值），那么 `some` 返回 `false` 。
    + 空数组 `[]` 的 `some` 总是返回 `false` ，且不执行 `callback` 。
    + 它的 `this` 指向、对原数组的修改、最大迭代次数和每次迭代取到的项都似于 `forEach` 。
+ 转换方法：用回调函数对每一项进行转换操作，返回转换后的新数组。
  - 通用回调函数 `callback(item[,index[,originalArray]])`
  - `map(callback[,thisArg])` 对数组的每一项进行回调函数的操作并返回新项，进而返回由新项组成的新数组。（注：在不需要返回新数组，或回调函数无返回值时，不应使用 `map` ，而应该使用普通的迭代 `for` 或 `forEach` ）。
    + `map` 函数也无法被终止。
    + `callback` 没有返回值时，返回 `undefined` ，进而 `map` 返回由 `undefined` 组成的数组。
    + 如：求数组每项的平方根，并返回
      ```js
        var a = [1,4,9];
        var b;
        b = a.map(Math.sqrt);
        console.log(a);//[1,4,9]
        console.log(b);//[1,2,3]
      ```
    + 常见面试坑
      ```js
        ['1','2','3'].map(parseInt);// 输出 [1,NaN,NaN]
        //因为 parseInt 需要两个参数，一是要转换的对象，二是要转换的进制，故实际执行的是 parseInt('1',0),parseInt('2',1),parseInt('3',2)
      ```
  - `filter(callback[,thisArg])` 对数组每一项进行回调函数过滤返回符合项（回调函数返回真值），进而返回由符合项组成的新数组。
    + 如：返回不及格的分数。
      ```js
        [60,95,48,32,86,75].filter(function(item){
          if(item<60){
            return true;
          }
        });//输出 [48,32]
      ```
+ 归约方法
  - 通用回调函数 `callback(accumulator[,item[,index[,originalArray]]])`
  - `reduce(callback,initialValue)` 对数组每一项执行回调函数的归约操作并暂存，最终返回回调函数最后的值。
    + `accumulator` 累计器，用于暂存前一项的结果。
    + `initialValue` 初始值。
      - 如果有初始值，则 `accumulator` 累计器等于初始值，从第一项开始迭代（ `item` 等于第一项， `index` 等于 1 ）。
      - 如果省略初始值，则 `accumulator` 累计器等于数组第一项，从第二项开始迭代（ `item` 等于第二项， `index` 等于 2）。
    + 只有1个元素执行 `reduce` 返回执行一次后的 `accumulator` 累计器（即无初始值时返回第一项，有初始值时返回初始值与第一项的归约值）。
    + 空数组 `[]` 执行 `reduce` 必须有初始值，不然会报错。
    + 如：数组求和
      ```js
        function sum(acc,item,index,arr){
          return acc+item;
        }
        [1,2,3,4].reduce(sum);//返回 10 ，执行的是 1 +2+3+4
        [1,2,3,4].reduce(sum,10);//返回 20 ，执行的是 10 +1+2+3+4
      ```
  - `reduceRight(callback,initialValue)` 同 `reduce` ，只是执行顺序为倒序。

#### 面试题
+ 数组元素去重
```js
  function unique1(arr){
    var res = [];
    arr.forEach(function(item){
      if(res.indexOf(item) == -1){
        this.push(item);
      }
    },res);
    return res;
  }
  function unique2(arr){
    var res = [];
    for(var i = 0;i<arr.length;i++){
      if(res.indexOf(arr[i]) == -1){
        res.push(arr[i]);
      }
    }
    return res;
  }
  var arrA = ["1", "1", "3", "5", "2", "24", "4", "4", "a", "a", "b"];
  console.log(unique1(arrA));//["1", "3", "5", "2", "24", "4", "a", "b"]
  console.log(unique2(arrA));//["1", "3", "5", "2", "24", "4", "a", "b"]
```
+ 判断变量是否为数组。
  - `Array.isArray(param)`
  - `Object.prototype.toString.call(param)=="[object Array]"`
  - `param instanceof Array`
+ 手动实现一个简易的 reduce
```js
  var arr = [1, 2, 3, 4];
  function reduceFunc(arr,callback,initialValue){
    if(Array.isArray(arr)){
      var i = initialValue===undefined?0:1;
      var tempArr = (initialValue===undefined?[]:[initialValue]).concat(arr);
      while(tempArr.length>1){
        tempArr.splice(0,2,callback(tempArr[0],tempArr[1],i,arr));
        i++;
      }
      return tempArr[0];
    }
  }
```
+ 手动实现将多维数组拍平。
```js
  var arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10], 9], 8], 7], 6];
  //第一种 for,isArray,push/concat,recursivity
  function forFlat(arr, deep) {
    if (Array.isArray(arr)) {
      deep = deep===undefined?1:deep;
      var resArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && deep > 0) {
          resArr = resArr.concat(forFlat(arr[i], deep = deep - 1));
        } else {
          arr[i]!==undefined && resArr.push(arr[i]);
        }
      }
      return resArr;
    }
  }
  
  //第二种 Closure,forEach,isArrar,recursivity
  function eachFlat(arr, deep) {
    var resArr = [];
    deep = (deep===undefined||deep<1)?1:deep;
    (function falt(tempArr, tempDeep) {
      tempArr.forEach(function(item){
        if(Array.isArray(item) && tempDeep>0){
          falt(item,tempDeep-1);
        }else{
          resArr.push(item);
        }
      });
    })(arr, deep)
    return resArr;
  }
  
  //第三种 toString,split
  //局限性较大，返回值每项都为字符类型，且不能定义深度
  function toStringFlat(arr){
      return arr.toString().split(',');
  }
  
  var o = arr.flat(3);
  var f = forFlat(arr,3);
  var e = eachFlat(arr,3);
  var t = toStringFlat(arr);
  console.log(o);
  console.log(f);
  console.log(e);
  console.log(t);
```