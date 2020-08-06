## CSS进阶

### 浮动[float]
#### 使用情况
> 当某区域排版不是上下排列，而是左右排列时，就可能用到浮动。
#### 特点
+ 一个元素设置浮动后呈现类似 `inline-block` 的特性，即未设置宽度时宽度自动收缩，包裹内容(inline)，又能设置 宽高、边距和居中等(block)。
+ 当一个元素设置浮动后他会向左或向右移动，直到其外边碰到另一个浮动元素或包含块边缘，如果浮动时水平空间不够放置，则先向下移动，然后上边缘贴着 **前一个结构元素的下边缘**  继续平移移动(理解第一个特性)，直到空间适合或该水平无浮动元素(这样也放不下就溢出);
+ 浮动换行时，前一行元素高度不一致可能会卡住。
+ 文档中一个普通块元素遇见一个浮动元素，普通块元素不会发现浮动元素(普通块元素被覆盖遮挡)，普通块元素中的文本会发现浮动元素(文字不会被覆盖，而会围绕浮动元素排列)。
+ 浮动元素脱离了普通流，父元素在计算高度时不会发现浮动元素，即父元素高度不会被浮动元素撑开。 **与 `absolute` 的区别在于不重合** 。
#### 用途
+ 两栏布局
  - 思考：内容栏为什么要设置外边距。
+ 三栏布局
  - 思考：三栏布局时，中间内容栏在文档结构的位置。
+ 横向导航条
  - 思考：`float:left|right` 横向布局元素与 `display:inline-block` 横向布局元素的异同利弊和解决办法。
+ 水平布局时方法选用的情况
  - `display:inline-block` ：适合子元素内容不多时的水平布局，居中简单，不需要清除浮动。但要注意间隙与垂直对齐。
  - `float` ：适合大型布局，无间隙问题。但会有父元素高度塌陷，后续不浮动元素布局位置变化，居中设置不便等问题。
#### 清除浮动
+ 浮动产生的问题
  - 对后面的块元素产生问题：后面的普通块元素不会发现前面的已浮动的元素(普通块元素被覆盖遮挡)，而普通块元素中的文本会发现前面浮动元素(文字不会被覆盖，而会围绕浮动元素排列)。
  - 对父元素的高度及父元素后面元素布局产生的问题：浮动元素脱离了文档流，父元素不会发现内部的浮动元素，在计算高度时，父元素的高度不会被浮动元素撑开，如果父元素内没有其他文本或非浮动元素，则会造成 **父元素高度塌陷** 。则影响到后面元素的布局位置。
+ 如何清除浮动
  - 父元素内最后添加结构块级元素，设置此元素样式为不浮动 `float:none;clear:both;` 。
  - 父元素内追加伪元素 `:after` ，设置此元素样式为块级不浮动 `content:'';display:block;float:none;clear:both;` 。
  - 父元素触发 BFC `overflow:hidden;overflow:auto;overflow:scroll;zoom:1;` 。
  - 总结通用：
    + 利用 **clear** 属性，父元素设置类，然后给类末尾追加伪元素，设置伪元素为块级不浮动  
    ```css
      .clearfix:after{
        content:'';
        display:block;
        float:none;
        clear:both;
      }
    ```
    + 利用 **overflow** 属性，父元素设置 overflow 属性，触发BFC，兼容 IE 还要设置 zoom 属性
    ```css
      .clearfix{
        overflow:auto;
        zoom:1;
      }
    ```
### 定位[position]与 BFC
#### 定位定义与类型
> 定位就是通过设置 `position` 属性改变元素在文档中的定位方式，使其 **脱离正常的文档流** ，然后通过 `top right bottom left` 等属性来设置具体位置。主要分为 **相对定位** ，**绝对定位** ，**固定定位** ，**粘性定位** 。设置了定位属性(除默认的 `static` )的元素叫 **定位元素** 。默认值 `static` 的元素叫非定位元素，其 `top right bottom left z-index` 等属性值无效。
#### 相对定位
> 相对定位 `position:relative;` 是相对于 **元素自身** 原本在文档中位置进行偏移。
+ 特点：视觉上的偏移，但实际还占据原文档中的位置，后面的元素位置不会变化。
+ 注意：相对定位对表格内结构元素(`table-*-group, table-row, table-column, table-cell, table-caption`) 无效。
#### 绝对定位
> 绝对定位 `position:absolute;` 是相对于 **先祖定位元素(找不到则为 `body`)** 的位置进行偏移。
+ 特点：脱离正常普通文档流，不占据原有位置，后面元素前移；且外边距(`margin`)不与其他合并。
+ 注意：绝对定位与浮动不同，绝对定位在偏移量重合时元素会 **层叠覆盖** 要设置他们的显示顺序需要设置 **层叠顺序** `z-index` 属性。
+ 层叠顺序 `z-index`
  - 层叠顺序主要用于解决 定位元素 的层叠覆盖问题。**非定位元素** 设置层叠顺序 `z-index` 无效。
  - 层叠顺序值不同：
    + 同级(参考元素相同)定位元素，`z-index` 值越大，离视口越近。
    + 不同级(参考元素不同)定位元素，父级定位元素的 `z-index` 越大，父级定位整体离视口越近。
  - 层叠顺序值相同：
    + 如果两个元素都没有定位(则位置不会重叠)或者两者都为定位元素且层叠顺序相同，则按照文档结构顺序，后面的覆盖前面的。
    + 如果两个元素一个定位一个没有定位，且都没有设置 层叠顺序 则定位元素覆盖非定位元素。
  - 父子元素的层叠顺序：
    + 如果父元素设置了层叠顺序且有效，那么子元素无论是否设置是否有效都会和父元素一致，且显示在父元素前面。
    + 如果父元素没有设置层叠顺序或设置无效，那么子元素的顺序看自身。
#### 固定定位
> 固定定位 `position:fixed;` 是相对于 **视口(viewport)** 进行位置的偏移。
+ 特点：脱离正常普通文档流，不占据原有位置，后面元素前移；且外边距(`margin`)不与其他合并。容器(一般是窗口)滚动时，元素的位置不会发生改变。如 返回顶部 按钮。
+ 注意：
  - 打印时，固定定位元素会出现在每页的相同位置。
  - 当固定定位元素的某先祖的 `transform`, `perspective` 或 `filter` 属性非 `none` 时， **容器由视口改为该祖先** 。
#### 粘性定位
> 粘性定位 `position:sticky;` 可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。
+ 特点：元素根据正常文档流进行定位，然后相对它的最近滚动祖先的位置进行偏移。该值总是创建一个新的[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)。
+ 注意：一个sticky元素会“固定”在离它最近的一个拥有“ **滚动机制** ”的祖先上（当该祖先的 `overflow:hidden|scroll|auto|overlay;` 时），即便这个祖先不是最近的真实可滚动祖先。
#### top bottom left right 的理解
> `top bottom left right` 的定位效果取决于定位元素自身的 `position` 和 值类型 `[length][percentage][keyword]` 。
+ `top`
  - `top:[length]`
    + `position:absolute;` 理解为定位元素的上外边距(`margin-top` 外部)相对于包含块上内边框(`border-top` 内部)的偏移。
    + `position:relative;` 理解为定位元素的上外边距(`margin-top` 外部)相对于本身正常位置的上外边距(`margin-top` 外部)的偏移。
  - `top:[percentage]` 理解为定位元素的上外边距(`margin-top` 外部)相对于包含块内边框(`border` 内部)高度的偏移。
  - `top:auto;` 则表示元素的偏移参考 `bottom` 。
+ `bottom`
  - `bottom:[length]`
    + `position:absolute;` 理解为定位元素的下外边距(`margin-bottom` 外部)相对于包含块下内边框(`border-bottom` 内部)的偏移。
    + `position:relative;` 理解为定位元素的下外边距(`margin-bottom` 外部)相对于本身正常位置的下外边距(`margin-bottom` 外部)的偏移。
  - `bottom:[percentage]` 理解为定位元素的下外边距(`margin-bottom` 外部)相对于包含块内边框(`border` 内部)高度的偏移。
  - `bottom:auto;` 则表示元素的偏移参考 `top` 。
+ `left`
  - `left:[length]`
    + `position:absolute;` 理解为定位元素的左外边距相对于包含块左内边框的偏移。
    + `position:relative;` 理解为定位元素的左外边距相对于本身正常位置的左外边距的偏移。
  - `left:[percentage]` 理解为定位元素的左外边距相对于包含块内边框宽度的百分比。
  - `left:auto;` 则表示元素的偏移参考 `right` 。
+ `right`
  - `right:[length]`
    + `position:absolute;` 理解为定位元素的右外边距相对于包含块右内边框的偏移。
    + `position:relative;` 理解为定位元素的右外边距相对于本身正常位置的右外边距的偏移。
  - `right:[percentage]` 理解为定位元素的右外边距相对于包含块内边框宽度的百分比。
  - `right:auto;` 则表示元素的偏移参考 `left` 。
+ 同时指定的情况
  - `top bottom` 同时指定为 `[length]` 时
    + 如果定位元素的高 `height` 未指定或为 `auto` ，则 `top bottom` 都会生效，高度会充满包含块。
    + 如果高度固定，则 `top` 生效， `bottom` 无效。
  - `top bottom` 同时为 `auto` 时，垂直方向不发生偏移。
  - `left right` 同时指定为 `[length]` 时
    + 如果定位元素的高 `width` 未指定或为 `auto` ，则 `left right` 都会生效，宽度会充满包含块。
    + 如果高度固定，则参考容器是从左往右还是从右往左。
  - `left right` 同时为 `auto` 时，水平方向不发生偏移。
#### inline-block，浮动[float]，定位[position] 的选用情况
+ `display:inline-block` ：适合子元素内容不多时的水平布局，居中简单，不需要清除浮动。但要注意间隙与垂直对齐。
+ 浮动[`float`] ：适合大型布局或自适应，和响应式结合较多，无间隙问题。但会有父元素高度塌陷，后续不浮动元素布局位置变化，居中设置不便等问题。
+ 定位[`position`] ：适合定宽高的小元素，如一些 icon,popup 回到顶部等。
#### CSS进阶-实战一：[导航栏 navbar](https://jsbin.com/xupeduq/edit?html,css,output)
#### BFC 定义
> 正常流文档中，盒子要么属于块级格式化上下文，要么属于内联格式化上下文。格式化上下文[formatting context]为渲染区，它规定了内部的子元素的定位方式和与其他元素的关系及相互作用。BFC是一个 **独立的渲染区域** 只有 块级盒子[block-level box] 参与，它规定了 **内部** 块级盒子如何布局，且与外部无关。
+ 只有 **块元素`display:block|table|list-item`** 能产生 BFC 。
+ 如何触发产生 BFC
  - 设置浮动 `float` 不等于 `none`
  - 设置定位 `position:absolute|fixed`
  - 设置盒子类型 `display:inline-block|table-cells|flex|inline-flex`
  - 设置溢出 `overflow` 不为 `visible`
+ BFC 的特点
  - BFC 中，内部块级盒子独占一行垂直排列。
  - 同一个 BFC 中，内部相邻块级盒子上下边距会合并。
  - BFC 中，内部块级盒子的左外边距与包含块(BFC 块)的左边(取决于包含块的`position`)接触，对于从右往左的布局相反。即便是内部块级盒子浮动也是如此。
  - BFC 的区域不会与 浮动元素 产生交集，能发现浮动元素，并紧贴浮动元素的边缘。
  - BFC 计算高度时，内部的浮动元素高度也计算在内。
  - BFC 是页面上一个独立的渲染区，内部的元素不会影响外部的元素，反之如此。
+ BFC 的作用
  - 清除内部浮动。特点5
  - 防止外边距合并。特点2，特点3，让不想合并的元素分开为不同的 BFC
  - 制作自适应零缝隙两栏布局。`float:left`和`margin-left`制作的自适应两栏布局可能会产生缝隙，或者精确计算不产生缝隙，运用 BFC 可直接产生零缝隙。特点3，特点4

### 伪元素
> 创建的一些不在文档结构中的元素。并能为其添加额外的样式。常用的有 `:first-line;``:first-letter;``:after;``:before;``::placeholder``::selection` 等。
+ `:before;` 是在元素内部创建一个 **行内元素** 作为第一个子元素； `:after;` 是在元素内部创建一个 **行内元素** 作为最后一个子元素。用他们的目的是为了节省标签，且他们必须存在 `content` 属性。
+ 伪元素的作用
  - 清除浮动
  - 代替标签，制作小图标等
#### CSS进阶-实战二：[会话小三角 bubble](https://jsbin.com/leviyep/edit?html,css,output)

### 盒子居中
#### 水平居中
+ 行内元素：在父元素设置 `text-align:center;` 就可以使行内元素水平居中。
+ 块级元素
  - 固定宽度
    + 本身设置 `margin: 0 auto;` (主要是设置左右外边距为auto)。
    + 本身设置 `position:absolute;left:50%;margin-left:-50%;` (父相子绝定位中，主要是通过左上角定位后，再用负边距移动)
    + 本身设置 `position:absolute;left:0;right:0;margin:0 auto;` (父相子绝定位中，子元素水平居中常用)
  - 不定宽度
    + 本身设置 `position:absolute;left:50%;transform:translateX(-50%);` (父相子绝定位中，用 transform 将元素移动)
#### 垂直居中
+ 行内元素
  - 父元素不定高
    + 父元素设置 `padding` ，父元素高度由内容撑开，实现垂直居中。
  - 父元素定高
    + 单行文本：父元素设置 `line-height:height;` 
    + 单行替换元素：父元素添加 伪元素 `:after` 并设置 `content:'';display:inline-block;height:100%;vertical-align:middle;` ，替换元素设置 `vertical-align:middle;`
    + 多行文本：父元素设置 `writing-mode:vertical-lr;text-align:center;` 中间元素改回 `display:inline-block;writing-mode:horizontal-tb;width:100%;` (原理是 `writing-mode` 不但更改文字的显示方向，也影响该方向上的 css 属性；中间元素设置 `display:inline-block` 是为了响应最外层的 `writing-mode` 和 `text-align` **使中间层垂直居中** ，然后中间层改回 `writing-mode` 并设置 `width` 充满父元素，使文本 **水平居中** )
+ 块级元素
  - 固定高度
    + 本身设置 `position:absolute;top:50%;margin-top:-50%;` (父相子绝定位中，主要是通过左上角定位后，再用负边距移动)
    + 本身设置 `position:absolute;top:0;bottom:0;margin:auto 0;` (父相子绝定位中，子元素水平居中常用)
  - 不定高度
    + 本身设置 `position:absolute;top:50%;transform:translateY(-50%)` (父相子绝定位中，用 transform 将元素移动)
+ 其他方式
  - `display:table-cell`
  - `display:flex`
  - `display:grid`
+ 总结

方法|父元素宽高固定|居中元素宽高固定|PC兼容|移动兼容|缺点
--|--|--|--|--|--
`padding` 撑开|否|否|ALL|ALL
`line-height:height;`|是|是(单行)|IE6+|ALL
伪元素`:after`|是|是(单行)|IE7+|ALL
`writing-mode`|是|否|IE6+|ALL
`absolute` 负 `margin`|否|是|IE6+|ALL|父元素放不下出现滚动条
`absolute` `margin:auto`|否|是|IE6+|ALL|父元素放不下直接截断
`absolute` `transform`|否|是|IE9+|ALL|Chrome下宽度为奇数时文字模糊，输入框自带边框消失
`table-cell`|是|否|IE8+|ALL
`flex`|否|否|IE10+|ALL
`grid`|否|否|IE10+|安卓6+ iOS 10.3+

### 常用的布局
#### CSS进阶-实战三：[单列非通栏布局](https://jsbin.com/lovojov/edit?html,css,output)
> 布局时 `width` 与 `max-width` 的区别： `width` 在屏幕变小时，会出现滚动条，但内部内容布局不会改变。 `max-width` 在屏幕变小时，会按照屏幕大小调整布局显示内容，虽然不会出现滚动条，但已经打乱了内部布局，所以推荐使用 `width` 。
#### CSS进阶-实战四：[单列通栏布局](https://jsbin.com/wegiqug/edit?html,css,output)
> TODO，什么叫背景色滚动 bug ，与 body 设置 `min-width` 有什么关系？  
Ans:由于 首部 和 尾部 的 容器是 没有设置宽度，是自适应的。那么当屏幕缩小到比 内容 还窄时，窗口按 内容 宽度出现 滚动条，而 首部 和 尾部 由于容器自适应，不会出现滚动条而隐藏。造成 内容区背景色 宽于 首部和尾部。而给 body 设置 `min-width` 等于 内容的 `width` 后，则滚动条会按照 body 出现，且不隐藏 首部和尾部。
#### CSS进阶-实战五：[双列布局 float](https://jsbin.com/podivob/edit?html,css,output)
> 注意 float,margin-left 和 清除浮动。
#### CSS进阶-实战六：[双列布局 BFC](https://jsbin.com/mafahos/edit?html,css,output)
> 注意触发BFC的方式
#### CSS进阶-实战七：[三列布局](https://jsbin.com/saheney/edit?html,css,output)
> 注意 content 的文档结构顺序。
#### CSS进阶-实战八：[卡片水平等距布局](https://jsbin.com/wujalux/edit?html,css,output)
> 注意 负边距 的使用。子项每一个卡片 `li` 都设置了 左边距 `margin-left:75px;` ，然后 水平方向布局 75+150+75+150+75+150=675>600 故放不下三个，第三个只能换行，而给 子项卡片容器 `ul` 设置了 左边距 为负值 `margin-left:-75px;` 后，由于没有 `padding border` 水平方向 `ul` 与 每一行第一个子项卡片 `li` 两边据合并 75-75=0，后水平方向就能放下了。同理垂直方向也是如此。

### 媒体查询
#### 语法
+ CSS中 `@media [keyword][condition]{ [CSS Rule] }` 即在 `@media` 后跟 **设备关键字** 或 **其他条件** 然后 在里面写 **CSS声明规则** 。
+ HTML `<link>` 属性中 `media="[keyword][condition]"` 以按照媒体查询条件引入样式。
#### 扩展
+ `[keyword]` 设备关键字扩展
  - `all` 所有设备；
  - `handheld` 手持设备；
  - `secreen` 显示屏设备；
  - `print` 打印机设备；
  - `projection` 投影设备；
+ `[condition]` 条件扩展
  - `width`：浏览器宽度
  - `height`：浏览器高度
  - `device-width`：设备屏幕分辨率的宽度值
  - `device-height`：设备屏幕分辨率的高度值
  - `orientation`：浏览器窗口的方向纵向还是横向，当窗口的高度值大于等于宽度时该特性值为 portrait，否则为 landscape。
  - `aspect-ratio`：比例值，浏览器的纵横比。
  - `device-aspect-ratio`：比例值，屏幕的纵横比。
  - `color`：设备使用多少位的颜色值，如果不是彩色设备，值为 0。
  - `color-index`：色彩表的色彩数
  - `monochrome`：单色帧缓冲器每个像素的字节
  - `resolution`：分辨率值，设备分辨率值。
  - `scan`：电视机类型设备扫描方式，progressive 或 interlace。
  - `grid`：只能指定两个值 0 或 1，是否基于栅格的设备。
#### CSS进阶-实战九：[媒体查询](https://jsbin.com/tepefel/edit?html,css,output)

### CSS浏览器兼容
#### 兼容等级
+ A级兼容(Chrome,FireFox,IE9=+):完美实现设计稿。
+ B级兼容(IE=8):能用且差距不大。
+ C级兼容(IE7=-):能用(现在应该不用管了)。
#### 处理思路
+ 渐进增强：先实现基本功能，保证在低版本浏览器下也能使用后，在对高版本浏览器进行样式，效果，交互或功能的追加。
+ 优雅降级：先完美实现设计稿及功能，然后对低版本不兼容的问题进行处理。
+ 判断条件：从产品的受众，浏览器的份额，投入成本，功能与效果的重要度等方面进行判断。
#### 处理办法
+ CSS Hack
  - 参考网站： [Browserhacks](http://browserhacks.com/) 不仅仅只有CSS 还有 JavaScript 的 Hack 技巧;
  - eg:
```css
div{
  color:red; /**normal*/
  _color:blue; /**IE6*/
  *color:blue; /**IE6 7*/
  color:blue\9; /**IE6~IE8*/
}
/**IE6~IE8*/
@media \0screen\,screen\9{
  div{
    color:red;
  }
}
```
+ IE条件注释
  - 适用于IE9级以下，IE10不支持。
  - eg:
```html
  <!--[if IE]> IE9=- <![endif]-->
  <!--[if IE 6]> IE6 <![endif]-->
  <!--[if lt IE 7]> IE7- <![endif]-->
  <!--[if lte IE 7]> IE7=- <![endif]-->
  <!--[if gt IE 8]> IE8+ <![endif]-->
  <!--[if gte IE 8]> IE8=+ <![endif]-->
  <!--[if (IE 6)/(IE 7)]> IE6 OR IE7 <![endif]-->
  <!--[if !IE]><!--> NOT IE <!--<![endif]-->
```
+ 使用一些类库时要注意兼容性
  - Bootstrap RQ IE8=+
  - Jquery 1.x RQ IE6=+
  - Jquery 2.x RQ IE9=+
  - Vue 2.x RQ IE9=+
+ 常用属性的兼容情况
  - 参考 [Can I use](https://caniuse.com/) 基本上所有的 HTML(5) 、 CSS(3) 和 JS 的语法兼容性都能查询。
  - eg:  

  属性名|兼容性
  --|--
  :hover | IE7=+
  inline-block | IE8=+
  min-width/max-height | IE8=+
  :before/:after | IE8=+
  background-size | IE9=+
  border-radius | IE9=+
  box-shadow | IE9=+
  animation/渐变 | IE10=+
+ 常用的兼容性处理扩展
  - html5shiv.js 解决 IE9=- 不支持 HTML5 新标签，并使相关 CSS 失效的问题。
  - respond.js 解决 IE6~IE8 不支持 CSS3 中媒体查询的 min-width/max-width 等问题，实现响应式。
  - Reset CSS 重新定义浏览器的部分标签的默认样式。
  - Normalize.css 为默认的 HTML 标签样式提供了跨浏览器的高度一致性，让不同的浏览器在渲染元素时形式更加统一（比 Reset CSS 的重置更好）。
  - Modernizr
  - 后编译 Post CSS
  - CSS 预编译器 **Sass Less Stylus**

### [CSS 编写规范](https://www.yuque.com/olizhao/qdywxs/css_17)
  + CSS 书写规范
    - Tab 用两个空格代替
    - CSS 规则中 `{` 前面加一个空格， `:` 后面加一个空格。
    - 每个声明都有分号且合理换行。
    - 值小写和缩写如 `#fff` 。
    - 小数缩写 `.5em` 。
    - 0 不带单位。
    - 声明缩写如 `margin:5px 10px 5px 10px;` 改为 `margin:5px 10px;`
  + CSS 书写顺序
    1. Position
    2. Box Model
    3. Typography
    4. Visual
    5. Misc
  
### [Emmet 快捷语法](https://www.yuque.com/olizhao/qdywxs/css_18)

### Flex 布局
#### 语法
```css
  .container{
    display:flex | inline-flex;
    flex-direction:row | row-reverse | column | column-reverse;
    flex-wrap:nowrap | wrap | wrap-reverse;
    /** flex-flow: flex-diretion flex-wrap; */
    justify-content:flex-start | space-between | space-around | center | flex-end;
    align-items:flex-start | stretch | center | baseline | flex-end;
    align-content:flex-start | stretch | space-between | space-around | baseline | center | flex-end;
  }
  .items{
    order:0 | [integer];
    flex-grow:0 | [integer];
    flex-shrink:1 | [integer];
    flex-basis:auto | [length];
    /** flex:flex-grow flex-shrink flex-basis; */
    align-self:auto | flex-start | stretch | center | baseline | flex-end;
  }
```
#### 理解
  + 设置了flex布局后，子元素的 `float` `clear` `vertical-align` 都失效。
  + `flex-direction` 、 `flex-wrap` 与 `flex-flow` **权重一样** 后声明的覆盖前面的。
  + `flex-grow` 、 `flex-shrink` 、 `flex-basis` 与 `flex` **权重一样** 后声明的覆盖前面的。
  + `flex-basis` 设置的是 **主轴** 上 **单一属性** 的 **最小** 大小，如主轴方向为 row 时， `flex-basis` 等同于 `width` ； 主轴方向为 column 时， `flex-basis` 等同于 `height` 。当子项伸缩时，最小大小不能小于 `flex-basis` 放不下 能换行就换行，不能换行就溢出。
  + `flex-basis` 的权重高于 `width` 和 `height` 。当设置了 `flex-basis` 后，会覆盖主轴方向相对应的属性。
  + 对齐与伸缩
    - 主轴对齐受 `justify-content` 影响。
    - 主轴伸缩受 `flex-wrap` 和 `flex-grow` `flex-shrink` `flex-basis` 的影响。
      + 剩余空间：主轴上除去所有的子项的`flex-basis` 或 `width|height` 的和之后的剩下的空间。
      + 不允许换行 `flex-wrap:nowrap;` 时：如果有子项明确设置了不允许伸缩 `flex-grow:0;` 或 `flex-shrink:0;` 那么该子项的大小取决于 `flex-basis` 或 `width|height`；子项有设置允许伸缩 `flex-grow` 与 `flex-shrink` 不为 0 ，那么有剩余空间时，将剩余空间按设置的比例分配给子项，没有剩余空间时，按设置的比例缩小，还放不下只能溢出。
      + 允许换行 `flex-wrap:wrap | wrap-reverse;` 时：多半会有剩余空间，如果子项设置了不允许伸缩，子项大小取决于 `flex-basis` 或 `width|height`；否则按 `flex-grow` 设置的比例分配剩余空间。
    - 交叉轴对齐与伸缩受 `flex-wrap` `align-content` `align-items` 的影响
      + 不允许换行时 `flex-wrap:nowrap;` 交叉轴始终为一行，则 `align-content` 无效，交叉轴对齐取决于 `align-items` 。
      + 允许换行时 `flex-wrap:wrap | wrap-reverse;` 取决于权重 `align-content(非 stretch)` > `align-items(非 stretch)` > `(两者的) stretch` ，即仅当两者都为 `stretch` 时交叉轴才伸缩。
    - `align-self` 会覆盖该子项本身的 `align-items` 可能会影响该子项在交叉轴的对齐。

### CSS3 过渡 [Transition]
> 在 CSS3 引入 Transition 之前， CSS 是没有时间轴概念的，所有状态的变化都是瞬时完成。当引入 Transition 后，元素的状态变化，如 `:hover` 才能实现状态切换时的过渡效果。
#### 语法
```css
  div:hover{
    color:#999;
    transition-property:color;
    transition-duration:2s;
    transition-timing-function:easy;
    transition-delay:1s;
    /** transition:color 2s easy 1s; */
  }
```
#### 理解
+ transition可以为多个属性分别设置其过渡效果，用 `,` 隔开。
+ transition 是一次性的，不能重复执行，除非一再触发。
+ transition-property 需要知道明确开始状态和结束状态的明确数值才能计算出中间状态，如从 `none`
到 `block` 则是不行的。
+ transition-duration 为 0s 是表示没有过渡效果，状态瞬时切换完成。
+ transition-timing-function 可以通过 `cubic-bezier()` 自定义速度模式。

### CSS3 变形 [Transform]
+ `transform-origin:top right bottom left |0% 0%;` 指定变形的基点，默认是中心。
+ `rotate` 旋转，如 `rotate(30deg)` 表示顺时针旋转30度。负值为逆时针。
+ `translate` 位移
  - `translateX(20px)` 表示向右动20像素，负值表示向左。
  - `translateY(20px)` 表示向下移动20像素，负值表示向上。
  - `translate(x,y?)` 一个值时 y 默认为 0 。
+ `scale` 缩放
  - `scaleX(2)` 表示横向放大两倍。负值会左右反转。
  - `scaleY(2)` 表示纵向放大两倍。负值会上下反转。
  - `scale(x,y?)` 一个值时代表 x=y 。
+ `skew` 扭曲
  - `skewX(10deg)`
  - `skewY(10deg)`
  - `skew(x,y?)`

### CSS3 动画 [Animation]
#### 关键帧 [@keyframes]
> 使用动画时，我们要先定义动画过程中几种关键状态时该帧的样式，使用 `@keyframes` 关键字，后接 自定义动画名，然后定义几个关键帧，再再每个帧中编写当前帧的样式。
+ eg:
```css
  @keyframes bounce{
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(-10px);
    }
    70% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
```
表示 定义了一个叫 *bounce* 的动画，里面有五个关键帧，每个帧内部是对元素的位移。其中 0% 可用 from ， 100% 可用 to 代替。
#### 使用动画 [animation]
> 定义好关键帧后，用 `animation` 属性将动画绑定到元素的某一触发状态，如 :hover 等。
+ `animation-name: none|[string]` 要使用的动画名，
+ `animation-duration:0s|[secend]` 动画持续时间，
+ `animation-timing-function:easy|easy-in|easy-out|linear` 动画速率函数。
+ `animation-delay:0s|[secend]` 动画延迟执行时间，
+ `animation-iteraction-count:1|[number]|infinite` 动画重复执行次数。`infinite`表示无限次循环执行。
+ `animation-direction:normal|reverse` 动画播放顺序。
+ `animation-fill-mode:none|forwards|backwards|both` 动画执行完后的状态，`none` 回到未执行时的状态， `forwards` 保持结束状态， `backwards` 回到第一帧状态。 `both` 轮流应用 `forwards` 和 `backwards`。
+ `animation-play-state:running|poused` 设置动画的运行状态，暂停或者播放。