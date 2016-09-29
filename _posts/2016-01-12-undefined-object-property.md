---
layout: post
title: undefined object property
date: 2016-01-12 21:18
author: ronapelbaum
comments: true
tags: [javascript, javascript]
---
If you try to access a non-existing property of an object you'll get undefined:
<pre style="padding-left:30px;"><span style="font-family:'courier new', courier, monospace;"><code>var A = {};
console.log(A.a);//undefined
console.log(A);//Object {}
</code></span></pre>
but you can put undefined as a member in the object
<pre style="padding-left:30px;"><code>A.a = undefined;
console.log(A.a);//undefined
console.log(A);//Object {a: undefined}
</code></pre>
note that it is still really undefined:
<pre style="padding-left:30px;"><code>console.log(A.a===A.b);//true</code></pre>
