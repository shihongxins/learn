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

### 链接
+ 通过```<a>```标签来创建链接到其他位置的链接
+ 通过```<a>```标签的 **href** 属性，链接到目标位置，可以是文档地址，也可以是某一锚点
+ 通过```<a>```标签的 **name** 属性，创建锚点。
+ 通过```<a>```标签的 **target** 属性，指定新文档的打开位置。 

目标位置 | target
---|---
新标签页 | _blank
当前页|_self
上级窗口|_parent
顶层窗口|_top
指定框架<br />(name="farmename")|farmename
  
+ ```<a href="http://www.w3school.com.cn/html/html_links.asp#tips/" target="_blank">有用的提示</a>```  
表示，在新的标签页打开http://www.w3school.com.cn/html/html_links.asp页面并定位到tips描点。
+ href 尽量补全 \\ ，否则会产生两次请求。
+ ```<a>```标签发送邮件，是在 href 属性添加相对应的值。如  
  - ```<a href="mailto:someaddress@mail.com?cc=ccadress@mail.com&bcc=bccaddress@mail.com&subject=mailsubject&body=mailbody">发送邮件链接</a>```

### 图像
通过```<img />```标签在页面中插入显示图像。  
+ 用 src="" 属性指定图像位置
+ 用 alt="" 属性作为替代文本
+ usemap="#mapid" 属性指定图像映射
>图像映射：用```<map>和<area>```标签，在图像上分区域进行传教不同区域的链接  
>```html
><map id="mapid" name="mapid">
>   <area shape="circ" coords="180,120,30" href="" alt="" target="">
></map>
>```
注：  

shape|circ|rect|poly|default
---|---|---|---|---
coords|x,y,r|x1,y1,x2,y2|x1,y1,x2,y2,...|x1,y1,x2,y2
解释|圆心坐标和半径|矩形对角坐标|三组以上点坐标|默认矩形，找不到不生效

### 表格
+ 表格边框显示，用border="1"属性
+ 空单元格会被隐藏，解决 填充 ```&nbsp;```
+ 表格标题，用```<caption>```标签
+ ```<td>与<th>```跨行和跨列,用 colspan 和 rowspan 属性
+ 内容对齐
    - 水平：align="left|center|justfy|right"
    - 垂直：valign="top|middle|baseline|bottom"  

其他样式请使用css。

## 布局
+ table布局
+ div布局
+ html5语义布局

### 其他
- 注释：```<!-- 这是注释，不会被浏览器解析 -->```，注意 ___条件注释___
- 空格：浏览器解析显示页面时，会将多个空格或空行合并为一个空格。确实需要多个空格时使用 ```&nbsp; &ensp; &emsp;```代替空格<kbd>space</kbd>。  



