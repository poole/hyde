---
layout: post
title: Test angular directive
date: 2016-03-06 14:15
author: ronapelbaum
comments: true
categories: [angular-jasmine, javascript]
---
Let's define our directive:

{% gist 39bd28704922dc43bb24e33a75d2ff86 %}

Now let's test it. But what exactly we would like to test?

In angular, directives are all about linking a model (<em>scope</em>) to a view (<em>element</em>).
How do we get this element? we will use <em>angular.element()</em> + <em>$compile</em>

{% gist 355c7d03c3ea87d4f038b8b29375f09e %}

Here we are creating a jqLite element, <em>compiling</em> it with the relevant scope, and triggering the <em>digest cycle</em>.

Now we can test the <em><strong>element</strong> </em>itself:

{% gist f49a2c94170d76b43639e7b88cc2c133 %}
<h4>Another example.</h4>
Now, the directive is referring to parent's scope:

{% gist 0119786551d1378031b474d181b47421 %}

the test setup will be:

{% gist c846e245ebd5e36975213b44685a611c %}

&nbsp;

checkout this live example:

http://codepen.io/ronapelbaum/pen/mPeNNP?editors=0011
