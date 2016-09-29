---
layout: post
title: javascript hoisting
date: 2016-01-12 20:40
author: ronapelbaum
comments: true
tags: [javascript, javascript]
---
<h3>var declaration</h3>
hoisted to the top of scope, without assignment.
<pre><code> var a = 1;
 function printA() {
     console.log(a);
     var a = 2;
     console.log(a);
 }
 printA();
 //undefined
 //2
</code></pre>
<h3>function declaration</h3>
hoisted with assignment.
<pre><code> foo();
 //foo
 function foo() {
     console.log('foo');
 }
</code></pre>
<h3>Pay attention!</h3>
while function declarations are hoisted with their assignment, function expressionsare just regular vars hence hoisted without their assignment.
<pre><code> goo();
 //undefined is not a function
 var goo = function () {
     console.log('goo');
 }</code></pre>
