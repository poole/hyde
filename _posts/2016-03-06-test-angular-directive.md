---
layout: post
title: Test angular directive
date: 2016-03-06 14:15
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
Let's define our directive:

<script src="https://gist.github.com/ronapelbaum/39bd28704922dc43bb24e33a75d2ff86.js"></script> 

Now let's test it. But what exactly we would like to test?

In angular, directives are all about linking a model (*scope*) to a view (*element*).
How do we get this element? we will use *angular.element()* + *$compile*

<script src="https://gist.github.com/ronapelbaum/355c7d03c3ea87d4f038b8b29375f09e.js"></script>

Here we are creating a jqLite element, *compiling* it with the relevant scope, and triggering the *digest cycle*.

Now we can test the **element** itself:

<script src="https://gist.github.com/ronapelbaum/f49a2c94170d76b43639e7b88cc2c133.js"></script>

#### Another example.
Now, the directive is referring to parent's scope:

<script src="https://gist.github.com/ronapelbaum/0119786551d1378031b474d181b47421.js"></script>

the test setup will be:

<script src="https://gist.github.com/ronapelbaum/c846e245ebd5e36975213b44685a611c.js"></script>

&nbsp;

checkout this live example:

<p data-height="565" data-theme-id="light" data-slug-hash="mPeNNP" data-default-tab="js,result" data-user="ronapelbaum" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/ronapelbaum/pen/mPeNNP/">angular jasmine: directive test</a> by ronapelbaum (<a href="http://codepen.io/ronapelbaum">@ronapelbaum</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>