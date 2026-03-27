---
slug: Vue3中watch中props监听加箭头函数与不加箭头函数的区别
title: Vue3中watch中props监听加箭头函数与不加箭头函数的区别
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: Vue3中watch中props监听加箭头函数与不加箭头函数的区别
tags: [前端, Vue3]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# Vue3中watch中props监听加箭头函数与不加箭头函数的区别

## 1 前言

今天写项目时，遇到一个问题，我需要打开点击一个按钮打开一个弹框页面，然后通过watch去监听传进来的值，但是呢，写了watch我点击按钮只有首次打开能够监听到，尽管加上了`deep: true`页面也不能监听到变化，点击效果如下图：

![image-20240903172257604](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240903172257604.png)

## 2 代码实例

直接上我的关键代码，这个是我弹框页面的代码：

```vue
<template>
  <div class="content_container">1111</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, onActivated } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps(['currentRow'])
console.log('props', props)

watch(
  props.currentRow,
  (newVal, oldVal) => {
    console.log('newVal', newVal)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

```

解决后的代码：

```vue
<template>
  <div class="content_container">1111</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, onActivated } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps(['currentRow'])
console.log('props', props)

watch(
  () => props.currentRow,
  (newVal, oldVal) => {
    console.log('newVal', newVal)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

```

其实，只是修改了一句话，多加了一个**箭头函数**~ 就可以了！他就可以每次进来就都监听了，为啥呢？请看下面的代码精读环节

## 3 代码精读

### 3.1 直接监听 `props` 属性

```
javascriptwatch(
  props.currentRow,
  (newVal, oldVal) => {
    console.log('newVal', newVal);
  },
  {
    immediate: true,
    deep: true
  }
);
```

当你直接监听 `props.currentRow` 时，`watch` 函数会尝试将 `props.currentRow` 当作一个响应式引用进行监听。然而，`props` 本身并不是一个响应式引用，而是一个对象。因此，这种方式可能会导致以下问题：

- **非响应式引用**: 如果 `props.currentRow` 是一个简单的值（如字符串或数字），那么 `watch` 可能无法正确地监听到它的变化。
- **对象或数组内部属性变化**: 即使设置了 `deep: true`，`watch` 仍然可能无法正确地监听到对象或数组内部属性的变化。

### 3.2 使用箭头函数监听 `props` 属性

```
javascriptwatch(
  () => props.currentRow,
  (newVal, oldVal) => {
    console.log('newVal', newVal);
  },
  {
    immediate: true,
    deep: true
  }
);
```

使用箭头函数 `() => props.currentRow` 可以确保每次 `props.currentRow` 发生变化时，都会重新计算并触发 `watch` 回调。这种方式更可靠，因为它明确地告诉 `watch` 如何获取最新的 `props.currentRow` 值。

## 4 总结

在正常的开发中，我们应该使用箭头函数组合watch来进行props值的变化，来确保每次 `props` 变化时都能重新计算。