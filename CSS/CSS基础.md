## 初识CSS

### 在HTML文件中引入CSS的方式
#### 外部引用  
+ 通过 ```<link>``` 元素链接到CSS文件。如：  
    ```<link rel="stylesheet" herf="default.css" type="text/css">```
+ 通过在样式文件或 ```<style>``` 元素中使用 ```@import``` 引入CSS文件。如：
    ```css
    <style>
    @import url("default.css");
    @import url(default.css);
    @import "defaule.css";
    @import url(default.css) screen and (orientation:landscape|portrait);/*条件引用，有屏幕，且规定屏幕方向*/
    </style>
    ```
    `@import`结尾必须有分号。
#### 内部样式  
+ 在 ```<head>``` 元素内，添加 ```<style>``` 元素，在其中编写当前HTML文件的样式。  
#### 内联样式  
+ 在元素的开始标签中添加 __style__ 属性，在这属性中编写这一元素的CSS样式。  

### CSS语法结构
> ![CSS语法结构](https://www.w3school.com.cn/i/ct_css_selector.gif)  
> 注：值为 0 时，除%号外，不用写单位，如'px'等。值为多个单词时需要用引号引用。  
  

### CSS选择器 [参考](https://www.w3school.com.cn/cssref/css_selectors.asp) 

+ 通用选择器: `*` 选择页面的所有元素。
+ 标签选择器:如 `div` 选择所有的 div 标签元素。
+ ID选择器: `#idString` 选择一个元素。一个页面的ID必定是唯一的，一个元素也只能有一个 ID。
+ 类选择器: `.classString` 选择一类元素。一个元素可以有多个类。
+ 属性选择器: `[attt]` 选择有这个属性的所有元素。
+ 属性值选择器: `[attr=val]` 选择有这个属性，且属性值也匹配的所有元素。
+ 属性值复杂选择器：
  - 属性值开始字符选择器: `[attr^=val]` 选择属性值以 val 字符开头的所有元素。
  - 属性值开始单词选择器: `[attr|=val]` 选择属性值以 `-` 分割的单词，val 开头的所有元素。
  - 属性值结尾字符选择器: `[attr$=val]` 选择属性值以 val 字符结尾的所有元素。
  - 属性值包含字符选择器: `[attr*=val]` 选择属性值包含 val 字符的所有元素。
  - 属性值包含单词选择器: `[attr~=val]` 选择属性值包含以 ` [space]` 分割的单词 val 的所有元素。

+ 组合选择器
  - 多元素选择器: `,` 选择符合以 `,` 分割的多个选择器的所有元素。
  - 子代选择器: `>` 选择符合前一个选择器所有直接子代(儿子)中的符合后一个选择器的元素。
  - 后代选择器: ` [space]` 选择符合前一个选择器中的所有后代(子孙)符合后一个选择器的元素。
  - 直接相邻元素选择器: `+` 选择同级(同一个父元素)中符合前一个选择器的直接相邻的符合后一个选择器的所有元素。
  - 兄弟选择器: `~` 选择同级(同一个父元素)中符合前一个选择器的所有符合后一个选择器的元素。

+ 伪类选择器
  - 静态伪类选择器 `:link` `:visited`
  - 动态伪类选择器 `:focus` `:hover` `:active`
  - 操作伪类选择器 `:checked` `:enabled` `:disabled`  `:read-only` `:read-write` `::selection`
  - 结构伪类选择器 
    1. `:first-child` `:last-child` `:only-child` `:nth-child(n)`
    2. `:first-of-type` `:last-of-type` `:only-of-type`  `:nth-of-type(n)`
    3. `:root` `:not()` `:empty` `:target`

### CSS样式应用规则
+ 继承：子元素可以从父元素继承部分样式。如 字体外观 都能继承，而 盒框模型 都不能继承。
+ 层叠：就近原则，同一元素的同一属性声明，离元素越近的会覆盖离元素远的值。
+ 权重：!important > 内联 > id > class > 伪类 > 标签 > 通用 `*` > 默认  。最后属性生效的值是取权重最高的，如果权重一样，参考就近原则。

### CSS的值
+ 类别：[number] [length] [keywords] [function] [expression] [color]
+ 单位：
  - 相对长度单位：px em rem ex
  - 相对视口单位：vw vh vmin vmax

### 背景样式[background]
+ CSS2
  - background-color:[color];
  - background-img:url();
    + 多个背景图用分号;隔开
  - background-repeat:no-repeat|repeat-x|repeat-y|repeat|space|round;
    + 两个值表示 水平 垂直
    + 多个背景图用分号;隔开
  - background-position:[keyword]top|right|bottom|left|center|[number]|[length]
    + 多个背景图用逗号,隔开
  - background-attachment:scroll|fixed|local
    + 多个背景图用逗号,隔开
+ CSS3
  - background-clip:border-box|padding-box|content-box|text;
  - background-origin:border-box|padding-box|content-box;
    + 背景左上角绘制起点
  - background-size:[keyword]auto|contain|cover|[number]|[length]
    + 两个值时表示 水平 垂直
  
### 字体[font]
+ 类别：Serif 衬线体，Sans-Serif 无衬线体，Monospace 等宽体，Cursive 手写体，Fantasy 艺术体
+ font-family:Times,Georgia,'Segoe UI','\5FAE\8F6F\96C5\9ED1';
  - 设置备选字体用逗号,隔开
  - 多单词字体用单引号'引起
  - 中文字体名可用unicode编码,`escape()`
+ font-style:normal|italic|oblique
  - italic和oblique都是斜体区别是，italic是用该字体的斜体版，oblique是将字体倾斜(即使没有斜体版)
+ font-size:[length]
  - IE8不支持em
+ font-weight:normal|lighter|light|bold|bolder

### 列表[ul,ol,dl]
+ list-style-type:disc|circle|square|decimal|...[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)
+ list-style-image:none|url();
+ list-style-position:outside|inside;
+ list-style:list-style-type|list-style-image|list-style-position;

### 表格[table]
+ caption-side:top|bomtton;
+ table-layout:auto|fixed;
  - 表格宽度计算方法，auto按内容，fixed按第一行。
+ border-spacing:[length]|[length] [length];
  - 两个值时表示水平 垂直；
+ empty-cells:hide|show;
+ border-collapse:separete|collapse;
  - 当 `border-collapse:collapse;` 时此属性会覆盖 border-spacing,效果同 0;empty-cells,效果同 show;border-radius,效果同none;

### 文本[text]
+ 自身样式
  - color:[color];
  - text-transform:none|capitalize|uppercase|lowercase;
  - text-derection-line:overline|line-through|underline;
  - text-derection-color:[color];
  - text-derection-style:solid|dotted|wavy;
  - text-decretion:text-derection-line|text-derection-color|text-derection-style;
    + 三色一线一样
  - text-shadow:x y blur color;
    + 多个阴影用,隔开；
+ 段落布局
  - text-indent:[length];首行缩进
  - letter-spacing:[length];字符间距
  - word-spacing:[length];词间距
  - line-height:[length]|[number];行高,[number]类型时为font-size的倍数,推荐 1.5-2;
  - text-algin:start|left|center|justify|right|end;文本水平对齐;
  - derection:ltr|rtl;文本水平(对其)方向
  - writing-mode:horizontal-tb|vertical-lr|vertical-rl;多行文本书写方向;
  - white-space:pre|pre-wrap|pre-line|nowrap|normal;处理空白符与换行制表符;
  - text-overflow:clip|ellipsis;不换行时溢出处理;
  - word-wrap|overflow-wrap:normal|break-word|anywhere;长不可分割单词强制折断处理;
  - word-break:normal|break-all|keep-all|break-word;
    + normal CJK折行,非CJK长单词溢出
    + break-all 全部折断
    + keep-all 全部不折断包括CJK
    + break-word CJK折行，非CJK长单词折行,等效于 word-break:normal;overflow-wrap:break-word;
  - line-break:auto|loose|normal|strict|anywhere;