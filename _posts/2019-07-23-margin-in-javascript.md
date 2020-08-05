---
title: 'How to get and set margin in Javascript'
date: 2019-07-23T18:10:09+00:00
author: avic
layout: page
description: Use element.style.padding to change the padding of an individual element. You can target the top,bottom, right and left padding individually using paddingTop, padding bottom, padding right and padding left respectively.
permalink: /margin-in-javascript/
categories:
  - Javascript
---
**Margin** in **javascript** is the **same margin** in **html**. You can set the amount of margin an element has using Javascript. To be clear, margin is the space between the border and the outside container holding the element.

## 1. How to set margin in Javascript
You can change the margin an element using the margin property. Lets look at how you can do this.

### a. Setting all margins using Javascript

You can change the margin using the margin property <code>"margin"</code> in javascript. You can then use the id of the element to set the new margin:

<pre>var box= document.querySelector("#box");
box.addEventListener('click', function(){
      box.style.margin="50px 100px 50px 100px";
});</pre>

### b. Changing top margin only

You are going to use the <code>"marginTop"</code> property to set the top margin  only using javascript.

<pre>box.addEventListener('click', function(){
      box.style.marginTop="100px";
});</pre>

### c. Changing bottom margin only

You can use the <code>"marginBottom</code> property to change the bottom margin in javascript.

<pre>box.addEventListener('click', function(){
      box.style.marginBottom="50px";
});</pre>

The element now has a margin of 50 pixels.

### d. Changing left margin only

The <code>"marginRight"</code> property sets the new left margin to 100px.

<pre>box.addEventListener('click', function(){
   box.style.marginLeft="100px";
});</pre>

### e. Changing right margin only

To change the right margin only use the <code>"marginRight"</code> property.

<pre>box.addEventListener('click', function(){
      box.style.marginRight="50px";
});</pre>


## 2. How to get the value of margin in javascript

Its also possible for you to obtain the values of margin using Javascript.

let's begin by getting the value of all styles applied to the "box" element. To get these styles you use <code>window.getComputedStyle(box)</code>.

In addition, you can make sure its compatible with older versions of Internet Explorer by add <code>box.CurrentStyle </code>. 

Code: 

<code>
    var style= window.getComputedStyle(box) || box.currentStyle
</code>

You can now use a simple <code>console.log(style.margin)</code> or <code>alert(style.margin)</code> to get the margin values.

<code>
    console.log(style.margin);
</code>

### a. getting all margin at once
The full code should be as following:

{% highlight javascript linenos %}
    //a. Getting all margins using Javascript 
    box.addEventListener('click', function(){
        var style = box.currentStyle || window.getComputedStyle(box)
        console.log(style.margin);
    });
{% endhighlight %}

### b. Getting the value top margin only
You can get the top margin value using this code:

{% highlight javascript linenos %}
    // b. Getting top margin only
    box.addEventListener('click', function(){
      var style = box.currentStyle || window.getComputedStyle(box)
      console.log(style.marginTop);
    });
{% endhighlight %}

### c. Getting the value of bottom margin only

Use the following code to get the bottom margin:

{% highlight javascript linenos %}
    //c. Getting bottom margin only
    box.addEventListener('click', function(){
      var style = box.currentStyle || window.getComputedStyle(box)
      console.log(style.marginBottom);
    });
{% endhighlight %}

### d. Getting the value of left margin only
The code for getting the value of right margin only:

{% highlight javascript linenos %}
    //d. Getting left margin only
    box.addEventListener('click', function(){
        var style = box.currentStyle || window.getComputedStyle(box)
        console.log(style.marginLeft);
    });
{% endhighlight %}

### e. Getting the value right margin only
The code for getting the value of right margin only:
{% highlight javascript linenos %}
    //e. Getting right margin only
    box.addEventListener('click', function(){
      var style = box.currentStyle || window.getComputedStyle(box)
      console.log(style.marginRight);
    });
{% endhighlight %}

You can view the [full code for this article on github.](https://github.com/avicndugu/projects/blob/master/margin-in-javascript.html)

## Related Article
1. how to [change padding in Javascript](/changing-padding-using-javascript/)
