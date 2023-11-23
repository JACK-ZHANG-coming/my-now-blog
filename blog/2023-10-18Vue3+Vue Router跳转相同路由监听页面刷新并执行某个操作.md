---
slug: Vue3+Vue Router跳转相同路由监听页面刷新并执行某个操作
title: Vue3+Vue Router跳转相同路由监听页面刷新并执行某个操作
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: Vue3+Vue Router跳转相同路由监听页面刷新并执行某个操作
tags: [前端, javascript, vue3, vue router]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# Vue3+Vue Router 跳转相同路由监听页面刷新并执行某个操作

## 1 起源

最近遇到了个这样的需求，大概就是：点击某个按钮，进入某个页面，然后再在这个页面执行某个操作（比如请求某个接口、赋初始值啥的）。

![image-20231116163902611](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20231116163902611.png)

这个需求看似简单，其实也不难。**但是，**我遇到了个问题，就是当在那个页面点击这个按钮的时候，因为跳转路由路径是一样的原因，页面是不会刷新的，那我怎么判断我是否我是否点击了那个按钮并且跳到了这个页面呢？

于是，我想到了路由传参，通过路由传参的方式，判断这个参数是否变化了，变化了就代表这个路由再次进入了。

## 2 解决方案

用 query 的方式传参，参数附上时间戳，这样每进来一次都是不同的参数

点击按钮如下操作：

```javascript
const router = useRouter()

const goDocumentNotification = () => {
  router.push({
    path: `/documentNotification`,
    query: {
      t: Date.now()
    }
  })
}
```

在进入的那个页面增加如下代码：

```javascript
// 使用 watch 监听 route 的变化
watch(
  () => route.query.t,
  (newPath, oldPath) => {
    // 路由变化，执行相应操作
    query()
  }
)
```

ok，经过上面的操作便可以在跳转相同路由下，监听页面刷新并执行某个操作啦。

## 3 知识扩展-关于 Vue Router 路由传参的几种常用方式

说到这里，vue-router 传参的几种方式也顺便总结一下吧

### 3.1 params 传参（显示参数）

浏览器里路由地址显示为这样：

```
http://127.0.0.1:5190/drs/index.html#/documentNotification/0
```

声明式：

```vue
// 子路由配置 { path: '/documentNotification/:id?', // ?代表这个参数为可传可不传 name: 'documentNotification', component: () => import('@/views/documentNotification/index.vue'), meta: { title: '发放通知', } } // 父路由组件
<router-link :to="/documentNotification/123">进入documentNotification路由</router-link>
```

编程式：

```js
// 子路由配置
{
    path: '/documentNotification/:id?', // ?代表这个参数为可传可不传
    name: 'documentNotification',
    component: () => import('@/views/documentNotification/index.vue'),
    meta: {
      title: '发放通知',
    }
}
// 父路由编程式传参(一般通过事件触发)
router.push({
    path:'/documentNotification/${yourParam}',
})
```

关于参数的获取：

```js
route.params.id
```

### 3.2 params 传参（不显示参数）

由于从 Vue Router 的 2022-8-22 这次更新后，便不能再用这种方式来写，关于不显示参数的传参，可以参考下面这篇博客：

https://blog.csdn.net/m0_57033755/article/details/129927829

### 3.3 query 传参

浏览器里路由地址显示为这样：

```
http://localhost:3000/#/documentNotification?t=1700140985974
```

声明式：

```js
//子路由配置
{
    path: '/documentNotification',
    name: 'documentNotification',
    component: () => import('@/views/documentNotification/index.vue'),
    meta: {
      title: '发放通知'
    }
}
//父路由组件
<router-link :to="{name:'documentNotification',query:{t:123}}">进入documentNotification路由</router-link>
```

编程式：

```js
//子路由配置
{
    path: '/documentNotification',
    name: 'documentNotification',
    component: () => import('@/views/documentNotification/index.vue'),
    meta: {
      title: '发放通知'
    }
}
router.push({
    path: `/documentNotification`,
    query: {
      t: Date.now()
    }
})
```

关于参数的获取：

```
route.query.t
```

## 4 结语

ok ,就到这里啦，对此你有何看法或想法呢，欢迎提出讨论呀~
