---
title: Javascript preview image before upload
date: 2019-02-20T08:20:30+00:00
author: avic
layout: post
description: Use JavaScript to create a simple image preview so that users can check the images before uploading to your server.
permalink: /javascript-preview-image-before-upload/
categories:
  - Javascript
tags:
  - html
  - javascipt
---
When users are uploading images, they are not sure if they are uploading the right image. You can help them by adding image preview before upload. Fortunately, you can do this with just HTML and Javascript.

<img src="https://github.com/avicndugu/hyde/blob/public/2019-02-18-132805_1280x800_scrot.png" alt="image preview before upload">

## The image upload button

First, we create the html button that allows us to upload a picture.

<pre class="wp-block-preformatted"><code>&lt;div class="container" id="upload"&gt;&lt;br />   &lt;form&gt;&lt;br />     &lt;input type="file" accept="image/*" name="image" value="fileupload" id="file" onchange="loadFile(event)"&gt;&lt;br />   &lt;/form&gt;&lt;br />&lt;/div&gt;&lt;br /></code></pre>

We have added an event that will be fired once the user chooses a file: onchange.

We have created an input that only accepts images. once the image is selected, the event onchange is fired and function loadFile is called.

## Image preview container

To preview the image we need to create an image tag. This will be the container used to display the image.

<pre class="wp-block-preformatted"><strong>Add the image tag with an id below the form tag.</strong></pre>

<pre class="wp-block-preformatted"><code>&lt;div class="container" id="upload"&gt;&lt;br />   &lt;form&gt;&lt;br />     &lt;input type="file" accept="image/*" name="image" value="fileupload" id="file" onchange="loadFile(event)"&gt;&lt;br />   &lt;/form&gt;</code><br /><code>  </code><strong>&lt;img id="output" width="300" /&gt;</strong><code>&lt;br />&lt;/div&gt;&lt;br /></code></pre>

## Loading image using Javascript

Now on to javascript. Lets add the code that will display the image once the onchange event is fired.

<pre class="wp-block-preformatted"><strong>&lt;script&gt;<br />      function loadFile(event) {<br />           var image = document.getElementById('output');<br />           image.src = URL.createObjectURL(event.target.files[0]);<br />     };<br />&lt;/script&gt;</strong></pre>

To recap the whole tutorial, here is how all the code will look like.

<pre class="wp-block-preformatted"><br /><strong>&lt;body&gt;<br />     &lt;div class="container" id="upload"&gt;<br />       &lt;form&gt;<br />           &lt;input type="file" accept="image/*" name="image" value="fileupload" id="file" onchange="loadFile(event)"&gt;<br />      &lt;/form&gt;<br />      &lt;img id="output" width="300" /&gt;<br />    &lt;/div&gt;<br />  &lt;/body&gt;<br /> &lt;script&gt;<br /> function loadFile(event) {<br />      var image = document.getElementById('output');<br />      image.src = URL.createObjectURL(event.target.files[0]);<br />  };<br />&lt;/script&gt;</strong></pre>

You can play around with the code on codepen:

<p class="codepen" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-height="265" data-theme-id="0" data-default-tab="html,result" data-user="Axeaxel" data-slug-hash="JxwBgg" data-pen-title="image-preview-upload">
  See the Pen <a href="https://codepen.io/Axeaxel/pen/JxwBgg/"> image-preview-upload</a> by Avic (<a href="https://codepen.io/Axeaxel">@Axeaxel</a>) on <a href="https://codepen.io">CodePen</a>.
</p>



&nbsp;
