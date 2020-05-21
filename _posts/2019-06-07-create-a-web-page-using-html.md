---
id: 308
title: What are the steps to create a web page using HTML?
date: 2019-06-07T14:00:48+00:00
author: avic
layout: post
guid: https://learn.avicndugu.com/?p=308
permalink: /create-a-web-page-using-html/
categories:
  - HTML
  - Projects
---
If you have taken any tutorial on HTML you might be wondering: I know some HTML but how do I make a webpage from scratch? Well, this tutorial is for you. What is a better way of doing this than making a webpage.

## The webpage itself

For your first webpage, I would recommend that you make an already designed website. Remember, you are just practicing how to build webpages not design them. You can choose from this simple [html projects collection](/100-html-practice-projects-ideas-for-beginners/) I prepared. You can also checkout freeCodeCamp&#8217;s tribute page project.

For this tutorial we will be building this webpage.

<img class="aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-youtube.png" alt="Example of practice webpage"/>  
This webpage is not fancy but it a good first project. I made it one collumn to keep things beginner friendly.

## Requirements

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol>
        <li>
          <strong>A text editor</strong>: We shall use the text editor to write the code. Every computer has a text editor so don&#8217;t be in a hurry to install anything yet. Your will be writing your html on a text editor.
        </li>
        <li>
          <strong>A browser</strong>: We shall use Firefox, Chrome, Chromium, Safari or any other web browser already installed in your computer.
        </li>
      </ol>
    </li>
  </ol>
</li>

You will hear about fancy text editors that you should install. However, for your first html webpage, you don&#8217;t need to install anything new. After building your first webpage and enjoy doing it, you can check some of the other tools I use when making webpages that will make your work more comfortable.

## Content of the webpage

All webpages always contain some kind of information in various format like text, images, videos etc. For you to make a webpage, you need to get the content or use dummy text and images.

If you just want to practice, you can copy the content I already prepared here.

If you want to create a unique webpage, you will have to:

<li style="list-style-type: none;">
  <ul>
    <li style="list-style-type: none;">
      <ul>
        <li>
          <strong>Write the text</strong>:Write the text that will go onto your webpage. If you copied some content somewhere online,remember to copy the URL of the source. and save this in a document. If you cannot find a topic for the webpage, read article on <a href="/100-html-practice-projects-ideas-for-beginners/">100 topic ideas for your first webpage</a>.
        </li>
        <li>
          <strong>Download the images or copy image URL: </strong>Find some relevant and useful images. Once you have found them, download the images or copy the url of the image and save it in document.
        </li>
      </ul>
    </li>
  </ul>
</li>

Once you have the text and image, its time to move on to the next step.

## Open a text/ html editor

Remember the text editor I talked about earlier on, time to open and use it. If you have used one before, skip to the next section. If you don&#8217;t know how, the instructions below will help you depending on the kind of computer you use.  
**How to open a text editor on a Ubuntu**



**How to open a text editor on a Window computer**



**How to open a text editor on a Mac**



After opening the text editor of your choice, you can proceed to the next step.

## Write some html code

We are now going to add the boiler plate code. This is the code that will allow the browser to correctly display the webpage.



Copy and paste this code into your file.

Your file should look like this now:

<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    Your content here.
&lt;/body&gt;
&lt;/html&gt;</pre>

Save the html page by pressing CTRL + S or click on file option then save option. Ensure that you name the file in the following format: &#8220;name&#8221; then &#8220;.html&#8221; examples index.html, cooking.html.  
Here are some guideline to use when naming webpage file.

<li style="list-style-type: none;">
  <ul>
    <li>
      <strong>use .html file name extension: </strong>The file name extension html tells the computer that that file is a web page and should be viewed by a web browser.
    </li>
    <li>
      <strong>Use underscore or hyphen instead of space:</strong> If you choose to name your file to have more than one word, use hyphen or underscore between the words. If you put spaces in the file name, the webpage may not be found by the web browser.
    </li>
  </ul>
</li>

Decide choose select where to save the file.  
Once you choose a place to save the file, click save.

Right click on the file and open it with a browser. You will see something like this.

<img class="size-full aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/basic-template-view.png"/> 

### Add the text content

Copy the content you wrote earlier here or the ready made content I arranged for you to use.  
Paste it between the body tags.

It will look like a blob of text with no paragraphs or headings shown below.

<img class="size-full aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-text-only.png"/> 

### Add the html tags.

First, we shall tackle the headings.  
Check which part or the text was the main heading. In our example it is &#8230;..  
Place this text between h1 tags. Save your work and check the result on the browser.

<img class="size-full aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-heading.png" />  
Place the other subheadings between the h2 html tags.  
For the paragraphs of text, place each paragraph of text between the p html tag.  
View the result on the browser.

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-paragraph.png" /> 

### Add images

Remember the URL&#8217;s or the images you saved. Now is the time to unleash them.  
We are going to use the img tag (<img>).

<li style="list-style-type: none;">
  <ul>
    <li>
      <strong>Adding downloaded images:</strong> It is common practice to place all images to be used on one folder. So, lets create an folder called img. Add all your downloaded images here.
    </li>
    <li>
      <strong>Adding images using URL:</strong> The url will go inside the quotes of src attribute. Remember to add alt attribute that shows when the image cannot be displayed. Example:
    </li>
  </ul>
</li>

<p style="padding-left: 40px;">
  <img src=&#8221;https://avicndugu.github.io/practice-projects-html/cricket-eating/final/img/fried-crickets.jpg&#8221;
</p>

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-image.jpg"/> 

### Embed a youtube video

Go to the youtube video you want to add to your webpage. Click on share button/ link. You will get a popup. Click on embed option.

Cllick on the copy button to copy the code that is displayed.

Paste your code on your webpage where you want the video to be displayed.

<iframe width=&#8221;560&#8243; height=&#8221;315&#8243; src=&#8221;https://www.youtube.com/embed/5Ay841gEcak&#8221; frameborder=&#8221;0&#8243; allow=&#8221;accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture&#8221; allowfullscreen></iframe>



View the html page on a browser.

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-youtube.jpg" /> 

### Additional tips

<li style="list-style-type: none;">
  <ul>
    <li>
      Test your links to make sure they are working.
    </li>
    <li>
      <strong>Optional:</strong> Publish the web page online. Once you are ready, you can share your works online.
    </li>
    <li>
      <strong>Optional:</strong> Add some CSS to make the webpage look great. Once you compete working on the HTML, you can proceed to style the webpage using CSS. Here are some of the things you can do to make the webpage great:
    </li>
  </ul>
</li>

<li style="list-style-type: none;">
  <ul>
    <li style="list-style-type: none;">
      <ul>
        <li style="list-style-type: none;">
          <ul>
            <li>
              Adjust the font-size and font type of the text.
            </li>
            <li>
              Adjust the size of the images.
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</li>

&nbsp;
