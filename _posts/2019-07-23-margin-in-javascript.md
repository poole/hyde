---
id: 354
title: 'Margin in javascript &#8211; complete overview'
date: 2019-07-23T18:10:09+00:00
author: avic
layout: post
guid: https://learn.avicndugu.com/?p=354
permalink: /margin-in-javascript/
categories:
  - Javascript
---
**Margin** in **javascript** is the **same margin** in html**.** You can set the amount of margin an element using Javascript. Margin is the space between the border and the outside container holding the element.

<!--more-->

Using Javascript, you can change the margin an element using the margin property. Lets look at how you can do this.

### Change all margins

You can change the margin using the **margin property** in javascript. You can then use the id of the element to set the new margin:

<pre>var box= document.querySelector("#box");
box.addEventListener('click', function(){
      box.style.margin="50px 100px 50px 100px";
});</pre>

### Changing top margin only

You are going to use the **marginTop** property to set the top margin  only using javascript.

<pre>box.addEventListener('click', function(){
      box.style.marginTop="100px";
});</pre>

### Changing bottom margin only

You can use the marginBottom property to change the bottom margin in javascript.

<pre>box.addEventListener('click', function(){
      box.style.marginBottom="50px";
});</pre>

The element now has a margin of 50 pixels.

### Changing left margin only

The **marginRight** property sets the new left margin to 100px.

<pre>box.addEventListener('click', function(){
   box.style.marginLeft="100px";
});</pre>

### Changing right margin only

To change the right margin only use the **marginRight** property.

<pre>box.addEventListener('click', function(){
      box.style.marginRight="50px";
});</pre>

&nbsp;