---
slug: 一文学会ajax基础使用与使用nodejs搭建一个后端服务
title: 一文学会ajax基础使用与使用nodejs搭建一个后端服务
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 一文学会ajax基础使用与使用nodejs搭建一个后端服务
tags: [前端, ajax, node.js]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# 一文学会 ajax 基础使用与使用 nodejs 搭建一个后端服务

## 写在前面

> - 本文对应的 github 代码仓库地址
>
>   <https://github.com/front-end-study-GoGoGo/ajax-study-demo>
>
> - 本文对应的视频教程地址：
>
>   <https://www.bilibili.com/video/BV1yW4y137R5>
>
> - 博主个人前端网站：[zhangqiang.hk.cn](https://link.juejin.cn/?target=https%3A%2F%2Fzhangqiang.hk.cn)
>
> - 欢迎加入博主的前端学习 qq 交流群：：[706947563](https://link.juejin.cn/?target=https%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Fk%3DEbeK9mdG0e6P2pZdonIoILPqcGNsnR1x%26jump_from%3Dwebapi)，**专注前端开发，共同学习进步啊 ~**

## 简介

> AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
>
> AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
>
> AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。
>
> AJAX 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行。
>
> XMLHttpRequest 只是实现 Ajax 的一种方式。

上面是来自[菜鸟教程](https://www.runoob.com/ajax/ajax-tutorial.html)的简介，用白话文概括呢，ajax 是 javascript 里面内置的一种异步方法实现方式，用 XMLHttpRequest 对象可以来实现这种异步方式。目前我们主流的前端接口请求方式**fetch、axios** 都是基于 ajax 封装的，所以了解 ajax 的使用对于解读 fetch 与 axios 的源码也是必不可少的。

**In short**，学习 ajax 的使用是很重要的。

## 0 准备工作

首先，执行个小目标，我们**在本地先快速起一个后端服务**，使前端可以调到这个接口，很简单，请看下面的操作：

打开我们的 vscode（如果你使用的是 webstorm 也是一样的操作，不过很推荐 vscode 呀，干净简洁很喜欢~）,执行`npm init`初始化一下 npm 配置（在这之前要确保电脑上已经安装 node.js，可以在终端输入 node -v 查看，有版本号说明已经安装）：

0.1 npm 初始化

- node -v 有版本号显示说明已经安装 node.js

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13f09f3924df4e2ba315cc75842377df~tplv-k3u1fbpfcp-watermark.image?)

- 执行 npm init，一路回车就完事了，然后我们可以看到所在文件夹里面会有个 package.json 文件，说明 npm init 初始化成功。之后安装的 npm 包版本都可以在 package.json 里面查看到。

![image-20230113150934180](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c63118b3b346cea844aad73709778a~tplv-k3u1fbpfcp-zoom-1.image)

0.2 安装 express

在终端执行`npm install express`，安装 express，这是一个库可以让我们用 node.js 启动一个后端服务器，当这个后端服务启动的时候，我们就可以通过前端代码请求它暴露出来的接口访问到相应的后端服务。

0.2.1 如果安装成功的小伙伴不用看这个小点，我在安装的时候遇到了这个报错，分析一下是因为 npm 的源是国外的原因，所以我将其设置成了淘宝镜像

![image-20230113152632762](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0051ef0b57b4cb79b05497876e8cac0~tplv-k3u1fbpfcp-zoom-1.image)

设置淘宝镜像命令,在终端执行（下面图片里面有）：

```
npm config set registry https://registry.npm.taobao.org
```

0.2.1 安装成功

![image-20230113152715760](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf56f3cbf37a4134a92f58f6f21eca92~tplv-k3u1fbpfcp-zoom-1.image)

**顺便再装个库，`npm install body-parser` ，** 后面会有用，针对 post 请求的

![image-20230113215801561](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50cde2f6109945a0bdbb2b42ac034919~tplv-k3u1fbpfcp-zoom-1.image)

0.2.2 启动 node 后端服务

我们创建一个文件夹 src，在 src 下面建个 server.js 的文件，然后再粘贴下方的代码到 server.js 文件里面

```
//1. 引入express
const express = require('express');
​
//2. 创建应用对象
const app = express();
​
//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体 这里是返回给前端的内容
    response.send('哈哈哈，接口请求成功，这一串文字是接口返回的数据~~');
});
​
//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});
```

![image-20230113153544950](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6404e23014854aeab8e8b73250ef6e89~tplv-k3u1fbpfcp-zoom-1.image)

终端进入 src 这个文件夹，然后执行`node server.js`，启动后端服务

![image-20230113154009446](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00cfb9f5f74840f4829d8839e95dd993~tplv-k3u1fbpfcp-zoom-1.image)

如上图，我们已经在本地打开了 8000 端口，同时写了个`/server` get 类型的接口地址，我们可以直接通过浏览器来访问`http://127.0.0.1:8000/server`测试一下接口，如果我们看到下图这样，说明后端服务开启成功~

![image-20230113154625311](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d27f8851264d404b8ca6f3a4d7c591d7~tplv-k3u1fbpfcp-zoom-1.image)

ok，后端服务启动完毕！~ 还是很厉害的嘛，我们进入下个流程~~ 前端写 ajax 请求。

## 1 写个简单的 ajax 请求

### 1.1 get 请求 与 post 请求

#### 1.1.1 前端代码

```
<!DOCTYPE html>
<html lang="en">
​
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ajax使用</title>
    <style>
        .mainContainer {
            font-size: 20px;
        }
    </style>
</head>
​
<body>
    <div class="mainContainer">
        <div>右键打开控制台查看ajax网络请求</div>
        <button>点击发送GET请求</button>
        <button>02点击发送带参数的GET请求</button>
        <button>03点击发送带参数的POST请求</button>
    </div>
​
    <script>
​
        //获取button元素
        const btn = document.getElementsByTagName('button')[0]
        //绑定事件
        btn.onclick = function () {
            //1. 创建对象
            const xhr = new XMLHttpRequest()
            //2. 初始化 设置请求方法和 url
            xhr.open('GET', 'http://127.0.0.1:8000/server')
            //3. 发送
            xhr.send()
            //4. 事件绑定 处理服务端返回的结果
            // on  when 当....时候
            // readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
            // change  改变
            xhr.onreadystatechange = function () {
                //判断 (服务端返回了所有的结果)
                if (xhr.readyState === 4) {
                    //判断响应状态码 200  404  403 401 500
                    // 2xx 成功
                    if (xhr.status >= 200 && xhr.status < 300) {
                        //处理结果  行 头 空行 体
                        //响应
                        // console.log(xhr.status);//状态码
                        // console.log(xhr.statusText);//状态字符串
                        // console.log(xhr.getAllResponseHeaders());//所有响应头
                        // console.log(xhr.response);//响应体
                        //设置 result 的文本
                        console.log(`${btn.textContent}返回回来的数据：`, xhr.response)
                    } else {
                        console.log('接口请求失败', btn.textContent)
                    }
                }
            }
        }
​
        // 02点击发送带参数的GET请求
        const btn2 = document.getElementsByTagName('button')[1];
        //绑定事件
        btn2.onclick = function () {
            //1. 创建对象
            const xhr = new XMLHttpRequest()
            //2. 初始化 设置请求方法和 url
            xhr.open('GET', 'http://127.0.0.1:8000/server/getAndValue?a=100&b=200&c=300');
            //3. 发送
            xhr.send()
            //4. 事件绑定 处理服务端返回的结果
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log(`${btn2.textContent}返回回来的数据：`, xhr.response)
                    } else {
                        console.log('接口请求失败', btn2.textContent)
                    }
                }
            }
        }
​
        // 03点击发送带参数的post请求
        const btn3 = document.getElementsByTagName('button')[2];
        //绑定事件
        btn3.onclick = function () {
            //1. 创建对象
            const xhr = new XMLHttpRequest()
            //2. 初始化 设置请求方法和 url
            xhr.open('POST', 'http://127.0.0.1:8000/server/postAndValue');
            //设置请求头  post请求要设置请求头，以form表单的形式传参
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //3. 发送
            xhr.send('a=100&b=200&c=30000000000111')
            //4. 事件绑定 处理服务端返回的结果
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log(`${btn3.textContent}返回回来的数据：`, xhr.response)
                    } else {
                        console.log('接口请求失败', btn3.textContent)
                    }
                }
            }
        }
    </script>
</body>
​
</html>
```

#### 1.1.2 后端代码

```
//1. 引入express
const express = require('express');
​
const bodyParser = require('body-parser'); // 使用express中间件，以解决post请求后端获取不到值问题
​
//2. 创建应用对象
const app = express();
​
// 下面这两句话是针对post请求加的， req.body是解析json的结果，一定加上这么2句，否则post请求获取不到req.body的  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
​
//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应体 这里是返回给前端的内容
    response.send('哈哈哈，接口请求成功，这一串文字是接口返回的数据~~');
});
​
// 3.2 get带参数的接口
app.get('/server/getAndValue', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体 这里是返回给前端的内容
    let result = request.query;
    if (result.a !== undefined) {
        result.a = result.a + 10000
    }
    response.send(result);
});
​
// 3.2 get带参数的接口
app.get('/server/getAndValue', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体 这里是返回给前端的内容
    let result = request.query;
    if (result.a !== undefined) {
        result.a = result.a + 10000
    }
    response.send(result);
});
​
​
// 3.2 post带参数的接口
app.all('/server/postAndValue', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // response.header('Access-Control-Allow-Headers', 'Content-Type')
    //设置响应体 这里是返回给前端的内容
    let result = request.body;
    console.log('postAndValue--->', result)
    response.send(request.body);
});
​
​
//4. 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动, 8000 端口监听中....");
});
```

#### 1.2.3 运行结果

![image-20230113220628033](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b28651d0039b4e588daf99074456e9a9~tplv-k3u1fbpfcp-zoom-1.image)

## 2 相关参考手册

### 2.1 XMLHttpRequest 对象的方法

| 方法                                          | 描述                                                                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| abort()                                       | 取消当前请求                                                                                                               |
| getAllResponseHeaders()                       | 返回头部信息                                                                                                               |
| getResponseHeader()                           | 返回特定的头部信息                                                                                                         |
| open(_method_, _url_, _async_, _user_, _psw_) | 规定请求 method：请求类型 GET 或 POSTurl：文件位置 async：true（异步）或 false（同步）user：可选的用户名称 psw：可选的密码 |
| send()                                        | 将请求发送到服务器，用于 GET 请求                                                                                          |
| send(_string_)                                | 将请求发送到服务器，用于 POST 请求                                                                                         |
| setRequestHeader()                            | 设置请求头，向要发送的报头添加标签/值对                                                                                    |

### 2.2 XMLHttpRequest 对象的属性

| 属性               | 描述                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| onreadystatechange | 定义当 readyState 属性发生变化时被调用的函数                                                                            |
| readyState         | 保存 XMLHttpRequest 的状态。0：请求未初始化 1：服务器连接已建立 2：请求已收到 3：正在处理请求 4：请求已完成且响应已就绪 |
| responseText       | 以字符串返回响应数据                                                                                                    |
| responseXML        | 以 XML 数据返回响应数据                                                                                                 |
| response           | 以原格式返回响应数据，可以理解为后端返回的数据格式是啥那就是啥                                                          |
| status             | 返回请求的状态号 200: "OK"403: "Forbidden"404: "Not Found"                                                              |
| statusText         | 返回状态文本（比如 "OK" 或 "Not Found"）                                                                                |

### 2.3 http 状态码

#### 1xx: 信息

| 消息:                   | 描述:                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------- |
| 100 Continue            | 服务器仅接收到部分请求，但是一旦服务器并没有拒绝该请求，客户端应该继续发送其余的请求。 |
| 101 Switching Protocols | 服务器转换协议：服务器将遵从客户的请求转换到另外一种协议。                             |

#### 2xx: 成功

| 消息:                             | 描述:                                                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 200 OK                            | 请求成功（其后是对 GET 和 POST 请求的应答文档。）                                                                             |
| 201 Created                       | 请求被创建完成，同时新的资源被创建。                                                                                          |
| 202 Accepted                      | 供处理的请求已被接受，但是处理未完成。                                                                                        |
| 203 Non-authoritative Information | 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝。                                                          |
| 204 No Content                    | 没有新文档。浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而 Servlet 可以确定用户文档足够新，这个状态代码是很有用的。 |
| 205 Reset Content                 | 没有新文档。但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容。                                                  |
| 206 Partial Content               | 客户发送了一个带有 Range 头的 GET 请求，服务器完成了它。                                                                      |

#### 3xx: 重定向

| 消息:                  | 描述:                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 300 Multiple Choices   | 多重选择。链接列表。用户可以选择某链接到达目的地。最多允许五个地址。                                                                                                            |
| 301 Moved Permanently  | 所请求的页面已经转移至新的 url。                                                                                                                                                |
| 302 Found              | 所请求的页面已经临时转移至新的 url。                                                                                                                                            |
| 303 See Other          | 所请求的页面可在别的 url 下被找到。                                                                                                                                             |
| 304 Not Modified       | 未按预期修改文档。客户端有缓冲的文档并发出了一个条件性的请求（一般是提供 If-Modified-Since 头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。 |
| 305 Use Proxy          | 客户请求的文档应该通过 Location 头所指明的代理服务器提取。                                                                                                                      |
| 306 _Unused_           | 此代码被用于前一版本。目前已不再使用，但是代码依然被保留。                                                                                                                      |
| 307 Temporary Redirect | 被请求的页面已经临时移至新的 url。                                                                                                                                              |

#### 4xx: 客户端错误

| 消息:                             | 描述:                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 400 Bad Request                   | 服务器未能理解请求。                                                                                       |
| 401 Unauthorized                  | 被请求的页面需要用户名和密码。                                                                             |
| 402 Payment Required              | 此代码尚无法使用。                                                                                         |
| 403 Forbidden                     | 对被请求页面的访问被禁止。                                                                                 |
| 404 Not Found                     | 服务器无法找到被请求的页面。                                                                               |
| 405 Method Not Allowed            | 请求中指定的方法不被允许。                                                                                 |
| 406 Not Acceptable                | 服务器生成的响应无法被客户端所接受。                                                                       |
| 407 Proxy Authentication Required | 用户必须首先使用代理服务器进行验证，这样请求才会被处理。                                                   |
| 408 Request Timeout               | 请求超出了服务器的等待时间。                                                                               |
| 409 Conflict                      | 由于冲突，请求无法被完成。                                                                                 |
| 410 Gone                          | 被请求的页面不可用。                                                                                       |
| 411 Length Required               | "Content-Length" 未被定义。如果无此内容，服务器不会接受请求。                                              |
| 412 Precondition Failed           | 请求中的前提条件被服务器评估为失败。                                                                       |
| 413 Request Entity Too Large      | 由于所请求的实体的太大，服务器不会接受请求。                                                               |
| 414 Request-url Too Long          | 由于 url 太长，服务器不会接受请求。当 post 请求被转换为带有很长的查询信息的 get 请求时，就会发生这种情况。 |
| 415 Unsupported Media Type        | 由于媒介类型不被支持，服务器不会接受请求。                                                                 |
| 416                               | 服务器不能满足客户在请求中指定的 Range 头。                                                                |
| 417 Expectation Failed            |                                                                                                            |

#### 5xx: 服务器错误

| 消息:                          | 描述:                                              |
| ------------------------------ | -------------------------------------------------- |
| 500 Internal Server Error      | 请求未完成。服务器遇到不可预知的情况。             |
| 501 Not Implemented            | 请求未完成。服务器不支持所请求的功能。             |
| 502 Bad Gateway                | 请求未完成。服务器从上游服务器收到一个无效的响应。 |
| 503 Service Unavailable        | 请求未完成。服务器临时过载或当机。                 |
| 504 Gateway Timeout            | 网关超时。                                         |
| 505 HTTP Version Not Supported | 服务器不支持请求中指明的 HTTP 协议版本。           |
