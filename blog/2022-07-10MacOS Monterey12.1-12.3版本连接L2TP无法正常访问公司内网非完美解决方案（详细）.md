---
slug: MacOS Monterey12.1-12.3版本连接L2TP无法正常访问公司内网非完美解决方案（详细）
title: MacOS Monterey12.1-12.3版本连接L2TP无法正常访问公司内网非完美解决方案（详细）
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: MacOS Monterey12.1-12.3版本连接L2TP无法正常访问公司内网非完美解决方案（详细）。
tags: [前端, 运维]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

<!-- truncate -->
# MacOS Monterey12.1-12.3版本连接L2TP无法正常访问公司内网非完美解决方案（详细）

> 背景：本人最近在用一台2021款的mac连接公司vpn，虽然已经显示连接成功，但是依然无法正常访问公司内网。经过长达1个多月的尝试，终于找到一条可以正常使用vpn的方案，现总结如下：
>
> 1 为苹果官方的bug，等待官方修复；
>
> 2 当前终极解决方案：使用一台iphone手机通过usb连接Mac，作为Mac的网卡，上网，得以正常访问公司内网。

**如果大家还未升级到12.1-12.3版本的，千万不要升级，等版本稳定了再升上来。。。当然，新版mac不支持降级。。**

## 0 特别感谢

首先特别感谢一下 [Carlton Xu](https://blog.csdn.net/xuxingzhuang?type=blog) 大佬的协助，同时也是拜读了Xu大佬的文章才得以解决了这个问题。

## 1 通常连接L2TP解决方案

参考如下：

-   Mac 配置L2TP 隧道连接操作步骤

<https://blog.csdn.net/xuxingzhuang/article/details/122429887?spm=1001.2014.3001.5502>

> 上面这篇博客里面有提到“192.168.10.0 为VPN Server端需要访问的网络地址”这句话，我们公司自己的网络地址为 192.168.8.0
>
> 我直接加了这5条，看起来也没毛病，之后用iphone那个终极解决方案连接电脑也是可以正常访问内外网的
>
> ```
> #!/bin/sh
> # 192.168.8.0 为VPN Server端需要访问的网络地址，如果有多个需要逐条添加；$1 为VPN拨上之后的网卡设置；
> /sbin/route add 192.168.100.0 -interface $1 
> /sbin/route add 192.168.124.0 -interface $1
> /sbin/route add 192.168.8.0 -interface $1
> /sbin/route add 192.168.8.1 -interface $1
> /sbin/route add 192.168.8.155 -interface $1 
> ```

-   MacOS 软件版本更新Monterey12.1版之后L2TP无法正常访问内网服务解决方案

<https://blog.csdn.net/xuxingzhuang/article/details/123846050?spm=1001.2014.3001.5502>

-   更新Monterey后，l2tp VPN连接异常（官方论坛）

<https://discussionschinese.apple.com/thread/253310862?page=3>

<https://discussionschinese.apple.com/thread/253307367?page=2>

## 2 当前针对12.1-12.3版本的终极解决方案

> 好了，在经过各种方法无果后，我们来试一下这个方案。
>
> 用usb连苹果手机上网，首先我们需要一个iphone和一个usb线将手机与mac连接。

### 2.1 关闭mac wifi，打开iphone的热点，用usb线与mac连接。

这个时候在Mac 的“系统偏好设置”->“网络”里面就会自动检测到这个网，然后我们连接它。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37d987302c354eea84012fec12c32c33~tplv-k3u1fbpfcp-watermark.image?)

### 2.2 连接vpn，正常访问公司内网

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0457499f75ec4a84b6401c898cf87ead~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/639ad41d6b684a36be08a61d49f7c2ef~tplv-k3u1fbpfcp-watermark.image?)

### 2.3 内网的ip能访问，但域名不可以问题

我之前出现了在浏览器里面使用ip地址可以访问，是用域名却不可以访问的问题，这个时候我把dns里面只放公司内部的dns，不要放其他杂七杂八的dns就好了。

![image-20220331233904705](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d6850874cc64148a350ba68966f6334~tplv-k3u1fbpfcp-zoom-1.image)

***

ok，到此，我们已经可以正常使用公司的内网了。 希望mac可以尽快修复这个问题吧，如果有小伙伴发现更方便的连接方式也可以互相讨论下哦~