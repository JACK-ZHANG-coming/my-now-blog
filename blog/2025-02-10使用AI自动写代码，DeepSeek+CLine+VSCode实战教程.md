---
slug: 使用AI自动写代码，DeepSeek+CLine+VSCode实战教程
title: 使用AI自动写代码，DeepSeek+CLine+VSCode实战教程
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 使用AI自动写代码，DeepSeek+CLine+VSCode实战教程
tags: [AI, deepseek, cline, vscode]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# 使用 AI 自动写代码，DeepSeek+CLine+VSCode 实战教程

## 0 前言

最近 DeepSeek 火了起来，各个媒体都在宣传，那 DeekSeek 到底是个啥？从程序员角度来看：DeepSeek 一个人工智能助手，可以帮助我们解决代码知识点疑问，以及某个晦涩难懂的知识点问题，处理生活中的一些文本信息问题等。

其实这些能力早在数年前 ChatGPT 也已经具备了，那么为什么最近 DeepSeek 这么火呢？一个原因就是因为它是国产的，那必须得支持。还有一个原因就是它实惠呀，便宜！目测目前比 ChatGPT 要便宜了近 10 倍不止吧~ 咱能用得起了…… 在价格下降的同时，表现的能力也是越来越聪明。

下面主要是介绍 DeepSeek+CLine+VSCode 的实战教程，所表现出了的能力也是相当出色的，可以直接操控我们的编译器来写代码， 自动写代码！也就是说它除了回答我们一些专业问题之外，还可以直接对我们的文件目录及文件内容进行增删改查！

## 1 先上结果

[![pEnSBqJ.png](https://s21.ax1x.com/2025/02/09/pEnSBqJ.png)](https://imgse.com/i/pEnSBqJ)](https://imgse.com/i/pEnSBqJ)

## 2 注册使用 deepseek 模型的账号

这里注册 deepseek 账号我们可以选择在其官网上注册使用，也可以选择在其他平台上注册使用。但是现在 deepseek 官网因为频繁受到某国不知名网络的攻击已经关闭了新的注册入口。

现在主要是来介绍在华为云上面的注册方法，使用的效果也是相当可以的，华为云也是相对稳定一些。

**首先点击下面的链接可以注册个账号，现在注册可以免费获得 14 块钱的使用额度：**

**https://cloud.siliconflow.cn/i/10XZLZAC**

## 3 创建秘钥

我们注册好账号后，再来创建一个 API 秘钥，后面要用到

[![pEnStP0.png](https://s21.ax1x.com/2025/02/09/pEnStP0.png)](https://imgse.com/i/pEnStP0)](https://imgse.com/i/pEnStP0)

## 4 vscode 安装 cline 及配置 deepseek 模型

刚刚的账号及 API 秘钥弄好以后，我们来到 vscode

### 4.1 在 vscode 中安装 cline 插件

安装一个 cline 插件，这个插件可以自动操作我们的 vscode 终端，配合 deepseek、chatgpt 这个 AI 助手来使用效果相当强劲

[![pEnSbJP.png](https://s21.ax1x.com/2025/02/09/pEnSbJP.png)](https://imgse.com/i/pEnSbJP)

### 4.2 配置 deepseek 模型

下载好 cline 插件后，我们点击 vscode 侧边栏的 cline 的界面，在里面配置 deepseek 模型，见图 4-2-1

[![pEnSqRf.png](https://s21.ax1x.com/2025/02/09/pEnSqRf.png)](https://imgse.com/i/pEnSqRf)

（图 4-2-1）

图 4-2-1 里面 2.2 文字内容：

```
https://api.siliconflow.cn/v1
```

图 4-2-1 里面的 2.3 秘钥就是之前我们创建的那个秘钥

图 4-2-1 里面的 2.4 内容，我选的是 deepseek 最聪明的（最贵的）那个模型：

```
deepseek-ai/DeepSeek-R1
```

配置完以后我们带点击一下那个“Done”按钮，就会保存我们的配置。

## 5 开始使用 vscode+cline+deepseek 写代码

刚刚我们都已经配置好了，现在开始使用

[![pEnSXQS.png](https://s21.ax1x.com/2025/02/09/pEnSXQS.png)](https://imgse.com/i/pEnSXQS)

[![pEnSvLQ.png](https://s21.ax1x.com/2025/02/09/pEnSvLQ.png)](https://imgse.com/i/pEnSvLQ)

ok，到这里已经配置完成啦~ 可以体验 AI 写代码的魅力了~
