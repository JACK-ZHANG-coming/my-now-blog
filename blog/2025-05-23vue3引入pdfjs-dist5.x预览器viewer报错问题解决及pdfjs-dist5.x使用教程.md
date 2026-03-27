---
slug: vue3引入pdfjs-dist5.x预览器viewer报错问题解决及pdfjs-dist5.x使用教程
title: vue3引入pdfjs-dist5.x预览器viewer报错问题解决及pdfjs-dist5.x使用教程
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: vue3引入pdfjs-dist5.x预览器viewer报错问题解决及pdfjs-dist5.x使用教程
tags: [Vue.js, 前端, pdfjs-dist, pdf预览器]
---

# vue3 引入 pdfjs-dist5.x 预览器 viewer 报错问题解决及 pdfjs-dist5.x 使用教程

## 1 前言

最近在做 pdf 在预览的功能，pdfjs-dist 插件使用了一下感觉还可以，具体就不用介绍了，能看到这篇文档的小伙伴想必都是研究过 pdfjs-dist（官方文档：https://github.com/mozilla/pdf.js）的。 我是在引入 pdfjs-dist 5.2.133 遇到的报错，下面开始 show time:

## 2 报错复现

报错内容：

app.js:2498 Uncaught (in promise) Error: file origin does not match viewer's
at validateFileURL (app.js:2498:10)
at Object.run (app.js:960:28)

app.js:1507 加载 PDF 时发生错误。

PDF.js v5.2.133 (build: 4f7761353)
Message: file origin does not match viewer's

![image-20250519170550373](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20250519170550373.png)

## 3 报错解决

首先确认咱穿过来的这个 url 地址是放在浏览器里面是可以直接下载 pdf（接口没啥问题）的，这里 url 被转码了，不过没关系，用我们转码之前的 pdf 的 url 测试就可以了

我转码之前的 pdf url 是：`http://127.0.0.1:7501/api/v1/user/getPdfFile?file=8c424181bb74b34199b0f02bc3b2b012.pdf`

![image-20250519171219097](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20250519171219097.png)

**重点：**

更改 pdfjs-dist 的源码，因为里面有跨域相关的校验，咱前端不要这个

将下面这段咔咔注释掉，就 OK 了！

![image-20250519171506892](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20250519171506892.png)

正常展示效果如下：

![image-20250519171823133](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20250519171823133.png)

有的博客说，要在这里加一句`file = decodeURIComponent(file)` ，不过我试了加不加都不影响，估计是版本问题吧

![image-20250519172045311](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20250519172045311.png)

## 4 pdfjs-dist5.x 完整引用代码

关键代码如下：

![image-20250519172550077](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20250519172550077.png)

pdf 预览器离线包下载：https://mozilla.github.io/pdf.js/getting_started/#download

关键代码块：

```vue
let currentFileUrl = ref('') currentFileUrl.value = encodeURIComponent( `http://127.0.0.1:7501/api/v1/user/getPdfFile?file=8c424181bb74b34199b0f02bc3b2b012.pdf` )

<iframe style="height: 100%; width: 100%" :src="`./lib/pdfjs-5.2.133-legacy-dist/web/viewer.html?file=${currentFileUrl}`">
</iframe>
```

## 5 参考

- pdf.js 引用时报错：file origin does not match viewer‘s

  https://blog.csdn.net/Miraitowat/article/details/142142302
