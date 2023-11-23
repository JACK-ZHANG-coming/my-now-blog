---
slug: vue3+element plus图片预览直接点击按钮就显示图片的预览形式
title: vue3+element plus图片预览直接点击按钮就显示图片的预览形式
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: vue3+element plus图片预览直接点击按钮就显示图片的预览形式
tags: [前端, javascript, vue3, vue router]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# vue3+element plus 图片预览点击按钮直接显示图片的预览形式

## 1 需求

直接上需求：

我想要直接点击下面这个“预览”按钮，然后呈现出预览图片的形式

![image-20231120090930791](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20231120090930791.png)

也就是点击完“预览”按钮，会像下面这样：

![image-20231120091054028](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20231120091054028.png)

ok，需求知道了，下面让我们来看看如何实现吧 ~

## 2 实现

**template 部分**

```html
<el-button type="primary" size="small" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
<!-- 图片预览 -->
<el-image-viewer v-if="showImagePreview" :zoom-rate="1.2" @close="closePreview" :url-list="imgPreviewList" />
```

**script 部分**

```js
const imgPreviewList = ref < any > []
const showImagePreview = ref(false)
const currentBase64FileData = reactive({
  base64: '',
  name: ''
})

const handlePreview = async (index: number, row: any) => {
  let res = await handleDownload(index, row, true)
  currentBase64FileData.base64 = 'data:image/png;base64,' + res?.base64
  currentBase64FileData.name = res?.name
  showImagePreview.value = true
  // 下面数组里可以放一个url，如'https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20231120091054028.png'，我这里放的是一个base64数据，也可以用来显示图片
  imgPreviewList.value = [currentBase64FileData.base64]
}

const closePreview = () => {
  imgPreviewList.value = []
  showImagePreview.value = false
}
```

ok，经过上面简单几句代码，就实现了“点击按钮直接显示图片的预览形式”啦 ~

## 3 技术小结

技术栈： vue3+ element plus，其中 vue3 采用的是 script setup 组合式语法的形式。

这部分功能其实在 element plus 官方文档中有写，

https://element-plus.org/zh-CN/component/image.html#image-viewer-api

![image-20231120100147616](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20231120100147616.png)

不同的是，这里 element plus 并没有给出实际样例，只是用文字描述了下，咱就是说，家人们，这坑不坑，我还是看了别人的博客才知道这块的用处>\_<
