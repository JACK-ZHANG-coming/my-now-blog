---
slug: 如何使用react-router实现一个路由权限判断
title: 如何使用react-router实现一个路由权限判断
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 如何使用react-router实现一个路由权限判断
tags: [前端, react, react-router]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# 如何使用react-router实现一个路由权限判断

**前言**

> 这是一篇关于react-router的通篇全解的文章，本文旨在阅读完本文可以对react-router有一个系统的了解——emmm原来的思路是打算这么写的，但是近日阅读了一个大佬的文章，发现最好还是学以致用，并且融入自己的思想，所以决定前面介绍react-router的一些常规知识（1-3大点），后面第4大点会写一个实例，用react-router写一个路由鉴权。第4大点最为重要，如果对react-router有些许了解的也可以直接进入第4大点。
>
> 首先，有一说一，最详细的教程还是：[官网](https://reactrouter.com/en/main)  。下面的介绍将是融入个人理解的白话文：

## 1 相关理解

### 1.1 SPA的理解

什么是spa？英文全拼single page web application，中文单页面Web应用。

通俗的说，点击页面中的链接不会刷新页面（浏览器左上角的那个小圆环不会转），只会做页面的局部更新，那这就是个单页面web应用。比如我们用的`<a></a>`标签，里面加个href='https://www.zhangqiang.hk.cn/' 属性，当我们点击那个a标签，此时页面跳转了网页，左上角那个小圆圈呼溜溜的转了，那这就不是个单页面web应用。

而ajax异步请求、react-router都是可以实现spa的、

### 1.2 路由的理解

#### 1.2.1 什么是路由?

- 一个路由就是一个映射关系(key:value)
- key为路径, value可能是function或component

#### 1.2.2 路由分类

**后端路由：**

理解： value是function, 用来处理客户端提交的请求。
注册路由： router.get(path, function(req, res))
工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

**前端路由：**

浏览器端路由，value是component，用于展示页面内容。
注册路由: `<Route path="/test" component={Test}>`
工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件

**react-router-dom的理解:**

- react的一个插件库。
- 专门用来实现一个SPA应用。
- 基于react的项目基本都会用到此库。

## 2 react-router-v5

### 2.1 react-router-dom相关API

#### 2.1.1 内置组件

```
<BrowserRouter>
<HashRouter>
<Route>
<Redirect>
<Link>
<NavLink>
<Switch>
```

#### 2.1.2 其它

- history对象

- match对象

- withRouter函数



### 2.2 基本路由使用

#### 2.2.1 安装react-router-dom

```
npm install --save react-router-dom
```

#### 2.2.2 嵌套路由使用



#### 2.2.3 向路由组件传递参数数据



#### 2.2.4 多种路由跳转方式



## 3 react-router-v6





## 4 实例-react-router实现前端路由鉴权

相关参考：

​	使用React-Router实现前端路由鉴权：https://juejin.cn/post/6854573217445740557#comment