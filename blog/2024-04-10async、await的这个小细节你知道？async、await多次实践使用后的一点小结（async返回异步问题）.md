---
slug: async、await的这个小细节你知道？async、await多次实践使用后的一点小结（async返回异步问题）
title: async、await的这个小细节你知道？async、await多次实践使用后的一点小结（async返回异步问题）
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: async、await的这个小细节你知道？async、await多次实践使用后的一点小结（async返回异步问题）
tags: [前端, vscode, ES6, javascript, async, await]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# async、await 的这个小细节你知道？async、await 多次实践使用后的一点小结（async 返回异步问题）

## 前言

我们都知道**async、await 是用来将“同步函数变成异步函数，可以同步获取到里面异步函数的返回值”的**，比如我们在请求一个接口的时候，这个接口的返回值是一个异步的，那我们就可以用 await 将这个异步接口返回变成同步，使我们可以同步的获取到接口的返回值，然后在紧接着的下文中就可以直接用这个接口的返回值。

## 一 实例 1

循序渐进，先上一个简单的代码

```typescript
const asyncFun = (value: number) => {
  return new Promise((resolve, reject) => {
    // 模拟一个异步请求
    setTimeout(() => {
      resolve(value + 1)
    }, 2000)
  })
}

const getValue = async () => {
  let result = await asyncFun(1)
  console.log('result:', result)
}

getValue() // result:2
```

如上图代码，输出的结果是

```
result: 2
```

我们来浅分析一下这段代码，这段代码其实我们是模拟了一个接口请求的操作，`asyncFun(value: number)`返回一个 Promise，Promise 就代表这个结果是一个异步的，当我们调用这个函数时得到的结果就会等**所有同步代码执行完**以后才会得到这个 Promise 的结果。

如果我们调用`asyncFun(value: number)`这个函数想要**同步**获取到里面的结果，获取完这个结果后，紧接着**同步**执行下面的代码，那我们就要使用`async`、`await` 来解决，这是`ES6` 推出的新语法，好用的很啊，但是也有一些细节需要注意（下文会提到）。

所以我们在使用`getValue()` 这个函数调用`asyncFun(value: number)`时，首先在`getValue()`函数头部加了 async，**声明咱这个函数是一个异步函数**，这样在这个函数里面我们就可以用**`await`**将异步的返回值转为同步获取到了，所以`await asyncFun(1);` 的意思是等这里完全执行完（2 秒之后），获取到`value+1`这个具体数值，然后才会执行`console.log('result:', result);` 这句话。

所以上面这段代码最后输出的就是

```
result: 2
```

## 二 实例 2（踩坑记录）

同样的，咱们也是直接上代码块，大家看一下这段代码输出的是个啥：

```typescript
const asyncFun = (value: number) => {
  return new Promise((resolve, reject) => {
    // 模拟一个异步请求
    setTimeout(() => {
      resolve(value + 1)
    }, 2000)
  })
}

const getValue = async () => {
  let result = await asyncFun(1)
  return result
}

const add666Value = () => {
  let result: any = getValue()
  result = result + '666'
  console.log('result:', result)
}

add666Value()
```

上面这段代码就是将`getValue()`方法又封装了一遍，得到这个结果，然后再去输出这个结果，那么大家觉得这个是个啥值呢？可能有的人会认为输出的是`result: 2666`，其实不然，真正输出的结果是：

```
result: [object Promise]666
```

嘿嘿，这是为啥呢？这就是**前面说的那个小细节**了，**使用 `async` 声明的函数其返回值是一个 Promise**。通常我们写一个普通函数，想 return 啥它就能直接 return 啥，但是只要在这个函数头上加了 `async` ，那它就会返回 Promise 类型，这个**函数的返回值就是一个异步的了**，等到所有同步函数执行完以后才会等到里面的确切值。

比如这个小例子 1：

```typescript
const littleExample1 = () => {
  const a = 1
  return a
}
```

这个`littleExample1()`的返回值就是一个 number 类型的 1;

而看下面这个小例子 2：

```typescript
const littleExample2 = async () => {
  const a = 1
  return a
}
```

嘿，这个小例子 2 返回的就是个 Promise 了，你就说细节不细节，之前都没关注过，但这个场景确实在实际使用中有用到的，然后我就说为啥返回值不是预期的值呢，结果一排查就是这个 `async` 的原因。

## 三 实例 2 解决方案

话不多说，我们来看看 `实例2` 中的代码块如何处理才能得到一个我们预期的值，也就是： `result: 2666` ，直接上代码：

```typescript
const asyncFun = (value: number) => {
  return new Promise((resolve, reject) => {
    // 模拟一个异步请求
    setTimeout(() => {
      resolve(value + 1)
    }, 2000)
  })
}

const getValue = async () => {
  let result = await asyncFun(1)
  return result
}

const add666Value = async () => {
  let result: any = await getValue()
  result = result + '666'
  console.log('result:', result)
}

add666Value()
```

ok，这样子就是我们预期的输出结果了，也就是我们将`add666Value()`前面加了个 `async` ，将其声明为**`异步函数`** ，`getValue()`前面再加个`await` ,这样`getValue()`返回的结果就不是 Promise 了，result 就可以得到一个 number 类型的 2，number 类型+string 类型时前面的 number 类型会变成 string 类型，相当于'2'+'666'，所以最终输出的结果就是：

```
result: 2666
```

至此，`async`返回异步问题已解决。

## 四 加强记忆

知识点参考：

- AsyncFunction

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
