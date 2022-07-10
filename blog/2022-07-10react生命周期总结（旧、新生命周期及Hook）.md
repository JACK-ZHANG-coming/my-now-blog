---
slug: react生命周期总结（旧、新生命周期及Hook）
title: react生命周期总结（旧、新生命周期及Hook）
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: react生命周期总结（旧、新生命周期及Hook）。
tags: [前端, react]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

<!-- truncate -->

# react生命周期总结（旧、新生命周期及Hook）

## 1 理解生命周期

什么是react生命周期呢？当我们使用各种框架开发程序时，当这个框架启动、程序刚运行时、各个页面之间的交互、数据渲染到页面上面、程序运行结束，应当会有个闭环的操作，而在这个环的起点和终点之间的各个节点，框架给给定一些特定函数供我们自行调用，方便我们执行一些操作，这便是生命周期。react也是如此。

> 附带样例源码地址：https://github.com/JACK-ZHANG-coming/react-demo-project/blob/master/src/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9Fdemo/index.jsx

## 2 react有哪些生命周期函数与作用

### 2.1 react 17版本之前



![img](https://cdn.nlark.com/yuque/0/2022/png/22565604/1656945408594-7187c2e7-10b6-42f4-813e-098d77d8b80b.png)

主要分为三个阶段 **初始化阶段**、**更新阶段**、**卸载组件**。

- **初始化阶段:** 也称为组件挂载时的阶段，这个阶段会执行我们在**初次加载组件到组件第一次渲染在界面上面期间**的一系列钩子函数。

执行的流程为：constructor->componentWillMount->render->componentDidMount

 	1. `constructor` 这是一个构造器，这里面可以接收一个父组件传来的props然后初始化state值。		

```
constructor(props) {
  super(props)
  this.state = {
  a: 0
  }
  console.log('constructor执行了')
}
```

 	2. `componentWillMount` 组件将要挂载，这个是在执行render之前会执行这个函数，也就说会在渲染浏览器dom之前执行这个函数，个人认为这个函数没有多大实际意义，用的比较少。
 	3. `render` **常用且重要**的钩子函数之一。在这里面我们会写一些html标签及自定义的函数，render执行完后便会将这些语句对应渲染到浏览器上面，用户就可以看到我们写的东西了。
 	4. `componentDidMount` 常用的钩子，组件挂载完毕执行，也就在render执行完之后之后，因为render执行了，浏览器的dom树已经有了，所以我们便可以在这里操作dom和ref（react的一个特性，代替dom操作，因为react不提倡直接操作dom嘛）。**通常在这个钩子函数里面我们请求一些后端接口数据，来初次渲染我们页面**。

- **更新阶段：**  什么时候会执行更新阶段这一系列的钩子函数呢，那自然是我们在更新了state值的时候或者是接收到父组件props值的时候，就是`this.setState({})`这个。

  这个阶段常规流程是：componentWillReceiveProps->shouldComponentUpdate->componentWillUpdate->render->componentDidUpdate

  1.  `componentWillReceiveProps` 当子组件收到父组件传过来的props，会执行这个函数。

2. `shouldComponentUpdate` 当更新state值的时候会执行这个函数，比如`this.setState({})`。
3. `componentWillUpdate` 执行render前的一个钩子函数，里面会有两个参数`componentWillUpdate(nextProps, nextState)`，这是将要渲染的props和state的值，在react17中将要弃用这个钩子，执行 `this.forceUpdate()` 可以直接从这个钩子函数节点开始执行。
4. `render` 和初始化时候执行的那个render一样，只是这里是更新值的，所以dom节点会重新更新一下。
5. `componentDidUpdate `组件更新完毕执行的钩子函数。

- **卸载组件：**当组件卸载时执行的钩子函数，这里只有一个，那就是`componentWillUnmount`，一般我们在这个函数里面关闭一些定时器或其他收尾的操作。

### 2.2 react 17版本之后（包括）

![img](https://cdn.nlark.com/yuque/0/2022/png/22565604/1656977515120-9ce187b3-8f13-4da3-aacf-454bf203350d.png)

在新的生命周期中，react弃用了`componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate`这三个钩子，取而代之的是`getDerivedStateFromProps`,其实就是把那三个钩子的含义融入到了这一个钩子中，写法如下：

```
static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps---props, state:', props, state)
    // 如果return null 则依然以原来的规则更新state，否则会锁定更新state
    return null
    // return {a:11}
 }
```

另外还新增了一个钩子，`getSnapshotBeforeUpdate`，这里可获取到即将要更新的props和state

```
 getSnapshotBeforeUpdate(prevProps, prevState) {
   console.log('getSnapshotBeforeUpdate---prevProps:,prevState:', prevProps, prevState)
   return null
 }
```

其他和原来的生命周期一致。

## 3 react 函数组件中的hook 与 class组件生命周期函数的比较

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

在Hook中，我们写的都是函数组件，也就没有了类组件这些生命周期钩子，但是取而代之的是Hook提供的一些钩子，其含义也和类组件里面的生命周期函数类似，但是更好用，写起来更方便。

比如：`useState`、`useEffect`等。

更多详细的可以看官方文档或其他文档及视频，这里只是提一下。

## 4 参考文章

- [1] React 官方文档：https://zh-hans.reactjs.org/docs/state-and-lifecycle.html
- [2] 尚硅谷React教程 ：https://www.bilibili.com/video/BV1wy4y1D7JT?p=37&vd_source=e248443ed146cfdb38797f0fa5dca3da
- [3] 南果梨.getDerivedStateFromProps[CP/OL].https://juejin.cn/post/6844903857550688269