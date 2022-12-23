---
slug: react高阶组件概念与简单使用
title: react高阶组件概念与简单使用
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: react高阶组件概念与简单使用
tags: [前端, react]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

<!-- truncate -->
> 我的博客即将同步至腾讯云开发者社区，邀请大家一同入驻：https://cloud.tencent.com/developer/support-plan?invite_code=13fmu8we7j7e

# react 高阶组件概念与简单使用

## 1 react 高阶组件是什么

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。
>
> 具体而言，**高阶组件是参数为组件，返回值为新组件的函数。**

上面这段话是来自[react 官网](https://zh-hans.reactjs.org/docs/higher-order-components.html)的介绍，下面是个人消化后的理解：

它是一个**函数**，接收一个参数，这个**参数是组件**，然后再**返回一个新组件**（返回的这个组件里会含有处理过的 state 值）；

归其缘由，它是一种设计思想，它将多个组件中公共的逻辑部分抽离出来封装成了一个函数，这个函数接收那多个组件中的一个组件作为参数，然后再返回这个组件，从而实现多个组件中那个组件的最终效果。

## 2 react 高阶组件作用

- 精简代码，封装复用逻辑

​ ...

## 3 简单实现 react 高阶组件

```react
/**
 * 需求简述：
 * 实现两个组件文本框，
 * 一个组件为外边框为1px绿色、里面显示内容为当前浏览器的高宽；
 * 另一个组件为外边框2px红色、里面内容为当前浏览器的高宽。
 */

import React, { useState, useEffect } from 'react'


const WithShowBodySize = (Component) => {

  const [xPos, setXPos] = useState('');
  const [yPos, setYPos] = useState('');

  const getPos = () => {
    setXPos(document.body.offsetWidth);
    setYPos(document.body.offsetHeight);
  }

  useEffect(() => {
    console.log('WithShowBodySize');
    getPos()
    window.addEventListener('resize', getPos);
    return () => {
      window.removeEventListener('resize', () => {
        console.log('resize监听事件已移除');
      })
    }
  }, []);

  return (
    <>
      <Component xPos={xPos} yPos={yPos}></Component>
    </>
  )
}

const ShowBodySizeA = (props) => {
  return <div style={{ border: '1px solid yellowGreen' }}>{props?.xPos}-{props?.yPos}</div>
}

const ShowBodySizeB = (props) => {
  return <div style={{ border: '3px solid red' }}>{props?.xPos}-{props?.yPos}</div>
}

const HOCDemo = (props) => {

  const A = WithShowBodySize(ShowBodySizeA);
  const B = WithShowBodySize(ShowBodySizeB);

  useEffect(() => {
    console.log('HOCDemo');
  }, [])

  return (
    <>
      高阶组件思想运用
      <br></br>
      <br></br>
      {A}
      <br></br>
      {B}
    </>
  )
};

export default HOCDemo;

```

## 4 对应本文视频讲解

- react 高阶组件实例讲解

​ https://www.bilibili.com/video/BV1D44y1S7op/?vd_source=e248443ed146cfdb38797f0fa5dca3da

## 5 **插个眼：**

这边看到了篇博客，关于 HOC 讲的很详细，没全明白，等以后再看，看看能不能有更多收获：

- 「react 进阶」一文吃透 React 高阶组件(HOC)：

  https://juejin.cn/post/6940422320427106335#heading-0

**还有个小疑问也记录一下：**

参考文章说“render 中不要声明 HOC”，那以上方代码为例，我用的函数式组件，我不在函数里面引用 HOC 在哪里引用呢？在外面引用的话会报错呀。

还有当我引用两次抽离出来的那个高阶组件 useEffect 会执行两次，引用 n 次高阶组件 useEffect 就会执行 n 次，这种属于高阶组件的正确运用吗，有没有引用 n 次 useEffect 只会执行一次的那种。

![image-20221204213125672](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/imgs/image-20221204213125672.png)
