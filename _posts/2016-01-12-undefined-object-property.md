---
layout: post
title: undefined object property
date: 2016-01-12 21:18
author: ronapelbaum
comments: true
tags: [javascript]
---
If you try to access a non-existing property of an object you'll get undefined:
```javascript
var A = {};
console.log(A.a);//undefined
console.log(A);//Object {}
```

but you can put undefined as a member in the object

```javascript
A.a = undefined;
console.log(A.a);//undefined
console.log(A);//Object {a: undefined}
```

note that it is still really undefined:

```javascript
console.log(A.a===A.b);//true
```
