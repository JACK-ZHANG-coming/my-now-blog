---
slug: 为什么 2!=false 和 2!=true 返回的都是true
title: 为什么 2!=false 和 2!=true 返回的都是true
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 为什么 2!=false 和 2!=true 返回的都是true
tags: [前端, javascript]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

### 前言

今天突然想起一个奇怪的问题，记录一下，我在控制台执行内容如下：

![image-20240821171734282](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240821171734282.png)

由上图可见，`2 != false` 和 `2 != true` 返回的值竟然都是`true`，那么为什么呢，请看下文：

### 1 `!=` **操作符的作用**

- `!=` 是“不等于”操作符。它会在比较前执行类型转换，然后再比较两个值是否不相等。

  在 JavaScript 中，`2 != false` 和 `2 != true` 返回 `true` 的原因涉及到 JavaScript 中的类型转换和比较规则。

### 2 **类型转换**

当使用 `!=` 进行比较时，JavaScript 会尝试将比较的两个值转换为相同的类型，然后再进行比较。以下是 `2 != false` 和 `2 != true` 的过程：

#### **2 != false**

1. `false` 会被转换为数字类型。根据 JavaScript 的转换规则，`false` 被转换为 `0`。
2. 现在表达式变成了 `2 != 0`。
3. `2` 和 `0` 不相等，因此返回 `true`。

#### **2 != true**

1. `true` 会被转换为数字类型。根据 JavaScript 的转换规则，`true` 被转换为 `1`。
2. 现在表达式变成了 `2 != 1`。
3. `2` 和 `1` 不相等，因此返回 `true`。

### **总结**

- `2 != false` 返回 `true` 是因为 `2` 和 `0` 不相等。
- `2 != true` 返回 `true` 是因为 `2` 和 `1` 不相等。

这就是为什么 `2 != false` 和 `2 != true` 都会返回 `true`。
