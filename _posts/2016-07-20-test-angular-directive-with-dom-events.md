---
layout: post
title: angular unit test -  directive with DOM events
date: 2016-07-20 10:20
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
You finally finished writing your directive. A very interactive piece of UI, with a lot of mouse events. How do you test it?

## Your directive
Probably looks somthing like this:

<script src="https://gist.github.com/ronapelbaum/3d386c0df3d1beb70f34d633c8b5150c.js"></script> 

Now, how do you test it?
The obvious solution will be to use some browser testing framework like protractor or selenium in order to simulate mouse events.

We really don't want to depend on it... Why?

1. It is slow.
2. It is really slow.
3. When you're trying to click the browser automatically, you start to encounter some annoying scrolling issues...

Let's do it in unit testing - without clicking!

## Creating DOM event in javascript
The key here is to create a DOM event using *pure javascript*:

<script src="https://gist.github.com/ronapelbaum/0f214713408282adcfa3c089f91da633.js"></script> 

What do we have here?

1. Create a MouseEvent obj.
2. Init the event with the proper type.
3. Dispatch the event on your element.

## Testing your directive element
As we've seen in [previous post](/2016/03/06/test-angular-directive/), we can use angular *jqLite* in order to get the DOMElement. Take this and dispatch you event on it:

<script src="https://gist.github.com/ronapelbaum/ed29d0d51364a9a6de9e118d46da34ba.js"></script> 

Take a look at the live example:

<iframe width="100%" height="900" src="//jsfiddle.net/ronapelbaum/5vehsoaf/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
