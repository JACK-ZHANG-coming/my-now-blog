---
slug: 浏览器自带api语音播报speechSynthesis.speak()无法自动播报问题分析及非完美解决方案
title: 浏览器自带api语音播报speechSynthesis.speak()无法自动播报问题分析及非完美解决方案
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 浏览器自带api语音播报speechSynthesis.speak()无法自动播报问题分析及非完美解决方案
tags: [前端, javascript]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a54b1f3f147a4fb5b7ab0378b372ab1a~tplv-k3u1fbpfcp-zoom-1.image)

## 1 需求描述

最近遇到一个需求，就是前端页面要实时监听后端传过来的数据，同时当后端传过来这条数据时前端界面要语音播报这条数据。

## 2 分析与解决方案

这里主要说说语音播报的部分。本来觉得用浏览器自带的 API 来实现直接写一句话就 ok 了，但是没想到居然有一个 bug。那就是这条语音有时候能播报，有时候就没有声音了？为什么呢，**查了半天，是浏览器的安全限制的问题，需要用户交互才能播放声音**，这个问题困扰了一两天，**找到了如下两条解决方案：**

- 第一个就是用按钮点击，当我们播报声音时，第一次播报必须得是用户用交互动作操作才行，显然我这里不能让用户点击，因为它是后台自动播报的，嘿嘿，这可难不到我，写了个模拟按钮点击事件，就 ok 啦~

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>语音播报</title>
  </head>
  <body>
    <h3>点击下方按钮可以进行语音播报</h3>
    <hr />
    <button onclick="areSpeak('哈哈哈哈哈，这是声音~')">播放声音</button>&nbsp;&nbsp;<button onclick="beQuiet()">停止播放</button>
  </body>
  <script>
    //#region 语音播报封装
    const areSpeak = newMsg => {
      // 初次播报使用模拟按钮触发
      virtualClick(SpeakVoice)
      speakWithDelay(newMsg)
    }

    /**
     * 语音播报
     * @param msg 播报的信息
     */
    const SpeakVoice = (msg = '') => {
      const speech = new SpeechSynthesisUtterance(msg)
      // 设置兼容中文
      const voices = window.speechSynthesis.getVoices()
      speech.voice = voices.filter(function (voice) {
        return voice.localService == true && voice.lang == 'zh-CN'
      })[0]
      window.speechSynthesis.speak(speech)
    }

    /**
     * 语音播报 带延迟 异步
     * 搭配async await
     * @param msg 播报的信息
     */
    const speakWithDelay = (utterance, delay = 1000) => {
      return new Promise(resolve => {
        const speech = new SpeechSynthesisUtterance(utterance)
        // 设置兼容中文
        let voices = window.speechSynthesis.getVoices()
        speech.voice = voices.filter(function (voice) {
          return voice.localService == true && voice.lang == 'zh-CN'
        })[0]
        speech.onend = () => {
          setTimeout(resolve, delay)
        }
        window.speechSynthesis.speak(speech)
      })
    }

    /**
     * 模拟按钮点击
     * @param callback
     */
    const virtualClick = callback => {
      let button = document.createElement('button')
      button.textContent = '点击我'

      // 添加点击事件处理程序
      button.addEventListener('click', function () {
        console.log('按钮被点击了')
        callback && callback()
      })

      // 模拟用户点击事件
      let event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })
      button.dispatchEvent(event)
    }

    const beQuiet = () => {
      console.log('停止')
      window.speechSynthesis.cancel()
      SpeakVoice('')
    }
    //#endregion
  </script>
</html>
```

- 第二种解决方案就是用其他第三方的库，不过基于浏览器的安全限制，可能也会存在无法在后台自动播放的情况，所以这里还是没有采用其他第三方的库。

## 3 参考链接

官方文档：

​ [https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis)

其他小伙伴的博客：

​ [https://blog.csdn.net/pridas/article/details/119097189](https://blog.csdn.net/pridas/article/details/119097189)

​ [https://blog.csdn.net/qq_47247479/article/details/126933326](https://blog.csdn.net/qq_47247479/article/details/126933326)

## 4 源码地址

[https://github.com/JACK-ZHANG-coming/frontEnd-all-knowledge/tree/master/examples/funnyDemo/a05%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%8A%A5%E5%8A%9F%E8%83%BD](https://github.com/JACK-ZHANG-coming/frontEnd-all-knowledge/tree/master/examples/funnyDemo/a05%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%8A%A5%E5%8A%9F%E8%83%BD)

如果屏幕前的小伙伴有什么好的解决方案也可以分享一下哦
