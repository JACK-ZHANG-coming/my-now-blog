---
slug: Vue3使用Element Plus单个Tag标签文字过长自动换行代码实现
title: Vue3使用Element Plus单个Tag标签文字过长自动换行代码实现
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: Vue3使用Element Plus单个Tag标签文字过长自动换行代码实现
tags: [前端, Element Plus, vue3]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# Vue3 使用 Element Plus 单个 Tag 标签文字过长自动换行代码实现

## 1 需求引入

直接上图，原先程序显示效果是这样：

![image-20240807172107258](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240807172107258.png)

由上图可见，element plus 的 tag 标签组件里面内容过长时，把页面都撑开了，不能自动换行，我的 tag 标签代码原先是这样写的

```vue
<div style="width: 100%; margin-bottom: 5px">
	<el-tag v-if="uploadMessage.successMessage.length > 0" :type="'success'" 	effect="plain">
		{{ uploadMessage.successMessage }}
	</el-tag>
</div>
```

## 2 解决需求，代码实现

先看解决效果图：

![image-20240807172500463](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240807172500463.png)

如何解决的呢，只要我们再单独写一下 css 的样式就 ok 了，看下面的 css 样式代码：

```css
.el-tag {
  white-space: normal;
  height: auto;
  padding: 2px;
  display: inline-block;
}
```

好了，直接加上上面这段 css 代码就 ok 了。

## 3 小结

我当时用这个标签是显示错误信息的，后来发现 element 的 Alert 组件用于现实错误信息才比较合适，因为那个有个关闭的按钮，既然已经写了，就记录一下吧~ 希望对看文章的你也有些用吧 ~ >\_< ~
