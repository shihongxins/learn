## 初识CSS

### 在HTML文件中引入CSS的方式
#### 外部引用  
+ 通过 ```<link>``` 元素链接到CSS文件。如：  
    ```<link rel="stylesheet" herf="default.css" type="text/css">```
+ 通过在样式文件或 ```<style>``` 元素中使用 ```@import``` 引入CSS文件。如：
    ```
    <style>
    @import url("default.css");
    @import url(default.css);
    @import "defaule.css";
    @import url(default.css) screen and (orientation:landscape|portrait);
    </style>
    ```
#### 内部样式  
+ 在 ```<head>``` 元素内，添加 ```<style>``` 元素，在其中编写当前HTML文件的样式。  
#### 内联样式  
+ 在元素的开始标签中添加 __style__ 属性，在这属性中编写这一元素的CSS样式。  

### CSS语法结构
> ![CSS语法结构](https://www.w3school.com.cn/i/ct_css_selector.gif)  
> 注：值为 0 时，除%号外，不用写单位，如'px'等。值为多个单词时需要用引号引用。

### [CSS选择器](https://www.w3school.com.cn/cssref/css_selectors.asp) 

