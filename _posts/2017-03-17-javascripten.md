---
layout: post
title: 'v6: JavaScripten'
tags: [hyde]
description: >
  This release adds a layer of JavaScript that effectively turns the template into a singe page app*.
---

The last release made the template fast in the eyes of Google, but not so much in the eyes of your redaders.
This release addresses this but adding a layer of JavaScript, effectively turning the whole template into a single page app with fancy page transitions.

## Major

### FAST!
* Loading the next page starts as soon as possible: When users hover over link with their mouse, when they put their finger on it or when an element receives the focus via keyboard. This saves somewhere between 50ms and 100ms, depending on how fast your users are.
* Animations not only make the website feel like an app, they add another 300ms to complete the request without the user noticing.
* ...

### Robust
Adding a lot of JavaScript fanciness it tricky. While it makes the site feel appy and mordern, it's very frustrating when it breaks down. Thanks to excessive engineering, a lot of site today are slower, less reliable and less useable then a simple web page from 20 years ago.

Hydejack takes a number of steps to ensure that js doesn't get in the way.

* All JS is optional. If users have JS disabled, the site works just as it used to. [Try it]().
* All JS is loaded after the site has finished rendering. In the spirit of the
* Build on top of RxJS. Lots of complex, time-based logic is necessary to load, pre-load and animate the app. RxJS is a powerful tool to do these things and Hydejack is built on it.

...


## Minor

* ...
* ...
* ...

## Trivia

...

***

[Get *JavaScripten* on GitHub](https://github.com/qwtel/hydejack/releases/tag/v6.0.0)
