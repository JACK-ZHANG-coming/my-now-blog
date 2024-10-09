---
slug: pnpm依赖安装解决|pnpm项目从一个文件夹复制到另一个文件夹运行失败问题解决-以vbenAdmin项目为例
title: pnpm依赖安装解决|pnpm项目从一个文件夹复制到另一个文件夹运行失败问题解决-以vbenAdmin项目为例
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: pnpm依赖安装解决|pnpm项目从一个文件夹复制到另一个文件夹运行失败问题解决-以vbenAdmin项目为例
tags: [前端, pnpm, 项目迁移]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

# pnpm 依赖安装解决|pnpm 项目从一个文件夹复制到另一个文件夹运行失败问题解决-以 vbenAdmin 项目为例

## 1 前言

最近在使用 vben admin 项目迁移时，从一个文件夹复制到另一个文件夹运行不起来，排查了一天，终于把问题排查出来了，特地记录一下，便于自己看也便于大家看。

使用项目安装包版本：

v2.11.5 https://github.com/vbenjs/vue-vben-admin/tags

## 2 解决方案

### 2.1 软链接问题解决

​ **问题**: `pnpm` 使用硬链接或符号链接来管理 `node_modules` 中的依赖项。如果链接路径在新的文件夹或文件系统中失效，可能会导致依赖解析失败。

​ **解决方法**: 尝试删除并重新安装所有依赖，确保链接正确创建。

```
rm -rf node_modules pnpm-lock.yaml
```

node_modules 文件夹一定要全部删除，`pnpm-lock.yaml`文件也要删除，上述是用命令删除的，也可以自己手动删（所有的 node_modules 都要删）

![image-20240830135249168](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830135249168.png)

### 2.2 文件路径过长问题

**问题**: 在 Windows 系统上，文件路径过长（超过 260 个字符）可能导致文件系统问题，导致文件无法被正确访问。

**解决方法**: 尝试将项目目录移动到一个路径较短的位置，比如 `C:\Projects\my-project`，然后重新安装依赖。

node_modules 文件夹里面的内容路径会很长，所以整个项目文件夹所在路径不宜过长，否则路径可能会超过 260 个字符。

![image-20240830135718984](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830135718984.png)

### 2.3 pnpm 缓存问题

**问题**: `pnpm` 的缓存可能导致一些包没有被正确更新或安装。

**解决方法**: 清除 `pnpm` 的缓存：

依次执行下面命令

- 清理未使用的缓存包

```
pnpm store prune
```

- 清空整个 pnpm 的缓存存储库

```
pnpm store clear
```

### 2.4 pnpm 缓存深度清理

执行下面这句话：

```
pnpm store path
```

然后我们看到这个路径

![image-20240830140127029](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830140127029.png)

进入这个目录，将这 3 个文件夹都手动删除

![image-20240830140240181](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830140240181.png)

### 2.5 pnpm install

删完之后，执行`pnpm install`

```
pnpm install
```

![image-20240830141017683](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830141017683.png)

### 2.6 pnpm dev

等待依赖安装完毕后，我们执行`pnpm dev`

```
pnpm dev
```

程序运行成功

![image-20240830142025994](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830142025994.png)

## 3 pnpm 安装依然失败解决方案

当我们试了各种方法还是不行，诶？这个时候我们返璞归真，是不是我们的 pnpm 的源下载不了的原因呢？国内的 pnpm 下载出现网络相关的问题还是挺多的，那么让我们来替换成国内专属的 pnpm 源试试

### 3.1 国内可用源

3.1.1 淘宝 pnpm 源

```
https://registry.npmmirror.com
```

3.1.2 腾讯云 pnpm 源

```
https://mirrors.cloud.tencent.com
```

3.1.3 cnpm 源

```
https://r.cnpmjs.org/
```

### 3.2 设置国内可用源命令

```
pnpm config set registry https://registry.npmmirror.com
```

### 3.3 查看设置的源

```
pnpm config get registry
```

返回信息内容是你刚刚设置地址，即设置成功。

![image-20240929154343078](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240929154343078.png)

### 3.4 再次 pnpm install

ok，pnpm 相关依赖在徐徐下载，我的终于又又装成功了~

## 4 遗留的瑕疵

项目虽然可以成功运行了，也可以正常写代码的了，但是终端还有几个 warning ，如果有大佬知道如何解决也可以指点一下，感谢~

![image-20240830142224622](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/2023image-20240830142224622.png)
