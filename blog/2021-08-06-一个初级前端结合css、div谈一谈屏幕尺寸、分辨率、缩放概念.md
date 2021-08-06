---
slug: 一个初级前端结合css、div谈一谈屏幕尺寸、分辨率、缩放概念
title: 一个初级前端结合css、div谈一谈屏幕尺寸、分辨率、缩放概念
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 自适应布局的前缀基础。
tags: [前端, css]
---

<!-- truncate -->

**写在前面：**

> - 本文作为本人学习总结之用，同时分享给大家~
>
> - 个人前端博客网站：[https://zhangqiang.hk.cn](https://zhangqiang.hk.cn)
>
> - 欢迎加入博主的前端学习qq交流群：：[706947563](https://link.juejin.cn/?target=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3DEbeK9mdG0e6P2pZdonIoILPqcGNsnR1x%26jump_from%3Dwebapi)，**专注前端开发，共同学习进步**！

------

**本章你将能学到：**

- 结合css、div布局对屏幕尺寸、分辨率、缩放有更深一层的理解。

------

这几个小知识点，也许我们在日常中，经常有所耳闻，但是具体什么意思呢，总是容易混淆，经过我多次亲身经历开发，特地总结如下（不要小瞧这几个概念哦，这可跟我们css布局开发息息相关）：

- **屏幕尺寸**，也就是通常我们生活中所说的屏幕大小，23英寸啊、27英寸啊这些，都是我们肉眼可见的大小，也就是指**屏幕的对角线尺寸**，以英寸单位(1英寸=2.54cm)。
- **分辨率**，通常我们的电脑分辨率为1920*1080等，也就是说显示屏上会显示多少个像素点，像素点越多，屏幕自然也就越清晰。![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7c38d1b884c4d88a6b02405f11fba6a~tplv-k3u1fbpfcp-watermark.image)

对于分辨率，常用的属于还有下面这些：

> **720P**的分辨率为1280x720像素
>
> **1080P**的分辨率为1920*1080像素
>
> **2k**的分辨率为2560*1440像素
>
> **4k**的分辨率为3840*2160像素
>
> **8K**的分辨率为7680×4320像素

也就是正常给div一个 `width:50px; height:100px;` 其中的`px`就是像素的意思啦~

- **屏幕缩放**（显示文本、应用等项目的大小）

你以为你以为的就是你以为的了？咳，这里所说的缩放指的是这个：



![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e5d63775e174c0da16d2e089fc7636b~tplv-k3u1fbpfcp-watermark.image)





比如我们给一个div 100px的宽度，但是，我们用测量像素的工具一量，咦？！居然不是100像素，变大了？？？ 好了，就是因为这个缩放的原因，它把我们本应该100%显示的div宽度，变成了125%。实际上，他就是100px，你改成100%显示就好了。

但是，我们有的电脑就是显示125%比较合适，那咋办呢？此刻就要用自适应的布局啦~ flex布局、单位可以给vw、vh这些，亦可解决。







