---
layout: post
title: angular unit test -  directive with DOM events
date: 2016-07-20 10:20
author: ronapelbaum
comments: true
categories: [angular-jasmine, javascript]
---
You finally finished writing your directive. A very interactive piece of UI, with a lot of mouse events. How do you test it?

<!--more-->
<h2>Your directive</h2>
Probably looks somthing like this:

<script src="https://gist.github.com/ronapelbaum/3d386c0df3d1beb70f34d633c8b5150c.js"></script> 

Now, how do you test it?
The obvious solution will be to use some browser testing framework like protractor or selenium in order to simulate mouse events.

We really don't want to depend on it... Why?
<ol>
	<li>It is slow.</li>
	<li>It is really slow.</li>
	<li>When you're trying to click the browser automatically, you start to encounter some annoying scrolling issues...</li>
</ol>
Let's do it in unit testing - without clicking!
<h2>Creating DOM event in javascript</h2>
The key here is to create a DOM event using <em>pure javascript</em>:

<script src="https://gist.github.com/ronapelbaum/0f214713408282adcfa3c089f91da633.js"></script> 

What do we have here?

1. Create a MouseEvent obj.
2. Init the event with the proper type.
3. Dispatch the event on your element.
<h2>Testing your directive element</h2>
As we've seen in <a href="https://ronapelbaum.wordpress.com/2016/03/06/test-angular-directive/">previous post</a>, we can use angular jqLite in order to get the DOMElement. Take this and dispatch you event on it:

<script src="https://gist.github.com/ronapelbaum/ed29d0d51364a9a6de9e118d46da34ba.js"></script> 

Take a look at the live example:

<a href="https://jsfiddle.net/ronapelbaum/5vehsoaf/">https://jsfiddle.net/ronapelbaum/5vehsoaf/</a>

&nbsp;
