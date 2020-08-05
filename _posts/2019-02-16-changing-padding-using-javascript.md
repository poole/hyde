---
id: 65
title: Changing padding using javascript
date: 2019-02-16T10:27:45+00:00
author: avic
layout: post
description: Use element.style.padding to change the padding of an individual element. You can target the top,bottom, right and left padding individually using paddingTop, padding bottom, padding right and padding left respectively.
guid: https://learn.avicndugu.com/?p=65
permalink: /changing-padding-using-javascript/
categories:
  - CSS
  - Javascript
tags:
  - css
  - html
---
<p style="text-align: left;">
  When you create a webpage, and it is loaded on the browser, everything looks good. However, when the user interacts with your webpage, the perfect look may change or become distorted.
</p>

There are two ways you can go about doing this.

So, you want to make changes to the amount of padding once a user adds something on a web page. Therefore, it is important to know how to make such changes using javascript.

<!--more-->

## **Method 1. Using CSS and Javascript**

Identify the element that need a change in the amount of padding.

<pre class="wp-block-preformatted">&lt;div id="changing-div"&gt;<br />           This is the a div element that we shall change its padding size<br />&lt;/div&gt;</pre>

Create a CSS class with the new padding that you want to be applied.

<pre class="wp-block-preformatted">.change-padding{<br />      padding-right:50px;<br />      padding-left:50px;<br />      padding-bottom:30px;<br />      padding-top:30px;<br />}</pre>

&nbsp;

We are now going to add the new padding. We just add the class to our element that need changing through Javascript.

<pre class="wp-block-preformatted">document.getElementById("changing-div").className = "change-padding";</pre>

&nbsp;

## **Method 2: Using Javascript only**

We can make padding changes to a html element directly through javascript.

Javascript already has methods that can be used to make such changes. So let do this.

To make change all the paddings use .style.padding:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.padding="30px 50px 30px 50px";</pre>

To change the top padding only use .style.paddingTop:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingTop="30px";</pre>

To change the right padding only use .style.paddingRight:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingRight="50px";</pre>

To change the bottom padding only use .style.paddingBottom:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingBottom="30px";</pre>

To change the left padding only use .style.paddingLeft:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingLeft="50px";</pre>

&nbsp;

3. Revert the padding to previous state

You may want to revert to the previous padding size if the user undos the previous action. To do this you will have to undo the changes you made.

For method 1, you just need to remove the class you added from the HTML element.

<pre class="wp-block-preformatted">document.getElementById("changing-div").classList.remove("change-padding");</pre>

For method 2, you will need to  set the padding to the previous size.

To revert all padding to its previous state use .style.padding:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.padding="20px 30px 20px 30px";</pre>

Or

To  revert the top padding only to its previous state use .style.paddingTop:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingTop="20px";</pre>

To revert the right padding only to its previous state use .style.paddingRight:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingRight="30px";</pre>

To revert the bottom padding to its previous state only use .style.paddingBottom:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingBottom="20px";</pre>

To change the left padding only use .style.paddingLeft:

<pre class="wp-block-preformatted">document.getElementById("changing-div").style.paddingLeft="30px";</pre>

&nbsp;

I prefer method 1 since:

  * it keeps the CSS and Javascript seperate.
  * it uses the CSS and Javascript information I already know.
  * Remember everything will work fine whichever method you use.
  * if I am going to revert to previous set padding, I find it easier.

However, which ever method you choose, both methods will work.
