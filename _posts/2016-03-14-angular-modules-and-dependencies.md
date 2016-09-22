---
layout: post
title: angular modules and dependencies
date: 2016-03-14 13:41
author: ronapelbaum
comments: true
categories: [angular-jasmine, javascript]
---
Everybody knows that angular js has modules. But what are these module do?

<!--more-->
<h4><a href="https://docs.angularjs.org/guide/module">angular docks</a></h4>
<blockquote>You can think of a module as a container for the different parts of your app.</blockquote>
So modules are containers for your code. You can group part of your code to module 'A', and part to module 'B'.

But pay attention: angular (1.x) doesn't see modules' heirarchy as you would expect:

{% gist 0b2ad949d11a27dfaaab32665dc3f8c5 %}

Here you can see that ServiceB in moduleB depends on ServiceA from moduleA, but moduleB doesn't depend on moduleA!
<h4>So how can this code work?</h4>
The reason is that angular has only one <em>$provider</em> per bootstrap (ngApp), and sinse this <em>$provider</em> knows both modules, we are OK in runtime.

This is also the reason that we can't give create 2 services with the same name, even in different modules.

&nbsp;
<h4>Why is this bad?</h4>
Let's say that you want to take a module to a different app. You'd look at the module dependency, but your code will fail, since it depends on other moduls (which get linked in the whole app).
<h4>What to do?</h4>
Write you modules with the proper dependencies.

Test with <em>unit tests</em> per module.
