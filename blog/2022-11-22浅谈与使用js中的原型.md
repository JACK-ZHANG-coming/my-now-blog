---
slug: 浅谈与使用js中的原型
title: 浅谈与使用js中的原型
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: 浅谈与使用js中的原型
tags: [前端, javascript]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

<!-- truncate -->

# 浅谈与使用js中的原型

## 1 什么是原型

> “ 每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例 共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性(指向 原型对象)。”

上面这段话摘至《JavaScript高级程序设计》（第4版）224-225页 关于原型的讲解。按照我现在的理解就是：每个函数上面都有一个prototype属性，这个就是原型，我们可以通过这个原型属性来完成一些比较厉害的操作。

## 2 原型的使用

首先我们使用设计模式中的工厂模式来实现一个Person类，可以通过new这个Person的函数来创建一个与之具有相同属性的实例，也就省的我们再次创建Person函数了。

```
// 工厂模式实现 方法1
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}
let person1 = new Person('Nicholas', 29, 'Software Engineer')
let person2 = new Person('Greg', 27, 'Doctor')
person1.sayName() // Nicholas
person2.sayName() // Greg
```

从上面代码中可以看到`sayName`这个方法是在Person函数里面的，每次new的Person的实例时候都需要跟着一起重新创建，但是这个方法在每个实例中都是相同的功能，重新创建需要开辟新的空间，显得有些冗余了，那么有没有什么操作可以使其可以更简洁呢？有，那就是用原型，请看下面这份代码：

```
// 工厂模式实现 方法2 使用原型属性
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
let person1 = new Person('Nicholas', 29, 'Software Engineer')
let person2 = new Person('Greg', 27, 'Doctor')
person1.sayName() // Nicholas
person2.sayName() // Greg
```

我们将`sayName`这个方法直接赋值给了`Person.prototype`,也就是Person的原型，那么后面再通过Person创建实例，实例上面就会自动继承这个方法，也无效再次重新创建，从而就提高了代码的性能。

## 3 小结

本文仅是对于原型有个简单的认识也使用，原型在js中是一个比较重要的模块，还有`__proto__` 、 ` 原型链 ` 这些概念没有讲到，如果感兴趣，可以再通过书籍及视频来交叉理解。笔者能力有限，文中难免有错谬之处，欢迎批评指正，一起学习，共同进步 ~