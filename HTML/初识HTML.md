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
大部分元素都拥有一下属性 [全局属性](https://developer.mozilla.org/zh-CN/docs/Glossary/Global_attribute)

属性 | 说明
---|---
id | 元素的唯一id
class | 元素的类名
style | 元素的样式
title | 元素的额外信息，显示提示
lang | 元素的语言
data-* | 元素的自定义属性，可通过getAttribute('data-*')和dataset['*']获取
draggable | 元素是否可以拖动
tabindex | 元素聚焦顺序
contenteditable | 元素内容是否可以编辑，值为""\|true\|false

### 块级元素与内联元素
- 元素一般分为两个重要内别，块级元素和内联元素。
- 块级元素在页面中以块展示，默认情况会在其前后自动添加一个 __空行__，如：```<p> <div> <h1> <hr> <ul> <table>```等。
- 内联元素通常出现在块级元素包裹的内容中，不会另起一行，如：```<a> <img> <input> <button> <span>```等。

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
顶层窗口|_top
上级窗口|_parent
当前页|_self
指定框架<br />(name="framename")|framename
  
+ 在新的标签页打开 ```http://www.w3school.com.cn/html/html_links.asp``` 页面并定位到 __tips__ 描点。
    ```html
    <a href="http://www.w3school.com.cn/html/html_links.asp#tips/" target="_blank">有用的提示</a>
    ```  
+ href 尽量补全 \/ ，否则会产生两次请求。
+ ```<a>```标签发送邮件，是在 href 属性添加相对应的值。如  
  ```html
  <a href="mailto:someaddress@mail.com?cc=ccadress@mail.com&bcc=bccaddress@mail.com&subject=mailsubject&body=mailbody">发送邮件链接</a>
  ```

### 图像
通过```<img />```标签在页面中插入显示图像。  
+ 用 src="" 属性指定图像位置
+ 用 alt="" 属性作为替代文本
+ 用 srcset 与 sizes 属性实现自适应图片
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
    - content="" 指定 http-equiv 或 name 属性的值。
    - http-equiv="X-UA-Compatible" (设置IE8以后的浏览器对文档的渲染模式)，其 content="IE=Edge,chrome=1" 
    - http-equiv="content-type" ，设置文档编码(HTML 4)，其 content 值为 "text/html;charset=UTF-8"
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
+ URL 只能通过 ASCII 码传输，其余编码通过 __%号加16进制数__ 代替，空格用 __\+__ 代替

### HTML颜色
+ 颜色由红绿蓝三种颜色组合而来。
+ 由 # + 16进制 表示 或 rgb(十进制) 或 简单的英语颜色名 skyblue 表示。
+ 如 黑色 #000000 = rgb(0,0,0) ，白色 #FFFFFF = rgb(255,255,255)
+ rgb()中第四位参数 表示透明度 0 ~ 1 或 0% ~ 100% 
+ 可用颜色的地方：
    - 文本
        > color 字体色，background-color 文字背景色， text-shadow 文字阴影背景色，text-decoretion-color 文本装饰(下划线，删除线)颜色，caret-color 光标色  
    - 盒模型
        > background-color 盒模型背景色，border-color 边框颜色， outline-color 轮廓颜色  

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
datetime-local|日期时间选择器
date|日期选择器
month|月份选择器
week|年月周选择器
time|时间选择器
range|滑动范围选择控件
color|颜色选择器
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
    header,nav,main,article,section,aside,footer,figure,summary,details,progress{
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
```<progress>```|进度条，以 max 和 value 表示进度，<br />省略则为重复动画| IE 10=+
```<meter>```|进度条，用 min max low high optimum value 表示值样式，form 属性与一个form元素关联| Edge=+
```<details>```|详细信息折叠\|展示，不支持时直接显示| 不支持IE 与 Edge，引用 [polyfill](https://github.com/mfranzke/datalist-polyfill) IE 9=+ 
```<summary>```|详细信息的概要| 不支持 IE 与 Edge，引用 [polyfill](https://github.com/mfranzke/datalist-polyfill) IE 9=+ 
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
    - ```navigator.geolocation.getCurrentPosition(succFun[,errFun,opt]);```   
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
    - ```navigator.geolocation.watchPosition(succFun[,errFun,opt]);```  
    监控位置变化，不断返回位置信息。  
    参数同上，但会返回一个 __watcher__ ，便于停止监控。
    - ```navigator.geolocation.clearWatch(watcher);```  
    停止监控位置变化。  
    >注： IE 9 =+  

+ 拖放 [drag](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drag_event) API 实现元素的拖放
    - [DataTransfer](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象
    - 在进行拖放操作时，DataTransfer 对象用来保存，通过拖放动作，拖动到浏览器的数据。仅能从 drag events 的 dataTransfer 属性上获取。
    - 属性详解

   属性|解释|值
    --|--|--
    effectAllowed|1 在 dragstart 时设置源数据期望的拖动效果<br /> 2 在 dragenter 和 dragover 时设置目标期望的效果| copy,move,link,none,all(默认)等  
    dropEffect| 在 dragenter 和 dragover 时设置目标实际的效果| 值应该是 effectAllowed 的一种
    file|从本地拖动文件时，包含的文件属性列表|files[i].name等拿去文件属性
    types|保存一个被存储数据的类型列表作为第一项，顺序与被添加数据的顺序一致。有文件时默认 files | 1 text/plain (文本\|链接)<br /> 2 text/uri-list (链接) <br /> 3 text/html (HTML) <br /> 4 image/jpeg,image/png,image/gif (图片) <br /> 5 自定义

    - 方法详解  

    方法名|解释
    --|--
    obj.addElement(element);|添加要拖动的元素，一般不手动做会影响 dragend 事件  
    obj.clearData(type);|清除指定类型的拖动内容，如果为空则全部清除
    obj.getData(type);|根据类型检索数据，未找到返回空字符串''
    obj.setData(type,data);|为一个给定的类型设置数据。如果该数据类型不存在，它将添加到的末尾
    obj.setDragImage(imgElement,offsetX,offsetY);|自定义一个期望的拖动时的图片。大多数情况下，这项不用设置，因为被拖动的节点被创建成默认图片。

    - [流程简介](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)  
    1 为原元素设置可拖动属性 draggable='true'  
    2 为原元素设置 开始拖动事件 ondragstart="dragstart_handler(event)"  
    3 在开始拖动事件中设置拖动数据 event.setData()  
    4 在开始拖动事件中设置拖动反馈图像 event.setDragImage()  
    5 在开始拖动事件中设置允许的拖动效果event.dataTransfer.effectAllowed 默认全部允许  
    6 进入目标元素时，触发 dragenter 和 dragover 事件，可以在这两个事件中设置 event.preventDefault();阻止默认的不能放置事件。注：一般是 在 dragover 中阻止，在 dragenter 和 dragleave 中设置放置目标样式反馈。可以在此过程中检测 dropEffect 的值，进行约束。  
    7 松开鼠标时，执行 drop 事件，先调用 event.preventDefault() 阻止默认事件，防止拖放链接时打开，判断是否为放置目标，event.getData();获取数据，将数据放置到目标中 appendChild,innerHTML等。  
    8 完成时，调用 dragend 事件，恢复目标元素样式反馈。
>    兼容 IE 10=+

+ 本地存储 [Local Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
    - 判断是否支持 Storage
    ```javascript
        typeof(Storage)==='undefined'
    ```
    - 分为 local Storage 和 session Storage (本地，5M 左右，保存时间不同)；
    - 属性 length ，返回 保存的键值数据项的个数。
    - Storage 存储的都是 string 类型，在存入时会自动调用其 toString() 方法，防止存入对象变为 '[object Object]'，应用 JSON 转换
    - 主要方法  

    方法名|解释
    --|--
    key(index)|根据索引返回对应的键名
    getItem('key')|获取键名为key的值
    setItem('key','val')|设置或新建一条键名为key键值为val的数据
    removeItem('key')|删除一条键名为key的数据
    clear()|清空所有数据  

    - storage 发生变化时都会出发 storage 事件，可以被监听到。
>   兼容 IE 8=+

+ [Web Worker](https://www.w3school.com.cn/html/html5_webworkers.asp)
    - Web worker 是运行在后台的 JavaScript，不会影响页面的性能。
    - 检测浏览器支持```typeof(Worker) !== 'undefined'```
    - 创建 Worker 实例 。```w = new Worker("demo_workers.js");```
    - 实例的属性事件句柄  
        1   ```w.onmessage=function(e){}```当接受到传回的信息时执行，传回的数据在 e.data 里  
        2  ```w.onmessageerror=function(e){}```当执行发送错误是回调。
    - 实例的方法  
        1  ```postMessage()``` 发送消息到页面。  
        2  ```w.terminate()``` 立即停止执行。
    - 重新启用已停止的 Worker 可先将 实例 重置为 undefined
    - Web Worker 可以触发 stroage 事件
>   兼容IE 10=+

+ [HTML5 应用缓存](https://www.w3school.com.cn/html/html5_app_cache.asp)
    - 使用应用程序缓存，通过创建 cache manifest 文件，可轻松创建 web 应用的离线版本。
    - 使文档启用应用缓存，在 html 标签中设置 manifest 属性为 缓存配置文件 Manifest 路径。如：```<html manifest="/cacheSet.appcache">```  
    - Manifest 内容
        ```
            CACHE MANIFEST
            # 2012-02-21 v1.0.0
            /logo.gif
            /main.js
            
            NETWORK:
            login.asp

            FALLBACK:
            /html/ /offline.html
        ```

+ [HTTP 状态消息](https://www.w3school.com.cn/tags/html_ref_httpmessages.asp)
    - 1xx 信息  
    - 2xx 成功
    - 3xx 重定向
    - 4xx 客户端错误
    - 5xx 服务器错误

### 其他
- 注释：```<!-- 这是注释，不会被浏览器解析 -->```，注意 ___条件注释___
- 空格：浏览器解析显示页面时，会将多个空格或空行合并为一个空格。确实需要多个空格时使用 ```&nbsp; &ensp; &emsp;```代替空格<kbd>space</kbd>。  
- Doctype 不正确或未声明会导致文档以混杂模式呈现  
- 置换元素和不可置换元素  
    + 置换元素：浏览器根据标签或属性，决定元素的具体显示。如通过 ```<img>``` 标签的 ```src``` 属性，显示为一张图片；通过 ```<input>``` 的 ```type``` 属性显示 为输入框；同样的还有 ```<textarea>,<select>,<video>```等
    + 不可置换元素：浏览器不改变显示内容，直接呈现给用户，如```<label>,<span>,<p>```等
- input 中 disable 与 readonly 的区别
    + readonly=true ，元素只读无法编辑，但脚本可以更改值，能随表单提交。
    + disable=true ，元素禁用，脚本也无法更改内容，不会被表单提交。
- src 与 href 的区别
    - src 是 将指向的内容下载并嵌入文档内，如 img 和 script
    - href 是 指向资源地址，建立连接



 