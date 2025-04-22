---
slug: 前端 SSE 流式接口请求处理实践教程
title: 前端 SSE 流式接口请求处理实践教程
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 前端 SSE 流式接口请求处理实践教程
tags: [SSE, 接口请求]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# 前端 SSE 流式接口请求处理实践教程

## 一、前言

在现代 Web 应用中，实时数据更新越来越普遍。比如在聊天、股票行情、系统监控甚至 GPT 流式回复中，用户体验要求数据能边生成边展示。传统 HTTP 请求一次性返回所有数据，很难满足这种需求。而 SSE（Server-Sent Events，服务器发送事件）技术通过建立长连接，让服务器主动向客户端推送数据，完美实现了流式响应。

本文将详细讲解 SSE 的原理、前端如何使用原生 API（EventSource 或基于 fetch 的流处理）来接收流式数据，并给出完整的示例代码和注意事项。

## 二、SSE 概述

SSE（Server-Sent Events）是一种基于 HTTP 协议的单向通信方式，允许服务器通过长连接不断推送文本数据到客户端。其特点包括：

- **单向通信**：只支持服务器向客户端推送消息，客户端如需向服务器发送数据，仍需使用普通 HTTP 请求。
- **长连接机制**：建立连接后，服务器保持通道不断开，直到明确结束或发生异常。
- **自动重连**：当连接中断时，浏览器会自动重连，保证数据实时性。
- **简单易用**：基于 HTTP 协议，无需引入额外的协议支持，兼容性较好（IE/Edge 除外）。

服务端需要在响应头中设置：

```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

数据格式一般遵循如下规则，每条消息由若干行组成，消息之间用两个换行符分隔。例如：

```
data: 这是第一条消息
data: 多行数据可以这样发送

data: 第二条消息
```

## 三、前端实现原理

前端接收 SSE 的核心 API 是浏览器内置的 **EventSource** 对象。使用时只需提供 SSE 接口 URL，然后监听 `onmessage`、`onopen`、`onerror` 等事件即可。

另外，由于 SSE 只支持 GET 请求，如果需要携带额外请求头或使用 POST 传参，可考虑使用 EventSourcePolyfill 或结合 fetch 实现流式处理（例如通过 TextDecoderStream 解析响应流）。

## 四、实战示例

### 4.1 使用 EventSource 实现 SSE 流式数据接收

这是最简单的使用方式。假设后端提供了一个 SSE 接口地址 `http://example.com/sse`：

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>SSE 流式接口示例</title>
  </head>
  <body>
    <h1>实时数据</h1>
    <div id="output"></div>

    <script>
      // 创建 EventSource 实例
      const eventSource = new EventSource('http://example.com/sse')

      // 连接建立时回调
      eventSource.onopen = function (event) {
        console.log('SSE 连接已建立')
      }

      // 接收消息时回调
      eventSource.onmessage = function (event) {
        console.log('收到消息：', event.data)
        const output = document.getElementById('output')
        output.innerHTML += event.data + '<br>'
      }

      // 连接错误时回调
      eventSource.onerror = function (error) {
        console.error('SSE 连接出错：', error)
        // 出现错误后可以选择关闭连接
        eventSource.close()
      }
    </script>
  </body>
</html>
```

在这个示例中，前端建立了一个 SSE 长连接，服务器推送的数据会以事件的形式自动触发 `onmessage` 回调，数据实时显示在页面上。

### 4.2 使用 fetch 处理流式响应（扩展方案）

部分场景下（例如需要携带 POST 参数），可以使用 fetch 发起请求，然后结合 Web Streams API 对响应进行流式处理。示例如下：

```javascript
// 使用 fetch 请求 SSE 接口（注意：服务器需返回 text/event-stream 格式数据）
fetch('http://example.com/sse', {
  method: 'GET',
  headers: {
    Accept: 'text/event-stream'
  }
})
  .then(response => {
    if (!response.body) {
      throw new Error('响应流为空')
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    // 循环读取数据块
    function read() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            console.log('数据读取完毕')
            return
          }
          const chunk = decoder.decode(value, { stream: true })
          console.log('收到流数据：', chunk)
          // 这里可以对 chunk 进行分段处理，例如 split('\n\n')
          document.getElementById('output').innerHTML += chunk.replace(/\n/g, '<br>') + '<br>'
          read() // 继续读取下一块数据
        })
        .catch(error => {
          console.error('读取流错误：', error)
        })
    }

    read()
  })
  .catch(error => {
    console.error('fetch 请求出错：', error)
  })
```

这种方式灵活性更高，但需要自己解析数据流的格式（例如每条 SSE 消息通常以 `data: ` 开头并以两个换行符结尾）。

### 4.3 结合 Ant Design X Vue 来使用

[Ant Design X Vue](https://antd-design-x-vue.netlify.app/) 是 Ant Design 团队专门为规范 AI 界面设计打造的一个组件库。

**SSE 流式接口请求**

```js
// 建立请求连接
const response = await OllamaApiTest({
    message: message,
});
const stream = XStream({
    readableStream: response.body as ReadableStream<Uint8Array>,
});
const reader = stream.getReader();
```

**AI 聊天界面接收信息流式输出**

```js
while (reader) {
  const { value, done, timeoutFlag = false }: any = await Promise.race([reader.read(), timeoutPromise])
  if (done) {
    senderLoading.value = false
    onSuccess(current)
    break
  }
  if (timeoutFlag) {
    // 超时处理
    senderLoading.value = false
    current.event_data.content = '请求超时，请重试'
    onSuccess(current)
    break
  }
  if (!value) continue
  const data = JSON.parse(value.data)
  if (data?.event_data?.content_type == 'Text') {
    current.event_data.content = current.event_data.content + (data?.event_data?.content || '')
    current.event_data.content_type = data?.event_data?.content_type || ''
    current.message_id = data?.message_id || ''
    current.message_status = data?.message_status || ''
  }
  // 聊天界面流式输出
  onUpdate(current)
}
```

参考教程链接：

https://antd-design-x-vue.netlify.app/component/use-x-chat.html#%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA

https://antd-design-x-vue.netlify.app/component/x-stream.html#%E9%BB%98%E8%AE%A4%E5%8D%8F%E8%AE%AE-sse

## 五、常见问题与注意事项

1. **请求方法限制**
   SSE 原生只支持 GET 请求。如果需要发送 POST 请求或者携带自定义请求头，建议使用 [EventSourcePolyfill](https://github.com/Yaffle/EventSource) 或者结合 fetch 实现流式响应处理。
2. **自动重连**
   浏览器内置的 EventSource 会在连接中断后自动重连，但这也可能导致“重复连接”的问题。需要在 onerror 中根据实际情况判断是否手动关闭连接。
3. **数据格式解析**
   服务器返回的数据格式必须符合 SSE 协议规范。若返回数据分块不完整，可使用字符串分割（例如通过 `split('\n\n')`）来确保每条消息完整解析。
4. **跨域问题**
   如果前后端分离部署，注意配置 CORS，确保 SSE 请求允许跨域访问。

## 六、总结

本文详细介绍了 SSE 的基本原理及其在前端的实现方式。

- 通过 EventSource 建立长连接，前端能够实时监听服务器推送的事件。
- 如果需要更灵活的处理（如 POST 请求、携带请求头），可以结合 fetch 与 Web Streams API 实现流式数据解析。

希望通过本教程，你能快速掌握 SSE 的前端实现技巧，打造更流畅的实时交互体验！

## 七、比较火的插件分享

github 时下比较流行的库 https://github.com/trending?since=daily
