---
layout: post
title: javascript casting
date: 2016-01-12 21:10
author: ronapelbaum
comments: true
tags: [javascript]
---
cast primitive variables quite easily

### string to number

cast by multiplying by 1
```javascript
var num1 = 123;
var num2 = '123';

console.log(num1 + num2);//"123123"
console.log(num1 + num2 * 1);//246
console.log(num1 == num2);//true
console.log(num1 === num2);//false
console.log(num1 === num2 * 1);//true
```
cast by adding (thanks to <a href="https://coderwall.com/mallowigi" target="_blank">mallowigi</a>)
```javascript
var num1 = '11';
console.log(num1 + 2);//"112"
console.log(+num1 + 2);//13
```
cast in array index
```javascript
var arr = ["aaa", "bbb", "ccc"];
console.log(arr["1"]);//"bbb"
```

### Object to boolean

use double exclamation mark
```javascript
console.log(!!undefined);//false
console.log(!!'abc');//true
console.log(!!0);//false
console.log(!!1);//true
console.log(!!'0');//true
```
