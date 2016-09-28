---
layout: post
title: javascript casting
date: 2016-01-12 21:10
author: ronapelbaum
comments: true
categories: [javascript]
tags: [javascript]
---
cast primitive variables quite easily
<h3>string to number</h3>
cast by multiplying by 1
<pre><code>var num1 = 123;
var num2 = '123';

console.log(num1 + num2);//"123123"
console.log(num1 + num2 * 1);//246
console.log(num1 == num2);//true
console.log(num1 === num2);//false
console.log(num1 === num2 * 1);//true
</code></pre>
cast by adding (thanks to <a href="https://coderwall.com/mallowigi" target="_blank">mallowigi</a>)
<pre><code>var num1 = '11';
console.log(num1 + 2);//"112"
console.log(+num1 + 2);//13
</code></pre>
cast in array index
<pre><code>var arr = ["aaa", "bbb", "ccc"];
console.log(arr["1"]);//"bbb"
</code></pre>
<h3>Object to boolean</h3>
use double exclamation mark
<pre><code>console.log(!!undefined);//false
console.log(!!'abc');//true
console.log(!!0);//false
console.log(!!1);//true
console.log(!!'0');//true</code></pre>
