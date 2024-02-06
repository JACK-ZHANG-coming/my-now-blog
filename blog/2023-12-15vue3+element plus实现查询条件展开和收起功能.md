---
slug: vue3+element plus实现查询条件展开和收起功能
title: vue3+element plus实现查询条件展开和收起功能
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: vue3+element plus实现查询条件展开和收起功能
tags: [前端, javascript, vue3, element plus]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# vue3+element plus实现查询条件展开和收起功能

## 1 需求来源

![image-20231129134425954](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20231129134425954.png)

如图所示，这样一个查询页面，上面的条件太多，使得下面的列表展示的空间就变得很小了。所以，需要有一个东西控制，当条件太多时，就展示一个展开/收起按钮，可以控制查询条件的展开和收起。

## 2 实现效果图

我们先直接来看下最终实现的效果图

![screenshots](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023screenshots.gif)

如果这就是你想要的，可以继续看下面的实现关键代码

## 3 具体实现关键代码

```vue
<script setup lang="ts">
const conditionFold = ref(true)
const conditionInitShowLength = 6
const areConditionFold = () => {
  conditionFold.value = !conditionFold.value
}
</script>

<template>
<div class="header customDiv">
  <el-form ref="formRef" :inline="true" :model="formDataConfig" class="demo-form-inline">
    <el-row>
      <el-col :span="6">
        <el-form-item label="查询逻辑">
          <el-select v-model="filtersLogic" placeholder="默认同时符合">
            <el-option label="同时符合" :value="0" />
            <el-option label="部分符合" :value="1" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :span="6"
        v-for="(item, index) in formDataConfig.slice(
          0,
          conditionFold ? conditionInitShowLength : formDataConfig.length
        )"
        :key="item.key"
      >
        <el-form-item :label="item.label" :prop="`[${index}]value`">
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="item.value"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
          />
          <el-input
            v-else-if="item.type === 'input' || !item.type"
            v-model="item.value"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">查询</el-button>
          <el-button type="primary" @click="resetForm(formRef)">重置</el-button>
          <el-button
            v-if="formDataConfig.length > conditionInitShowLength"
            type="primary"
            link
            @click="areConditionFold"
          >
            {{ conditionFold ? '展开' : '收起' }}
            <el-icon v-if="conditionFold"><ArrowDown /></el-icon>
            <el-icon v-else><ArrowUp /></el-icon>
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>
```

ok，代码就是上面的代码，可能少了一些变量，但是思路还是挺清晰的，主要就是通过`conditionFold`来控制按钮是否展示，`conditionInitShowLength`来控制收起时显示的默认长度。

## 4 技术小结

当我们使用“展开/收起”按钮时，需要搭配row、col，列数需要是固定的，不然我们不知道“展开/收起”按钮展示及切换的时机。