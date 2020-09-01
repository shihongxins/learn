function reduce(arr,callback,initialVal){
    if(Array.isArray(arr)){
        var i = initialVal===undefined?0:1;
        var resArr = (initialVal===undefined?[]:[initialVal]).concat(arr);
        //为什么要用 concat 方法定义一个结果数组，然后对结果数组进行迭代，而不是直接在 形参 arr 上进行迭代？
        //因为 arr 为对象类型，在进行参数传递的时候是传递的地址，如果对 arr 迭代，甚至 unshift(initialVal) 的话，会改变外部原有的实参 tempArr
        while (resArr.length > 1) {
            resArr.splice(0, 2, callback(resArr[0], resArr[1], i, arr));
            i++;
        }
        return resArr[0];
    }
}
function sum(a,b){
    return a+b;
}
var tempArr = [1,2,3,4];
var res1 = tempArr.reduce(sum);
var res2 = tempArr.reduce(sum, 10);
var res3 = reduce(tempArr,sum);
var res4 = reduce(tempArr,sum,10);