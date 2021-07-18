---
slug: 回炉重造，css常规布局系统整理——实战开发后复盘小结
title: 回炉重造，css常规布局系统整理——实战开发后复盘小结
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 本文意在系统总结常用的css布局，以达到融会贯通之功效。
tags: [前端, css]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

<!-- truncate -->

# 回炉重造，css常规布局系统整理——实战开发后复盘小结

> 写在前面：
>
> ​	在了解css布局之前，我们先了解两个小概念，我认为这将对你有所帮助！
>
> ​	块级元素：display:bloak；占据一行，下一个元素自动换行，如div等；
>
> ​	行内元素：display:inline；元素没有高宽，根据元素内的内容改变大小，如span、a标签等；
>
> ​	行内块：display:inline-bloak；使行内元素具有块级元素特性、使块级元素具有行内元素特性；

## 1 基础css布局

### **1.1 position定位**

​	`position`用于规定如div等元素的定位方法的类型。

​	其包含`static`、`relative`、`fixed`、`absolute`、`sticky`这5个定位方式，当`position`后面加上这几种定位方式之后，我们就可以用`top、right、left、bottom`对元素进行位置改变操作啦~

#### 1.1.0 实例代码运行效果图

![image-20210616213753355](https://i.loli.net/2021/07/18/Bz95UFDrn4VAm6Y.png)

#### 1.1.1 static定位方式

​	静态定位，浏览器的默认的，写不写没啥区别，top、right、left、bottom不起作用。

```css
div.static {
    position: static;
    border: 3px solid #73AD21;
    top: 50px;  /*演示：这句话不起作用，可删去*/
    left: 10px; /*演示：这句话不起作用，可删去*/
}
```

#### 1.1.2 fixed定位方式

​	固定定位，元素的位置相对于浏览器（就是你能看到的这个浏览器窗口）来说，是固定的，无论你怎么滑动窗口，它都在那儿雷打不动。 
​	可以与其他元素重叠。（常用于导航栏位置固定）

```css
div.fixed_1 {
    position: fixed;
    border: 3px solid #111111;
    width: 200px;
    height: 60px;
    top: 300px;
    left: 50px;
}

div.fixed_2 {
    position: fixed;
    border: 3px solid #44f895;
    width: 200px;
    height: 60px;
    top: 300px;
    left: 260px;
}

div.fixed_3 {
    position: fixed;
    border: 3px solid #7a5e5e;
    background-color: #ebaaaa;
    width: 200px;
    height: 60px;
    top: 310px;
    left: 360px;
}
```

#### 1.1.3 relative定位方式

​	相对定位，相对于这个元素的原来位置进行移动，原来的位置依然是存在的（通常里面会包上absolute绝对定位来用）。

```css
div.relative {
    position: relative;
    border: 3px solid #9cf0c2;
    width: 200px;
    height: 60px;
}
```

#### 1.1.4 absolute定位方式

​	绝对定位，根据外面一层包着的元素来定位（relative)，左啊还是右啊，如果外面没有那就是html元素，最大的那个咯。（口诀：**子绝父相**）。

```css
div.absolute {
    position: absolute;
    background-color: #9cf0c2;
    border: #29c9c9;
    width: 150px;
    height: 30px;
    top: 20px;
}
```

#### 1.1.5 sticky定位方式

​	粘性定位，和fixed定位有些相似，但是又有些不同，一开始可以自由滑动，当到一定位置时就会在那里不动。 先自由滑动，到一定位置就固定在那里不动。

```css
div.sticky {
    position: -webkit-sticky; // 兼容Safari 
    position: sticky;
    top: 20px; /* 到顶部20px位置不动 */
    background-color: #29c9c9;
    border: 2px solid #73AD21;
}
```

#### 1.1.6 实例源码

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>position定位使用</title>
</head>

<body>
    <div style="height: 2000px;">
        <!-- static定位 -->
        <div class="static">这个是static定位</div>
        <!-- fixed 定位 -->
        <div class="fixed_1">fixed方块1</div>
        <div class="fixed_2">fixed方块2</div>
        <div class="fixed_3">fixed方块3</div>
        <!-- relative定位 -->
        <div class="relative">
            relative定位
            <!-- absolute定位 -->
            <div class="absolute">absolute定位</div>
        </div>
        <!-- sticky定位 -->
        <div class="sticky">这个是sticky定位</div>

    </div>
</body>

</html>
```

### 1.2 float定位

#### 1.2.0 实例代码运行效果图

![image-20210717112031353](https://i.loli.net/2021/07/18/KZYwsaxcID1COqM.png)

#### 1.2.1 float详解

​	何为float定位？浮动的元素，脱离文档流（比如正常我们放一个div在页面里，是有一个文档流的，就是会有位置的，而变为float定位后，就会漂浮起来，原来的位置就不占用了，再放其他div，会从忽略float的位置，正常排列），空间释放（原来是占用着这个位置的，然后浮动，就漂浮起来了，这个位置就不占用了）。

​	**清除浮动：** `clear：both` 因为float定位他是浮起来的嘛，这个位置就是空的，而`clear：both`会清除浮动，默认为正常的文档流，这样后面的元素就可正常排列了（可以自己在代码中去体验）。

#### 1.2.2 实例源码

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>css浮动</title>
        <style>
            div.main{
                width: 1000px;
                height: 500px;
                background-color: aquamarine;
            }
            div.child{
                width: 100px;
                height: 100px;
                background-color: blue;
                float: left;
                margin: 5px;
            }
			// 清除浮动
            div.clear{
                height: 20px;
                border: 2px solid black;
                clear: both;
            }
        </style>
    </head>

    <body>
        <!-- 浮动 -->
        <div class="main">
            <div class="child"></div>
            <div class="child"></div>
            <div class="clear"></div>
        </div>
    </body>
</html>
```

## 2 开发中常用的布局

### 2.1 flex布局 

​	一种响应式布局，何为响应式？可以随着浏览器窗口大小放大缩小，而布局元素也相应放大缩小。

​	具体分析见下面第三节的讲解。

### 2.2 antd栅格布局

​	当我们使用ant design组件开发时，必然要使用的其自带的一种布局模式。

​	可参考ant design官网的介绍：[https://ant.design/components/grid-cn/](https://ant.design/components/grid-cn/)

### 2.3 grid网格布局

​	如果说flex是一维布局，那么grid就是二维布局，更高级，它有行和列，flex只有行，其常用于固定元素个数布局；

​	可参考阮一峰的网络日志 - CSS Grid 网格布局教程 ：[http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## 3 flex布局详解

### 3.1 flex布局是什么

> 在 Flexbox 布局模块（问世）之前，可用的布局模式有以下四种：
>
> - 块（Block），用于网页中的部分（节）
> - 行内（Inline），用于文本
> - 表，用于二维表数据
> - 定位，用于元素的明确位置
>
> 弹性框布局模块，可以更轻松地设计灵活的响应式布局结构，而无需使用浮动或定位。

### 3.2 教程文档小结

#### 3.2.1 基本概念

- **容器和属性**

![image-20210717234454111](https://i.loli.net/2021/07/17/VUMXTN9GtCqw4Li.png)

​	采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

​	容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

#### 3.2.2 容器属性

**容器常用有6个属性**

> - flex-direction
> - flex-wrap
> - flex-flow
> - justify-content
> - align-items
> - align-content

##### 3.2.2.1 flex-direction

​	`	flex-direction`属性决定主轴的方向（即项目的排列方向）。

```css
.flex-container {
    display: flex;
    flex-direction: row(默认) | row-reverse | column | column-reverse;
}
```

​	用于控制项目排列方向与顺序，默认row，即横向排列，项目排列顺序为正序1-2-3-4；row-reverse同为横向排列，但项目顺序为倒序4-3-2-1。

​	column 与row相反，为纵向排列，项目顺序为正序1-2-3，column-reverse同为纵向排列，项目顺序为倒序3-2-1。

![image-20210718120308267](https://i.loli.net/2021/07/18/PtOFKLoMZaplHBz.png)

##### 3.2.2.2 flex-wrap属性

​	用于控制项目是否换行，nowrap表示不换行。

```css
.flex-container {
    display: flex;
   	flex-wrap: nowrap(默认) | wrap | wrap-reverse;
}
```

​	`nowrap`表示不换行，项目会一直在容器的第一行排列，无论有多少个项目，只会都挤在第一行。

![image-20210718135810921](https://i.loli.net/2021/07/18/Zjc1xo36sMI5ESu.png)

​	`wrap`表示自动换行，当项目在第一行排列不完时，会自动切换到下一行排列。

![image-20210718135651384](https://i.loli.net/2021/07/18/CwSkJhQIKPvNeYA.png)

​	`wrap-reverse` 也是自动换行，但不同的是，它是从底下开始排列的（之前我们都是从上面开始排的）。

![image-20210718140037635](https://i.loli.net/2021/07/18/9gpuCVS7BXEazik.png)

##### 3.2.2.3 flex-flow属性

​	`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`（横向排列，不换行）。

```css
.flex-container {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

##### 3.2.2.4 justify-content属性

​	**哟，常用，好使。**`justify-content`属性定义了项目在主轴上的对齐方式（我们想要使项目在容器中居中时，经常用得到）。

```css
.flex-container {
  justify-content: flex-start(默认) | flex-end | center | space-between | space-around;
}
```

![image-20210718142114313](https://i.loli.net/2021/07/18/mXy8nMTFzHk45gp.png)

> 这里的的主轴是将横轴看做为主轴。常取值分别代表的意思如下：
>
> - `flex-start`（默认值）：左对齐
> - `flex-end`：右对齐
> - `center`： 居中
> - `space-between`：两端对齐，项目之间的间隔都相等。
> - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

##### 3.2.2.5 align-items属性

**哟，这个也常用，好使**！`align-items`属性定义项目在交叉轴上如何对齐。

```css
.flex-container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![image-20210718142628046](https://i.loli.net/2021/07/18/hmOjQCrxzEHiaBD.png)

> 这里的的交叉轴是将纵轴看做为交叉轴。常取值分别代表的意思如下：
>
> - `flex-start`：交叉轴的起点对齐。
> - `flex-end`：交叉轴的终点对齐。
> - `center`：交叉轴的中点对齐。
> - `baseline`: 项目的第一行文字的基线对齐。
> - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

##### 3.2.2.6 align-content属性

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

![image-20210718142936834](https://i.loli.net/2021/07/18/XiVnew5CumD7ytF.png)

> 常取值分别代表的意思如下：
>
> - `flex-start`：与交叉轴的起点对齐。
> - `flex-end`：与交叉轴的终点对齐。
> - `center`：与交叉轴的中点对齐。
> - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
> - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
> - `stretch`（默认值）：轴线占满整个交叉轴。

#### 3.2.3 项目属性

​	前面我们介绍的是写在容器上的属性，写完之后会作用于容器里面的项目排列布局样式。而**项目属性**是写在项目上的。换一种说法就是项目属性相当于我们写的`ul`里面的`li`，给`li`写属性。

​	因为这里我不常用到，所以就简单记之，详情可参考本文末尾的参考文章。

> 项目可写属性如下：
>
> - `order `  定义项目的排列顺序。数值越小，排列越靠前，默认为0。
> - `flex-grow `  规定某个 flex 项目相对于其余 flex 项目将增长多少。
> - `flex-shrink `  规定某个 flex 项目相对于其余 flex 项目将收缩多少。
> - `flex-basis`  规定 flex 项目的初始长度。
> - `flex`  是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。
> - `align-self ` 规定弹性容器内所选项目的对齐方式。将覆盖容器的 align-items 属性所设置的默认对齐方式。



### 3.3 flex布局应用

#### 3.3.0 实例代码运行效果图

![image-20210718120418455](https://i.loli.net/2021/07/18/UlMfBIwbyo8A6tr.png)

#### 3.3.1 实例HTML源码

``` html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>flex布局</title>
  <style>
    .flex-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: DodgerBlue;
    }

    /* 选择父元素样式是 .flex-container 的所有 <div> 元素 */
    .flex-container>div {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f1f1f1;
      width: 100px;
      height: 80px;
      margin: 10px;
    }

    .flex-container>div>div {
      background-color: yellowgreen;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
    }
  </style>
</head>

<body>
  <div class="flex-container">
    <div>
      <div>1</div>
    </div>
    <div>
      <div>2</div>
    </div>
    <div>
      <div>3</div>
    </div>
    <div>
      <div>4</div>
    </div>
  </div>
</body>

</html>
```

### 4 最后

#### 4.1 参考

> w3school Flexbox 布局模块 https://www.w3school.com.cn/css/css3_flexbox.asp
>
> 一篇文章弄懂flex布局 https://www.cnblogs.com/echolun/p/11299460.html
>
> Flex 布局教程：语法篇 https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

#### 4.2 注

> ​	本文作为本人学习总结之用，同时分享给大家，如果觉得这些内容有对你也有用的话，就请点个赞吧~ 谢谢~ 
>
>  因为个人技术有限，如果有发现错误或存在疑问之处，欢迎指出或指点！不胜感谢！
>
> ​	个人博客网站：https://zhangqiang.hk.cn
>
> ​	欢迎加入博主的前端学习qq交流群：706947563，**专注前端开发，共同学习进步**！