---
title: 9 steps to creating a web page using HTML [Illustrated guide]
date: 2019-06-07T14:00:48+00:00
author: avic
layout: post
description: Follow these 9 steps and create your first one page HTML website. You will be able to add  pictures, a youtube video and publish the web page online.
permalink: /create-a-web-page-using-html/
categories:
  - HTML
  - Projects
---
If you have ever wondered how HTML is used to make websites with pictures and videos, you have landed at the right place. I am going to walk you through the 9 steps of building a one page website using HTML. If you can build a one page website, you can build a multi-page website.

## Requirements
You only need two things: a text editor and a browser. If you know how to use these two, skip the requirements section and go to the 9 steps process.
* ### A text editor

You need a text editor to write the HTML code. Every computer has a text editor so don't be in a hurry to install anything yet. You can use **Notepad on Windows, Gedit on Ubuntu and TextEdit on MacOS X**.

You will hear about fancy text editors that you should install. However, for your first HTML webpage, you don't need to install anything. Use the text editors already in your computer.

After building your first webpage, you can check some of the [other tools](/resources/) I use when making webpages that will make your work more comfortable.

* ### A browser

You will be using **Firefox, Chrome, Chromium, Safari or any other web browser** already installed in your computer.

* ### Content of the webpage

All webpages always contain some kind of information in various format like text, images, videos etc. For you to make a webpage, you need to some content or use dummy text and images.

If you just want to practice, you can copy the content I already prepared here.

If you want to create a unique webpage, you will have to:

* **Write the Content**

  Write or copy the text content that you will use on your webpage and save it on a document. If you copied some of content from other sources online, remember to copy the URL of the source. Then, save this in a document.

  If you cannot find a topic for the webpage, pick a topic on <a href="/100-html-practice-projects-ideas-for-beginners/">100 topic ideas for your first webpage</a>.

* **Download the images or copy image URL**

  Find some relevant and useful images. Once you have found them, download the images or copy the url of the image and save it in document.

  Once you have the text and image, its time to move on to the next step.


* ### The website design

For your first webpage, I would recommend that you stick with a simple design web page. The web design is how the website looks. Remember, you are just practicing how to build webpages not design them.

You can choose from this simple [html projects collection](/html-only-projects/) I prepared.

For this tutorial we will be building a webpage about **Crickets For Food**.
<img class="aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-youtube.png" alt="Example of practice webpage"/>  
This webpage is not fancy but it a good first project. I made it one column to keep things beginner friendly.


## 7 steps to create your first HTML webpage
### Step 1: Open a text/ html editor

Remember the text editor I talked about earlier on, time to open and use it. If you have used one before, skip to the next section. If you don't know how, the instructions below will help you depending on the kind of computer you use.  

- [How to open a text editor on a Ubuntu](https://youtube.com) [Youtube]
- [How to open a text editor on a Window computer](https://youtu.be/NO6ee3sQmu8) [Youtube]
- [How to open a text editor on a Mac](https://youtu.be/zCN75v4Bbdk) [Youtube]

After opening the text editor of your choice, create a new file. Then, you can proceed to the next step.

### Step 2: Write some html code

We are now going to add the HTML boiler plate code. This is the code that will allow the browser to correctly display your webpage.

Copy and paste the code below into your file. Your file should look like this now:

<pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    Your content here.
  &lt;/body&gt;
&lt;/html&gt;
</pre>

Save the html page by pressing CTRL + S or click on file option then save option. Ensure that you name the file in the following format: "name" then **".html"** examples index.html, cooking.html.  

You can use these two guidelines when naming webpage file:

- <strong>use .html file name extension: </strong>The file name extension html tells the computer that that file is a web page and should be viewed by a web browser.
- <strong>Use underscore or hyphen instead of space:</strong> If you choose to name your file to have more than one word, use hyphen or underscore between the words. If you put spaces in the file name, the webpage may not be found by the web browser.

Choose where to save the file. Once you have choosen a place to save the file, click save.

To view the file. Use your file manager to navigate to the folder your HTML file is. Right click on the file and open it with a browser. You should see something like this.

<img class="size-full aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/basic-template-view.png"/> 

### Step 3: Add the text content

Copy the content you wrote earlier or the ready made content I arranged for you to use. Paste it in between the body tags.

Refresh the webpage on the browser. It will look like a blob of text with no paragraphs or headings shown below.

<img class="size-full aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-text-only.png"/>

### Step 4: Add the html tags.
#### Headings
First, we shall tackle the headings. Check which part or the text was the main heading.
In our example it is "Insect eating: The ultimate guide to eating crickets".

Place this text between h1 tags as shown below:
{% highlight html%}
  <h1>
    Insect eating: The ultimate guide to eating crickets
  </h1>
{% endhighlight %}

Save your work and check the result on the browser.

<img class="size-full aligncenter" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-heading.png" />  

#### Paragraphs
For the paragraphs of text, place each paragraph of text between the <code><p></p></code> html tags.
Example: 
{% highlight html%}
<p>
  When you hear about eating insects most people gross out. However, Insects are concidered a delicacy in many parts of the world. Most of the insects eaten are farm grown but in some places, they don' shy away from eating insects collected from the wild.
</p>
<p>
  Eating insects is concidered:
</p>
  healthy since insects have less fat content.
  enviromentally friendly: It takes less amount of food/plants to rear insects compared to cows.
  people who don't eat milk and meat products can try out insects as protein substitute.

{% endhighlight %}

View the result on the browser.

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-paragraph.png" /> 


### Step 6: Add a list
Lists make reading a group of things easier on our eyes and brain. Lets add a bullet points type  list:
{% highlight html%}
<ul>
  <li>healthy since insects have less fat content.</li>
  <li>enviromentally friendly: It takes less amount of food/plants to rear insects compared to cows.</li>
  <li>people who don't eat milk and meat products can try out insects as protein substitute.</li>
</ul>
{% endhighlight %}

Refresh and view the result on the browser.

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-unordered-list.png" /> 

### Step 7: Add images

Remember the URL's or the images you saved. Now is the time to unleash them.  
We are going to use the HTML's img tag <code>&lt;img src="URL" alt="Shown when image cannot load"&gt;</code> to add your images on the webpage.

If you just copied the images' URL, you will add the URL inside the quotes of src attribute. Remember to add alt attribute that shows when the image cannot be displayed. Example:
{% highlight html %}
<img src="https://avicndugu.github.io/practice-projects-html/cricket-eating/final/img/fried-crickets.jpg" alt="Fried crickets on display">
{% endhighlight %}

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-image.jpg"/> 

### Step 8: Embed a youtube video

Search for relevant video on youtube. Once you have found it, click on share button/ link. You will get a popup. Click on embed option.

Click on the copy button to copy the code that is displayed.

Paste your code on your webpage where you want the video to be displayed. For my case this is the code that i got: 

{% highlight html %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/BwC4WRKi5QY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% endhighlight %}

<iframe width="560" height="315" src="https://www.youtube.com/embed/BwC4WRKi5QY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

View the html page on a browser.

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-youtube.jpg" /> 

If you have completed all the 8 steps, you should have a working HTML page that you should be proud of.


### Step 9: Add a link to your source of information
If you copied some content from another web page, it is concidered appropriate to add a URL pointing to the original source of information.

You can add a link using <code>&lt;a href="URL"&gt;Words explaining what you will find if you click on the link&lt;/a&gt;</code> HTML tag.
{% highlight html %}
<a href="https://avicndugu.github.io/practice-projects-html/cricket-eating/final/">HTML and CSS Cricket Project</a>
{% endhighlight %}

View the html page on a browser. You should now have a link at the bottom with the words: "HTML and CSS Cricket Project".

<img class="alignnone size-full" src="https://avicndugu.github.io/practice-projects-html/cricket-eating/screenshots/with-link.jpg" />


### Additional Tips
* Test your links to make sure they are working. You can test your link by clicking on them to see if they take you to the right page.
* <strong>Optional:</strong> Publish the web page online. Once you are ready, you can share your works online. You can use github or on codepen to publish your webpage online.
* <strong>Optional:</strong> Add some CSS to make the webpage look great. Once you compete working on the HTML, you can proceed to style the webpage using CSS. Here are some of the things you can do to make the webpage great:
* Adjust the font-size and font type of the text.
* Adjust the size of the images.

<!-- If you downloaded your images, we are going to put them in one folder. It is common practice to place all images to be used on one folder. So, lets create an folder called img. Add all your downloaded images here.
 -->
