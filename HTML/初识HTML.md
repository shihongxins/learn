## 初识HTML
### 标签元素
- HTML(Hyper Text Markdown Language)即超文本标记语言，是用标记标签来描述网页。
- 标记标签分为开始标签，如：```<p>```，结束标签，如：```</p>```，开始标签+内容+结束标签=元素，如：```<p>我是一个元素</p>```是一个元素，也有空元素，如:```<br />```。
- HTML文档由多个元素嵌套而成，一个完整的HTML文档就是网页。
- 不闭合的元素，即省略结束标签的元素，如：```<p>我是一个元素```或```<br>```在浏览器中能够正常显示，但不符合规范。同样标签大小写均可正常显示，但W3C规范推荐小写。

### 属性
- 大部分标签元素拥有属性，属性提供了这个元素的更多信息。
- 属性总是写在元素的开始标签中。
- 属性一般以键值对出现，如：type="text"
大部分元素都拥有一下属性

属性 | 说明
---|---
id | 元素的唯一id
class | 元素的类名
style | 元素的样式
title | 元素的额外信息，显示提示

### 块级元素与内联元素
- 元素一般分为两个重要内别，块级元素和内联元素。
- 块级元素在页面中以块展示，默认情况会在其前后自动添加一个 __空行__，如：```<p> <div> <h1> <hr> <ul> <table>```等。
- 内联元素通常出现在块级元素包裹的内容中，不会另起一行，如：```<a> <img> <input> <button>```等。

### 文本格式化
HTML中含有对文本输出格式调整的标签，如：
```html
<html>
<body>
<b>这行文本是加粗</b>
<br />
<strong>这行文本是加粗强调</strong>
<br />
<em>这行文本是斜体强调</em>
<br />
<i>这行文本是斜体</i>
<br />
<big>这行文本是变大</big>
<br />
这行文本是正常
<br />
<small>这行文本是缩小</small>
<br />
这行文本包含<sub>上标</sub>
<br />
这行文本包含<sup>下标</sup>
<br />
这行文本包含<ins>插入</ins>词语和删除<del>词语</del>
</body>
</html>
```
结果：
<html>
<b>这行文本是加粗</b>
<br />
<strong>这行文本是加粗强调</strong>
<br />
<em>这行文本是斜体强调</em>
<br />
<i>这行文本是斜体</i>
<br />
<big>这行文本是变大</big>
<br />
这行文本是正常
<br />
<small>这行文本是缩小</small>
<br />
这行文本包含<sub>上标</sub>
<br />
这行文本包含<sup>下标</sup>
<br />
这行文本包含<ins>插入词语</ins>和<del>删除词语</del>
</html>

>其他的特殊格式，可以用样式 style 实现。其他计算机或引用缩写等文本格式参考[W3School文本格式化](https://www.w3school.com.cn/html/html_formatting.asp)。 

### 样式
要HTML元素有不同的显示，就需要设置样式。
样式CSS的引入方式有三种
- 外部式 如:
```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```
- 嵌入式 如：
```html
<style>
p{background-color:blue;}
//其他css代码
</style>
```
- 内联式
```html
<p style="background-color:blue;">内联样式</p>
```

### 其他
- 注释：```<!-- 这是注释，不会被浏览器解析 -->```，注意 ___条件注释___
- 空格：浏览器解析显示页面时，会将多个空格或空行合并为一个空格。确实需要多个空格时使用 ```&nbsp; &ensp; &emsp;```代替空格<kbd>space</kbd>。  



