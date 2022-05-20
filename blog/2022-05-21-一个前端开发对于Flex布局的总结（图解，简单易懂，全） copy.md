---
slug: 使用git命令与vscode从零开始对远程代码仓库进行拉取、提交、合并、推送分支等操作在项目中的实践
title: 使用git命令与vscode从零开始对远程代码仓库进行拉取、提交、合并、推送分支等操作在项目中的实践
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: git相关操作。
tags: [git,vscode]
---

<!-- truncate -->


> 前言：在日常开发中，掌握基础的git命令对于项目代码多人协作与远程存储是很有必要的；而在vscode也有对应git命令的可视化操作，本文将一一结束，从最基础的命令开始。
>
> 我们常用的代码托管平台有github、gitlab、码云、或者自己公司搭建的代码托管平台(需连接公司内网比如gitlab、svn等)；

## 0 前置

首先，我们的电脑上要有安装git，并且得在vscode里面可以使用git命令，检测是否有安装成功可在vscode的终端里面直接输入

`git version`。然后我们有一个现成的代码仓库，比如这个https://github.com/front-end-study-GoGoGo/vue-study-project 这个是我在github上自己建的一个仓库。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f73fc7c24fc94fd3b35395bb9a3a83f1~tplv-k3u1fbpfcp-zoom-1.image)


从上图可以看到我们可以正常在vscode里面使用git原生命令，如果你的电脑不行，可自行百度如何安装git并在vscode里面使用（如果已经安装了可能需要弄个环境变量），我的是mac，所以就没有做那么多操作了。

## 1 git 常用命令大全

OK，上一步我们已经可以在vscode的终端里面使用git命令了，那么git命令到底包含哪些呢，下面这边文章把我们常用的git操作做了个集合（可用于参考手册查询）：

[git 常用命令大全](https://www.cnblogs.com/toBeYoung/p/15344606.html)

## 2 项目实战，使用git命令对代码进行管理（拉取、推送代码等全套纯命令操作）

### 2.1 项目操作场景（从初中级前端开发角度出发）

正常一个项目的开发流程为这样，由产品经理设计好原型，UI设计师把UI做好，然后前端就可以根据UI图来搭前端项目架子了，然后就是产品讨论会把各个页面的详细功能过一遍，如果开发过程中有不明确的地方再沟通。

- 建前端代码仓库

> 这个一般是由一个人来把代码仓库建好，本人是直接在gitlab或是github的官网新建一个代码仓库，可视化操作很方便。

- 分配开发各自的页面，进行代码管理维护

> 代码仓库有了之后，如果是一个项目上有几个前端开发工程师，那么必然需要合理代码管理方式，才能使大家的代码同步进行开发，首先我们会分配好各自负责的开发页面，然后管理代码提交目前我总共有遇到以下**3种方式**：

1. 把远程代码fork到自己的仓库，然后在自己的那个仓库上面开发，开发后在把代码提交到自己的远程仓库，然后再从自己的远程仓库pull request到远程主仓库。（这种比较适合5人以上的多人开发的项目代码管理）
2. 直接在远程仓库上面建各自的分支，然后各自在自己的分支上面开发，开发后在合并到master分支。（这种比较适合3-5人的项目代码管理）目前我所用的还是这种多一些。
3. 还有一种就是项目仓库上面只有一个分支，那就是master，直接在master分支上面开发，在master分支上进行拉取推送代码。（这种适合1-2人）

### 2.2 使用git命令对代码进行拉取、推送、提交（重点概念理解）

2.2.1 克隆远程github仓库代码

```
git clone https://github.com/front-end-study-GoGoGo/vue-study-project 
```

> 后面那个链接是git仓库的地址，如果是第一次克隆这个团队的项目，需要登录自己的github或是对应平台的账号密码。

2.2.2 切换git分支，在自己对应的开发分支上面开发

- 查看分支命令

```
git branch // 查看所有本地分支
git branch -r // 查看所有远程分支
git branch -a // 查看所有本地和远程分支
```

- 新建及切换分支命令

```
git branch newBranch // 新建一个本地分支 newBranch为分支名,新分支基于当前分支创建
git push origin newBranch // 把新建的本地分支推送到远程，分支名称和新建的本地分支一致，远程就新建了一个分支
git checkout branchName // 切换本地分支
git fetch // 如果在远程创建了新分支，本地可以通过git fetch 来获取最新的远程分支
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31683159aeae4b9181c892b65c331af3~tplv-k3u1fbpfcp-zoom-1.image)


上图所示，只有一个主分支，还没有自己对应的分支，可以自己新建一个分支，然后在自己的这个分支上面进行代码开发。

2.2.3  提交代码

如下图可见，我们在`1.txt`文档里面敲了一行字，然后我们将这些改动提交到**远程主仓库**：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d8116ceea784d14b62517b6caa139e0~tplv-k3u1fbpfcp-zoom-1.image)


**提交流程**：

（1）先将代码**推送**到**自己本地仓库**，再**提交**到**自己的远程仓库** （这里也可以跳过提交的那一步骤，直接推送，新手嘛一步一步走，不容易出错）；

- 推送及提交代码

```
git add . // . 代表全部，全部添加到暂存区
git commit -m '描述内容' // 推送到本地仓库，并写上备注（改了啥东西）
git push origin branchName // branchName 远程分支名，推送到远程分支
```

![image-20220503104307532](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69220e1e12f942d2a69747715c2c8d98~tplv-k3u1fbpfcp-zoom-1.image)

（2）切换到远程主仓库分支，拉取**远程主仓库**最新代码（这里为了防止别人也推送了代码到远程主仓库，我们要保持我们远程主仓库的代码是最新的）；

- 切换分支及拉取代码

```
git checkout branchName // 切换本地分支
git pull // 拉取该分支最新代码
```

![image-20220503110630766](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30793e3d818340d4be98a3cc72f56b3f~tplv-k3u1fbpfcp-zoom-1.image)

（3）再切换回自己分支，**合并** **远程主仓库**代码到**自己的仓库** ，然后再重复一次步骤（1） （这里防止和别人的代码有冲突，如果有冲突，那么就把冲突解决完在执行步骤1）；

> 切换回自己分支后注意，如果主分支没有新的代码，那么我们就不用执行合并分支代码的操作，当然执行了也没事，执行下面这些代码就是为了让我们的自己分支的代码包含主分支的最新代码的

- 切换、合并分支及推送、提交代码

```
git checkout branchName // 切换本地分支
git merge branchName // 合并本地branchName到当前分支
git add . // . 代表全部，全部添加到暂存区
git commit -m '描述内容' // 推送到本地仓库，并写上备注（改了啥东西）
git push origin branchName // branchName 远程分支名，推送到远程分支
```

![image-20220503112020992](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2a0d3a4671048eeb767613503739ec4~tplv-k3u1fbpfcp-zoom-1.image)

（4）再切换到**远程主仓库**，将**自己的仓库**的代码**合并**到**远程主仓库**，**推送** **远程主仓库**的代码，然后**切换回自己的分支**，继续开发。至此，代码提交流程闭环完毕。

- 切换、合并分支及推送代码到远程仓库

```
git checkout branchName // 切换本地分支
git merge branchName // 合并本地branchName到当前分支
git add . // . 代表全部，全部添加到暂存区
git commit -m '描述内容' // 推送到本地仓库，并写上备注（改了啥东西）
git push origin branchName // branchName 远程分支名，推送到远程分支
git checkout branchName // 切换本地分支
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5857ddea9f71468eb921fe969bbb521c~tplv-k3u1fbpfcp-zoom-1.image)


### 2.3 代码撤销与回退

> 日常开发中，我们难免会出现代码提交错误的情况，所以撤销与回退的掌握是很有必要的，平时不常用，但是关键时刻有大用。
>
> 撤销：将刚刚提交的代码从远程仓库撤销回来，可以重新再次编辑然后再提交。
>
> 回退：回退到之前代码提交的某一版本，然后对其进行编辑。

 相关文章参考：

- git回退代码指令操作 ：https://blog.csdn.net/m0_46309087/article/details/121322220

2.3.1 代码撤销

```
--------撤销工作区的更改--------
git checkout -- filePath // 撤销工作区指定文件的更改，filePath,文件路径都可通过 git status查看
git checkout . // 撤销工作区所有更改
--------撤销暂存区的更改--------
git reset HEAD filePath // 撤销上次add指定的文件更改
git reset HEAD . // 撤销上次add的全部更改
```

> 撤销工作区的更改

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/302c93bb3ca74147b8442838eccbdbf6~tplv-k3u1fbpfcp-zoom-1.image)


> 撤销暂存区的更改

![image-20220504104722990](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79adfbee149f476faf8e904e48634bef~tplv-k3u1fbpfcp-zoom-1.image)
2.3.2 代码回退

> 代码回退包含两种情况，对应**reset**和**revert**指令；
>
> reset是回退代码到某一版本，某一版本以后的代码都不保存，然后回退之后再次提交其后面的版本会被覆盖掉。
>
> revert是只回退某一版本代码，对齐它版本代码不影响，只会撤回某一版本的代码，对应版本的日志将保留，相对于reset更为安全。对于多人协作开发任务，更推荐使用第二种方法回退代码。

- reset回退方式

```
git log  // 查看提交（commit）记录  (进入以后我们按回车可以往下翻动日志，英文状态下按q可以退出记录查看状态)
git reset [目标版本号]   // 目标版本号为HEAD编号，一般输前几位就可
git add .
git commit -m ''
git push origin branchName
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38c08b15534846ed8fd4c6b71a68a132~tplv-k3u1fbpfcp-zoom-1.image)


![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4eaf9007a85c441f9cbf7b528bc7cb92~tplv-k3u1fbpfcp-zoom-1.image)


- revert回退方式

```
git log  // 查看HEAD日志
git revert [要回退的版本号]  // 回退该版本代码并生成新的版本号 (此刻终端会变成vim编辑器，按qa!可以退出，然后我们继续编辑我们想要的)
git add .  // 提交代码到暂存区
git commit -m “”  // 提交代码到本地仓库
git push origin branchName // 上传到远程分支
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9550371f58a43b39557e756e3c50d2a~tplv-k3u1fbpfcp-zoom-1.image)

![image-20220504222925464](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2aa8bfded906428398b97ac5c9bf845f~tplv-k3u1fbpfcp-zoom-1.image)

## 3 结合vscode可视化git操作对代码进行管理

> 这一小节主要介绍使用vscode自带的git操作功能对托管的代码进行操作，主要对代码分支切换、拉取、合并、推送、提交操作（也就是日常中常用的）。依然以上面的的代码仓库为例：

3.0 切换分支
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/262c6cc2cc1f4e40b697f6d0ec412a21~tplv-k3u1fbpfcp-zoom-1.image)

## 3 结合vscode可视化git操作对代码进行管理

> 这一小节主要介绍使用vscode自带的git操作功能对托管的代码进行操作，主要对代码分支切换、拉取、合并、推送、提交操作（也就是日常中常用的）。依然以上面的的代码仓库为例：

3.0 切换分支
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b9353322aa8416a8a8f13493a16b703~tplv-k3u1fbpfcp-zoom-1.image)


3.1 拉取代码

> 这里我们在主分支上，拉取主分支的代码
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed9b8d7a90f4456ba1c48b268b91c64d~tplv-k3u1fbpfcp-zoom-1.image)

3.2 合并代码

> 此刻我们切换到自己的分支，然后将主分支的代码合并到自己的分支，保持自己的分支也是最新的代码

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ece4e1a43f1042b2b7f657d66acfa67a~tplv-k3u1fbpfcp-zoom-1.image)
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeb9747ea6c24f948e94e679096dd4ac~tplv-k3u1fbpfcp-zoom-1.image)


> 这个时候合并遇到了代码不一致，那么我们就解决冲突。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da2561a0a86e40cea1d9464b5fccc33c~tplv-k3u1fbpfcp-zoom-1.image)


3.3 推送代码

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c728abb4f3e45a9823141f40d7a4e8d~tplv-k3u1fbpfcp-zoom-1.image)


3.4 提交代码

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a1e14daf1974d9c9e85e1fbd00b7f9f~tplv-k3u1fbpfcp-zoom-1.image)


## 4 git可视化软件分享

### 4.1 SourceTree

### 4.2 githubDesktop（推荐）

---

Ok，感谢阅读，难免存在不足之处，欢迎讨论更正优化~