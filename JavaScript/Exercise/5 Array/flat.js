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