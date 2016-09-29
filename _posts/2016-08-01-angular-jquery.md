---
layout: post
title: angular & jquery
date: 2016-08-01 14:05
author: ronapelbaum
comments: true
tags: [angularjs, javascript, jquery]
---
Angular and JQuery. Jquery and angularjs.

Is it good to combine them? bad? evil but practical?

So, basically, if javascript is "the essembly of the web", JQuery is probably those nasty GOTOs. Powerful, but nasty...

Here are some best practices for  JQuery inside an angular app.
<!--more-->
<h2>Do it only inside directives</h2>
Best to do it inside the <code>link</code> function.
<h2>Use jqLite</h2>
Never use the <code>$('#myId')</code> syntax. It's messy and buggy.

Take a look at this:

<script src="https://gist.github.com/ronapelbaum/5da7135fe9846996a9e801fd716bfb6b.js"></script> 

Well, first, this is obviously a bug: if you'de try to use more that one instance of this directive, it won't work, since the selector will apply only to the first element.

Second, imagin a complex DOM, with <em>a lot</em> of these little directives. In every jquery selector, we scan the whole DOM, and for what?
<h2>TL;DR</h2>
<script src="https://gist.github.com/ronapelbaum/a7c4bb0abb7ea505e26adda78270190a.js"></script> 

This is good because:
<ol>
	<li>The selector runs only on this element - better performance.</li>
	<li>It's easy to keep track on all special selectors (mainly id), since the selector is in the same file as the id.</li>
	<li>You don't depend directly on JQuery - less dependencies.</li>
</ol>
