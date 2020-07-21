## CSS进阶

### 浮动[float]
#### 使用情况
> 当某区域排版不是上下排列，而是左右排列时，就可能用到浮动。
#### 特点
+ 一个元素设置浮动后呈现类似 `inline-block` 的特性，即未设置宽度时宽度自动收缩，包裹内容(inline)，又能设置 宽高、边距和居中等(block)。
+ 当一个元素设置浮动后他会向左或向右移动，直到其外边碰到另一个浮动元素或包含块边缘，如果浮动时水平空间不够放置，则先向下移动，然后上边缘贴着 **前一个结构元素的下边缘**  继续平移移动(理解第一个特性)，直到空间适合或该水平无浮动元素(这样也放不下就溢出);
+ 浮动换行时，前一行元素高度不一致可能会卡住。
+ 文档中一个普通块元素遇见一个浮动元素，普通块元素不会发现浮动元素(普通块元素被覆盖遮挡)，普通块元素中的文本会发现浮动元素(文字不会被覆盖，而会围绕浮动元素排列)。
+ 浮动元素脱离了普通流，父元素在计算高度时不会发现浮动元素，即父元素高度不会被浮动元素撑开。 **不同于 `absolute`** 。
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
> 定位就是通过设置 `position` 属性改变元素在文档中的定位方式，使其 **脱离正常的文档流** ，然后通过 `top right bottom left` 等属性来设置具体位置。主要分为 **相对定位** ，**绝对定位** ，**固定定位** ，**粘性定位** 。设置了定位属性(除默认的`static`)的元素叫 **定位元素** 。默认值`static`的元素叫非定位元素，其 `top right bottom left` 等属性值无效。
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
#### CSS-进阶-实战二：[会话小三角 bubble](https://jsbin.com/leviyep/edit?html,css,output)

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