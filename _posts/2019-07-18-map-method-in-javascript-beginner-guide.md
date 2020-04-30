---
id: 350
title: '.map() method in javascript- Beginner guide'
date: 2019-07-18T21:55:07+00:00
author: avic
layout: post
guid: https://learn.avicndugu.com/?p=350
permalink: /map-method-in-javascript-beginner-guide/
categories:
  - Javascript
---
I ran into a challenge that required use of  .map(), .reduce() and .filter() methods. Previously, I have been tiptoeing around ES6 syntax. Why you ask? I found it a bit tough for me to understand.

<!--more-->

I am going to share with you some of the things I learnt in this post.

## What is map () in JavaScript?

**.map()** is a method in javascript that you can use to manipulate arrays in Javascript. The .map() method **calls** the **function** provided **once for each element** of the **array**.

The output of the map() method is another array. What the map method does is it takes the array and does something to each element of the array and them spits out the new array.

The map method itself has not changed the original array but makes a new array.

Lets look at an example.

<pre>let points = [1, 2, 3, 4, 5];
console.log(points);
// [1, 2, 3, 4, 5]</pre>

We have a simple array or numbers. We want to create a new array with the 10 points added to each array item.

<pre>let newPoints = points.map(function(num){ return num + 10});
// console.log(newPoints)
// <span class="message-body-wrapper"><span class="message-flex-body"><span class="message-body devtools-monospace"><span class="objectBox objectBox-array" data-link-actor-id="server1.conn0.child1/obj199"><span class="arrayLeftBracket">[ </span><span class="objectBox objectBox-number">11</span>, 12, <span class="objectBox objectBox-number">13, </span><span class="objectBox objectBox-number">14, 15</span><span class="arrayRightBracket">]</span></span></span></span></span></pre>

As you can see, newPoints is an array.

We can make the function even more compact using ES6 syntax.

<pre>let newPoints = points.map( num =&gt; num + 10 );
// console.log(newPoints)
// <span class="message-body-wrapper"><span class="message-flex-body"><span class="message-body devtools-monospace"><span class="objectBox objectBox-array" data-link-actor-id="server1.conn0.child1/obj199"><span class="arrayLeftBracket">[ </span><span class="objectBox objectBox-number">11</span>, 12, <span class="objectBox objectBox-number">13, </span><span class="objectBox objectBox-number">14, 15</span><span class="arrayRightBracket">]</span></span></span></span></span></pre>

Lets look at another example:  
We have wizard each with a given allowance in their bank account.

<pre>let wizards = [{name: "Harry Potter", allowance:100}, {name:"Ron Weasley", allowance:50}, {name: "Hermione Granger", allowance:90}];</pre>

They have learnt of a magic spell that can double their allowance in the bank. Lets do this.

<pre>let tripleAllowance = wizards.map(money =&gt; money.allowance * 3);
console.log(tripleAllowance);
// [ 300, 150, 270 ];</pre>

**NOTE:**

  1. .map() does not create a new array, but you can assign its result to a variable.
  2. The array must have values otherwise, the map() function will not work.
  3. The map() method calls the provided function once for each element in an array, in order.