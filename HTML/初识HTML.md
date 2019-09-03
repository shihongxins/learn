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
<i>这行文本是斜体</i>
<br />
<em>这行文本是斜体强调</em>
<br />
<big>这行文本是变大</big>
<br />
这行文本是正常
<br />
<small>这行文本是缩小</small>
<br />
这行文本包含<sup>上标</sup>
<br />
这行文本包含<sub>下标</sub>
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
<i>这行文本是斜体</i>
<br />
<em>这行文本是斜体强调</em>
<br />
<big>这行文本是变大</big>
<br />
这行文本是正常
<br />
<small>这行文本是缩小</small>
<br />
这行文本包含<sup>上标</sup>
<br />
这行文本包含<sub>下标</sub>
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
/*其他css代码*/
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
指定框架<br />(name="framename")|framename
  
+ ```<a href="http://www.w3school.com.cn/html/html_links.asp#tips/" target="_blank">有用的提示</a>```  
表示，在新的标签页打开 ```http://www.w3school.com.cn/html/html_links.asp``` 页面并定位到 __tips__ 描点。
+ href 尽量补全 \/ ，否则会产生两次请求。
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

### HTML框架
+ ```<frameset>``` 框架集，定义框架集合，且不能与 ```<body>```标签共存，除非设置了```<noframes>```，cols 与 rows 属性分别设置了内部多个框架```<frame>```的占据面积。
+ ```<frame>```框架，依赖于```<frameset>```框架集，用于链接网页文档，src 属性为链接地址，name 属性可用于设置为```<a>```标签的打开目标 target ，noresize = "true|false" 设置是否可调整大小。
+ ```<iframe>```内联框架，用于直接在文档任意位置插入其他文档，
src 属性为链接地址，frameborder='0' 设置不显示边框 ，name 属性设置 ```<a>```标签的打开目标 target 。

### HTML脚本
+ ```<script>```标签插入一段脚本，具体参见 [javascript MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)。
+ ```<noscript>```插入在不支持脚本的浏览器上显示的文字提示。

### 路径
+ 相对路径：目标的路径是相对于当前文档的位置。
    - ```'/'```根目录；
    - ```'./'```当前目录；
    - ```'../'```上层目录；
+ 决定路径：目标的具体位置。

### HTML头部
+ ```<head>```头部标签中可使用的标签有 ```<title>,<base />,<meta />,<script>,<link />,<style>```。
+ ```<base>```用于指定一个文档内的相对 url 的基准根 url，和新文档打开的位置，分别用 href 和 target 实现。
+ ```<meta>```用于表示其他头部标签不能表示的元数据信息。主要有：
    - charset="UTF-8" 设置页面编码(HTML 5)，注意要与文档保存编码一致。
    - http-equiv="content-type" ，设置文档编码(HTML 4)，其 content 值为 "text/html;charset=UTF-8"
    - content="" 指定 http-equiv 或 name 属性的值。
    - http-equiv="content-security-policy"内容安全策略?
    - http-equiv="default-style"，默认样式， 它的 content 的值等于 ```<link>或<style>```的 name 的值。
    - http-equiv="refresh" ，刷新页面 ，它的 content 值为正整数或新地址，表示 几秒之后刷新页面或转到新地址。
    - name="description|keywords"等，描述网页信息，便于搜索引擎查询(SEO)
    - name="viewport" ，移动端初始视口大小控制。  

    键|值|描述  
    ---|---|---    
    width | px或者"device-width" | 视口宽度
    height | px或者"device-height" | 视口高度
    initial-scale | 0.0 ~ 10.0 | 初始设备宽度与视口的缩放比例
    minimum-scale | 0.0 ~ 10.0 | 最小缩放
    maximum-scale | 0.0 ~ 10.0 | 最大缩放
    user-scalable | "yes"\|"no" | 是否允许用户手动缩放

### HTML字符实体
+ HTML中的预留符号必须用实体表示，如 \> \< 符号可能被解析为标签，影响显示，应使用 ```&gt;``` ```&lt;```表示。
+ 多个空格会被解析为一个，应使用 ```&nbsp;```表示。

### HTML URL
+ URL 即 统一资源定位器 。
+ scheme://host.domain:port/path/filename
+ 协议://主机.域名:端口号/路径/文件
+ URL 只能通过 ASCII 码传输，其余编码通过 __%号 加 16进制数__ 代替，空格用 __\+__ 代替

### HTML颜色
+ 颜色由红绿蓝三种颜色组合而来。
+ 由 # + 16进制 表示 或 rgb(十进制) 或 简单的英语颜色名 skyblue 表示。
+ 如 黑色 #000000 = rgb(0,0,0) ，白色 #FFFFFF = rgb(255,255,255)
+ rgb()中第四位参数 表示透明度 0 ~ 1 或 0% ~ 100% 
+ 可用颜色的地方：
> 文本
>> color 字体色，background-color 文字背景色， text-shadow 文字阴影背景色，text-decoretion-color 文本装饰(下划线，删除线)颜色，caret-color 光标色  

> 盒模型
>> background-color 盒模型背景色，border-color 边框颜色，
outline-color 轮廓颜色  

### [文档声明<!DOCTYPE>](https://www.w3school.com.cn/tags/tag_doctype.asp)
+ 大类别 HTML 5 ，HTML 4.01 ，XHTML 1.0
+ 小类 HTML 4.01 和 XHTML 1.0 又分为 Strict,Transitional,Frameset

### FORM表单
注意的标签：
+ 用```<fieldset>``` 组合表单相关控件，```<legend>```为组合标题。  
+ HTML 5新表单元素 ```<datalist>```和```<output>```
    - ```<datalist>``` 类似于 ```<select>``` ，用```<option>```给```<input>```提供可选值，两者的关联是 ```<input>```的 __list__ 属性 等于 ```<datalist>```的 __id__ 。IE 10=+ (其他不兼容的先引用 [polyfill](https://github.com/mfranzke/datalist-polyfill) IE 9=+ )
    - ```<output>```用处不大，见 [例子](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/output#Example)

常用属性：
+ accept-charset ，提交的字符集，默认页面。
+ autocomplete ，on | off ，自动填充值，默认 on 。IE 不支持(HTML5)
+ enctype ，提交时的编码，application/x-www-form-urlencoded (默认) | multipart/form-data (上传文件) | text/plain (HTML5)
+ name ，识别表单```document.forms.name```
+ novalidate ， true | false ，不验证表单 (input 的 pattern 不生效)(HTML5)

HTML5 新输入类型(不支持的直接显示文本框text)：  

类型 | 解释
---|---
color|颜色选择器
date|日期选择器
datetime-local|日期时间选择器
month|月份选择器
week|年月周选择器
time|时间选择器
range|滑动范围选择控件
number|数字输入验证
email|邮箱验证输入
url|网站输入验证
tel|电话输入验证
search|搜索字段


HTML5 新增输入限制(属性)  

限制|解释
--|--
maxlength|输入最大字符数
size|可见最大字符数(最好用 width 控制)
max|最大值
min|最小值
pattern|正则验证规则
step|值的跨步间隔
required|是否必填
list|建议可选项```<datalist>```
multiple|file或email可多选
placeholder|空值时提示内容 IE 10=+
autofocus|自动对焦(true\|false)
autocomplete|自动填充(on\|off)
form*|对```<form>```表单的属性覆盖等

注：HTML5 表单输入参见 https://www.w3school.com.cn/html/html_form_attributes.asp  

### HTML 5
+ 声明 ```<!DOCTYPE html>```
+ 旧浏览器支持语义标签，且显示为块级元素。  
    ```html
    header,nav,main,article,section,aside,footer,figure,summary,details,process{
        display:block;
    }
    ```
+ 引入对 __IE浏览器__ 可自定义标签样式更改的脚本
    ```html
    <!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>
    <![endif]-->

    <!-- 如果你使用的标签少的话可以直接用手动创建而不用引入上述文件 -->
    <!--[if lt IE 9]>
    <script>
        document.createElement('header');
        document.createElement('nav');
        document.createElement('section');
        document.createElement('aside');
        document.createElement('footer');
    </script>
    <![endif]-->
    ```
    注：  
        以上 css 和 script 应在头部使用    
        [CDN加速](https://www.bootcdn.cn/)  
        了解 [modernizr](https://modernizr.com/)  

### HTML 5 新增元素(需要注意的)

元素标签|解释|兼容性
--|--|--
```<figure>```|组合一段内容为引用单元，<br/>图片，代码块，表格等。| IE 9=+
```<figcaption>```|```<figure>```组合的说明/标题| IE 9=+
```<process>```|进度条，以 max 和 value 表示进度，<br />省略则为重复动画| IE 10=+
```<details>```|详细信息折叠\|展示，不支持时直接显示| 不支持IE 与 Edge
```<summary>```|详细信息的概要| 不支持 IE 与 Edge
```<mark>```|高亮文本，表示关联系，重要性请用```<strong>```| IE 9=+
```<dialog> ```|对话框，以 open="true\|false" 展示或隐藏|原兼容性不佳，但有相对应的 [Polyfill](https://github.com/GoogleChrome/dialog-polyfill) 很不错 IE 9=+
```<canvas>```|图像绘制|IE 9=+
```<svg>```| 图像绘制 | ???
```<embed>```|嵌入内容到文档中，该内容由其他程序提供实现，如浏览器插件。| 不支持IE
```<object>```|引入外部资源到页面内，常与```<param>```标签定义| 仅 IE  
```<param>```|定义```<object>```的参数，主要属性 name(参数名)，value(参数值)，type(MIME类型)| 仅 IE
```<source>```|为```<picture>```,```<audio>```,```<video>```指定资源地址，主要属性 src 和 type | IE 9=+
```<audio>```|在文档中引入音频内容，由 src 属性或者 ```<source>```标签指定内容链接地址，详见 [\<audio\>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)| IE 9=+  
```<video>```|在文档内嵌入媒体播放器，由 src 属性或者 ```<source>```标签指定链接地址，详见 [\<video\>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) | IE 9=+  
> 注：上述多媒体标签中，一般使用时为了兼容低浏览器会采用 ```HTML 5 + <object> + <embed> ``` 方式实现。

### HTML 5 新API  
+ 地理位置 [Geolocation](https://www.w3school.com.cn/html/html5_geolocation.asp) API 用于获得用户的地理位置。
    - 检测是否支持 navigator.geolocation
    - navigator.geolocation.getCurrentPosition(succFun[,errFun,opt]);   
    获取当前地理位置，参数为方法句柄和配置对象。  
    定位成功，succFun(position)方法接受一个 __coordinates__ 对象，其属性包括经纬度，海拔，精度，速度，方向等。  
    定位失败，errFun(error)方法接收一个错误信息对象，包括用户拒绝，无法定位，超时，未知等错误状态。  
    opt对象为
    ```javascript
        var opt = {
            enableHighAccuracy:true,//IP的精确定位
            timeout:60000,//超时时间
            maximumAge:10000//位置缓存时间
        }
    ```
    - navigator.geolocation.watchPosition(succFun[,errFun,opt]);  
    监控位置变化，不断返回位置信息。  
    参数同上，但会返回一个 __watchID__ ，便于停止监控。
    - navigator.geolocation.clearWatch(watchID);  
    停止监控位置变化。  
    >注： IE 9 =+
+ 拖放 [drag](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drag_event) API 实现元素的拖放

+ 本地存储 [Local Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)



### 其他
- 注释：```<!-- 这是注释，不会被浏览器解析 -->```，注意 ___条件注释___
- 空格：浏览器解析显示页面时，会将多个空格或空行合并为一个空格。确实需要多个空格时使用 ```&nbsp; &ensp; &emsp;```代替空格<kbd>space</kbd>。  



 