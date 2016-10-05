---
layout: post
title: javascript hoisting
date: 2016-01-12 20:40
author: ronapelbaum
comments: true
tags: [javascript]
---

### var declaration
hoisted to the top of scope, without assignment.
```javascript
 var a = 1;
 function printA() {
     console.log(a);
     var a = 2;
     console.log(a);
 }
 printA();
 //undefined
 //2
```

### function declaration
hoisted with assignment.
```javascript
 foo();
 //foo
 function foo() {
     console.log('foo');
 }
```

### Pay attention!
while function declarations are hoisted with their assignment, function expressionsare just regular vars hence hoisted without their assignment.
```javascript
 goo();
 //undefined is not a function
 var goo = function () {
     console.log('goo');
 }
```
