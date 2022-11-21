---
slug: js中this指向问题及call，apply，bind的区别
title: js中this指向问题及call，apply，bind的区别
author: 潜心专研的小张同学
author_title: 前端工程师 / B站UP主
author_url: https://github.com/JACK-ZHANG-coming
author_image_url: https://avatars.githubusercontent.com/u/44993003?s=400&u=02570a73330dd7eeae310b302962c034b2833988&v=4
description: js中this指向问题及call，apply，bind的区别。
tags: [前端, javascript]
# activityId: 相关动态 ID
# bvid: 相关视频 ID（与 activityId 2选一）
# oid: oid
---

<!-- truncate -->

# js中this指向问题及call，apply，bind的区别



## 1 this指向

### 1.1 what is 'this'?

> 在 ECMAScript 5 中，函数内部存在两个特殊的对象:arguments（一个类数组对象，包含调用函数时传入的所有参数） 和 **this（本文将要讲的）**。ECMAScript 6 又新增了 new.target （检测这个函数是否使用了new关键字，如使用则将引用被调用的构造函数，否则值为undefined）属性。

### 1.2 标准函数与箭头函数的this指向

this在标准函数与箭头函数中的时会有两种不同类型的指向行为。

#### 1.2.1 标准函数的this指向

在标准函数中，this 指向的是把函数当成方法调用的上下文对象。也就是说在哪里调用的这个函数，那这个this只会指向它外面最靠近它的对象。

```javascript
// 1.直接调用时，从这个this往它外层找，最靠近它的对象是window，所以它指向的就是window
function fun() {
  console.log(this)
}
fun()

// 2.以方法的形式调用，从这里this往外层找，可以看到靠近这个this的对象是我们定义的obj对象，所以this指向的就是obj
const obj = {
  name: 'obj啊',
  sayObj: fun
}
obj.sayObj()

// 3.当使用new关键字调用，这个时候最靠近this的是new关键字实例化出来的对象，所以下面这两句话的this指向分别是creatPerson1对象和creatPerson2对象
function Person(name, age) {
  console.log(this)
  this.name = name
  this.age = age
}
const creatPerson1 = new Person('Jack', 11111)
const creatPerson2 = new Person('Tom', 22222)
```

运行结果如下：

![image-20221120213129164](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/imgs/image-20221120213129164.png)



#### 1.2.2 箭头函数this指向

当箭头函数时，this指向的是定义箭头函数的上下文。也就是说哪里定义了箭头函数，那这个this就在哪里，不会因为在其他地方调用而改变this指向。通常我们口头说的“箭头函数没有this”、“箭头函数this指向无法改变”...

```javascript
// 我们在全局作用下定义一个箭头函数，外围靠近它最近的对象是window，好，那么此刻它的this直接就是window，而且后续无论在哪里调用都不会改变了。
const sayColor = () => console.log(this)
// 1.直接调用，this指向window
sayColor()
// 2.以obj_1对象里面的方法形式调用，this依然指向window
let obj_1 = {
  name: 'obj_1啦啦',
  sayColor: sayColor
}
obj_1.sayColor()
```

运行结果如下：

![image-20221120224500747](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/imgs/image-20221120224500747.png)

## 2 call，apply，bind的区别

**相同点：**

- 都可以改变函数的this指向
- 第一个参数为this将要指向的对象，后续的传参都是作为函数形参的值

**不同点：**

- call的后续传参是**一个一个传**，然后顺序对应；apply的后续传参是**以数组的形式**，解析的时候也是跟call一样顺序对应；
- call、apply没有返回值，而bind改变完this指向后会返回一个改变完this指向之后的原函数的拷贝 可以再次进行调用。

```javascript
var a = {
  name: '一一',
  age: '23',
  sex: '女',
  hobby: '写代码',
  say: function (sex, hobby) {
    console.log(this.name, this.age, sex, hobby)
  }
}
var b = {
  name: '二二',
  age: '24'
}
a.say()
a.say.call(b, '男', '爬山')
a.say.apply(b, ['男', '密室逃脱'])
// bind可以向cally一样传参，例如:
a.say.bind(b, '男', 'UNO')()
// 但由于bind返回的仍然是一个函数，所以我们还可以在函数调用的时候再进行传参。例如：
a.say.bind(b)('男', 'UNO')
```

运行的结果如下：

![image-20221120235353188](https://raw.githubusercontent.com/JACK-ZHANG-coming/map-depot/master/imgs/image-20221120235353188.png)

## 3 小结

关于this指向、call、apply、bind的记录本篇就总结到这里，在日常使用脚手架、组件开发时可能会用的地方比较少，但是当我们维护一些老代码或者看一些偏向底层的代码时，将会有助于理解。



## 参考文献：

[1] 马特·弗里斯比.JavaScript高级程序设计.第4版.人民邮电出版社，2020.300页-301页.

[2] whyfail.https://blog.csdn.net/weixin_44733660/article/details/122838505

[3] MDN.https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

