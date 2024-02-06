---
slug: vue3+element puls upload组件回显图片base64的实现
title: vue3+element puls upload组件回显图片base64的实现
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: vue3+element puls upload组件回显图片base64的实现
tags: [前端, javascript, vue3, element plus]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# vue3+element plus upload 组件回显图片 base64 的实现

## 1 背景

最近遇到个需求，需要基于 vue3+element plus 的 upload 组件回显图片，通常我们是通过后端直接返回的 url 来回显就行了，而且在 element plus 也给出了示例：

![image-20240123171340359](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240123171340359.png)

不过，o_O，我们下面将要以 base64 的形式来填充，其实也很简单，自己构造一个这样的对象就行了，url 里面放我们 base64 字符串，然后其他的造成即可，下面请看我的实现样例：

## 2 实现

![image-20240126173506038](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240126173506038.png)

- 构造一个用 base64 字符串填充的文件列表

```js
let fileList = ref([
  {
    // 这是文件名字
    name: '文件名1',
    // 这里是我自己定义的自定义属性，可有可无
    fileId: '1',
    // 这里是base64字符串，咳咳我们后端返回的格式有点特殊，所以我又给转换了一下，成为真正的base64字符串
    url: 'data:image/png;base64,' + new BaseTool().arrayBufferToBase64(temp?.arrayBuffer)
  }
])
```

- 将图片列表渲染到组件里

```vue
<el-upload action="#" list-type="picture-card" v-model:file-list="fileList" :auto-upload="false">
                <el-icon><Plus /></el-icon>
                <template #file="{ file }">
                  <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file, item.dataValue)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
```

重点就是替换上面 fileList 就可。

## 3 小结

ok 啦。
