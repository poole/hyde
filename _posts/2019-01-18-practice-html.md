---
id: 42
title: HTML Practice Notes
date: 2019-01-18T08:03:08+00:00
author: avic
layout: page
guid: https://learn.avicndugu.com/?page_id=42
permalink: /practice-html/
---
Outline

  1. What is HTML?
  2. History of HTML
  3. How HTML works: Introduction to HTML
  4. HTML text editors
  5. Headings
  6. Paragraphs
  7. Text formatin
  8. Div
  9. Header
 10. Aside
 11. footer
 12. Intermediate html tags [tutorial]
 13.  
 14. Ordered list
 15. Unordered list
 16. Code
 17. Pre
 18. Forms
 19. Html input
 20. Text Inputs
 21. Radio input
 22. Submit button
 23. Blockquotes
 24. Video
 25. Audio
 26. Embed
 27. Canvas

## What is html?

HTML is the short form for Hyper Text Markup Language. It helps us to display text, links, pictures, sounds and videos correctly on a webpage. Every time you visit a website through you should know that HTML is involved.

## History of html

HTML was created by [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) to share documents across the internet. It has evolved. You can now be able to share images, videos, and even play games on the internet.

## How HTML works: Introduction to HTML.

**HTML is** used to describe the appearance of a document to be displayed by a internet browser.

HTML documents are normal text documents but with &#8216;**.html**&#8216; file name extension. Normal text files have a &#8216;**.txt**&#8216; file name extension.

When the HTML file is viewed on a browser, the browser interprets the HTML code is but does not display the html code itself.

To view the html code itself, you can right click on the webpage and click on view source.



To edit the HTML, you need to use a text editor.

## **HTML Text Editors**

HTML text editors allow you to create and edit HTML files. There are many text editors you can use. Some of them are:

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol>
        <li>
          Sublime text editor of my choice. Their upgrade notification might annoy you.
        </li>
        <li>
          Notepad++ (for windows only).
        </li>
        <li>
          Atom (for windows and Ubuntu).
        </li>
        <li>
          Visual Studio Code (for windows and Ubuntu).
        </li>
      </ol>
    </li>
  </ol>
</li>

You can read more about html text editors.

**Html elements**

Html element includes the opening tag, the closing tag and the content between the tags.

**Html tags**

These are tags used to tell the browser the beginning and the end of a HTML element.

Basic html elements and tags tutorial

1. Basic html page

<del>They help divide your html into meaningful sections.</del>

We have the basic template for each HTML page. Each HTML

* * *

<p style="text-align: center;">
   page usually has these tags.
</p>

&nbsp;

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">&lt;!DOCTYPE html&gt;<br />&lt;html&gt;<br />  &lt;head&gt;<br />    &lt;title&gt;This is a title&lt;/title&gt;<br />  &lt;/head&gt;<br />  &lt;body&gt; <br />    This is a basic HTML page.<br />  &lt;/body&gt;<br />&lt;/html&gt;</pre>
  </div>
  
  <div class="wp-block-column">
    This is a basic HTML page. 
    
    <p>
      &nbsp;
    </p>
  </div>
</div>

Anything that you want to be displayed on the HTML page is added between the body tags.

<iframe width=&#8221;500&#8243;  height=&#8221;300&#8243; src=&#8221;<https://scrimba.com/p/pZaVfV/cPydyur>.embed&#8221;> </iframe>

## HTML Text Tags

### 1. Headings

There are 6 type of heading with h1 being used as the title of the post or article for SEO purposes.

The rest can be used for headings and sub headings.

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">&lt;h1&gt;H1 Heading1&lt;/h1&gt;<br />&lt;h2&gt;H2 Heading2&lt;/h2&gt;<br />&lt;h3&gt;H3 Heading3&lt;/h3&gt; <br />&lt;h4&gt;H4 Heading4&lt;/h4&gt;<br />&lt;h5&gt;H4 Heading5&lt;/h5&gt;<br />&lt;h6&gt;H6 Heading6&lt;/h6&gt;</pre>
  </div>
  
  <div class="wp-block-column">
    <h1>
      H1 Heading1
    </h1>
    
    <h2>
      H2 Heading2
    </h2>
    
    <h3>
      H3 Heading3
    </h3>
    
    <h4>
      H4 Heading4
    </h4>
    
    <h5>
      H4 Heading5
    </h5>
    
    <h6>
      H6 Heading6
    </h6>
    
    <p>
      &nbsp;
    </p>
  </div>
</div>

### 2. Paragraphs

This is used to display the normal text in paragraphs like the normal paragraph.

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">&lt;p&gt;This is a paragraph.&lt;/p&gt;<br />&lt;p&gt;This is a second paragraph.&lt;/p&gt;</pre>
  </div>
  
  <div class="wp-block-column">
    <p>
      This is a paragraph.
    </p>
    
    <p>
      This is a second paragraph.
    </p>
  </div>
</div>

### 3. Line Break

The line break tag <br> breaks a line of text wherever it is inserted.

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <p>
      <p>The line break will be here<br>, and not here on a full line of text.</p>
    </p>
  </div>
  
  <div class="wp-block-column">
    <p>
      The line break will be here<br />, and not here on a full line of text.
    </p>
  </div>
</div>

### 4. Bold & Strong

Both turns the text into bold but strong is concidered to have more meaning to search engines.

<b>Bolded text</b>

### 5. Italic & Emphasized

Both turns the text into italics but strong is concidered to have more meaning to search engines.

<i>Italized text</i>

<em>Emphasised</em> text

### 6. Underlined

Use this carefully so that the users don&#8217;t confuse them with links.

<u>Underlined text</u>

### 7. Ordered Lists

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">&lt;ol&gt;<br /> &lt;li&gt;Item 1&lt;/li&gt;<br /> &lt;li&gt;Item 2&lt;/li&gt;<br /> &lt;li&gt;Item 3&lt;/li&gt;<br />&lt;/ol&gt;</pre>
  </div>
  
  <div class="wp-block-column">
    <ol>
      <li style="list-style-type: none;">
        <ol>
          <li style="list-style-type: none;">
            <ol>
              <li>
                Item 1
              </li>
              <li>
                Item 2
              </li>
              <li>
                Item 3
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </div>
</div>

### 8. Unordered Lists

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">&lt;ul&gt;<br /> &lt;li&gt;Item 1&lt;/li&gt;<br /> &lt;li&gt;Item 2&lt;/li&gt;<br /> &lt;li&gt;Item 3&lt;/li&gt;<br />&lt;/ul&gt;</pre>
  </div>
  
  <div class="wp-block-column">
    <ul>
      <li style="list-style-type: none;">
        <ul>
          <li style="list-style-type: none;">
            <ul>
              <li>
                Item 1
              </li>
              <li>
                Item 2
              </li>
              <li>
                Item 3
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>

11. Superscript

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">The word &lt;sup&gt;tags&lt;/sup&gt; is superscript.</pre>
  </div>
  
  <div class="wp-block-column">
    The word <sup>tags</sup> is superscript.
  </div>
</div>

12. Subscript

<div class="wp-block-columns has-2-columns">
  <div class="wp-block-column">
    <pre class="wp-block-preformatted">The word &lt;sup&gt;tags&lt;/sup&gt; is a subscript.</pre>
  </div>
  
  <div class="wp-block-column">
    The word <sub>tags</sub> is a subscript.
  </div>
</div>

13. Horizontal Line

Create a line that breaks the text.

<hr>

14. Marked or Highlighted Text

15. Deleted (Cross-Through) Text

<del> tags. </del>

16. Short & Long Quotations

<blockquote>All of this text will be in a blockquote like the rest of the examples.</blockquote>

<q>I&#8217;m quoting this story.</q>

17. Italics

The <i>dog ate my homework</i> is a commonly used lie.

18. Images

<img src=”https://learn.avicndugu.com/wp-content/uploads/2019/03/pet-dogs.jpg”>

<img class="aligncenter wp-image-235 size-full" src="https://learn.avicndugu.com/wp-content/uploads/2019/03/pet-dogs.jpg" alt="pet dogs" width="640" height="480" srcset="https://learn.avicndugu.com/wp-content/uploads/2019/03/pet-dogs.jpg 640w, https://learn.avicndugu.com/wp-content/uploads/2019/03/pet-dogs-300x225.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /> 

### Html Links

Links help you navigate from one page to the next web page or a different website.

The tag used to make links are the <a href=”URL”></a> tags.

The URL is the target, which page or website you want to go to.

Relative path

<img src=”/wp-content/uploads/2019/03/pet-dogs.jpg”>

Absolute path

Link that opens in a new tab/ window

### Html comment tag

Html comment tags are used to add a comment in a html document. Anything inside the comment tag is not rendered on the browser but can be seen if you check the html source code.

<!&#8211; This is a comment that will not be visible &#8211;>

Creating your first html page

A

Html structure tags layout elements



Div

<pre>&lt;div&gt;<br /><br />&lt;/div&gt;</pre>

<nav>

</nav>

Header

<header>

<pre>Aside<br /><br />&lt;aside&gt;<br /><br />&lt;/aside&gt;</pre>

footer

<pre>&lt;footer&gt;<br /><br />&lt;/footer&gt;</pre>

Intermediate html tags [tutorial]

Code

Pre

Forms

<pre>&lt;form&gt;<br />&lt;input type=""&gt;<br />&lt;/form&gt;</pre>

Html input types

Text Inputs

<pre>&lt;form action="contacts.php"&gt;<br />  &lt;input type="text" name="firstname" placeholder="First Name"&gt;<br />&lt;/form&gt;</pre>

Radio input

<pre>&lt;form action="contacts.php"&gt;<br />  &lt;input type="radio" name="firstname" placeholder="First Name"&gt;<br />  &lt;input type="radio" name="firstname" placeholder="First Name"&gt;<br />&lt;/form&gt;</pre>

Submit button

<pre>&lt;form action="contacts.php"&gt;<br />  &lt;input type="submit" value="Submit"&gt;<br />&lt;/form&gt;</pre>

<p style="text-align: center;">
  OR
</p>

<pre>&lt;form action="contacts.php"&gt;<br />  &lt;button type="submit"&gt;Submit&lt;/button&gt;<br />&lt;/form&gt;</pre>

You can read an in-depth article on HTML forms that I wrote.

QUOTES

Inline quotes

<pre>&lt;p&gt;When Dave asks HAL to open the pod bay door, HAL answers: &lt;q cite="https://www.imdb.com/title/tt0062622/quotes/qt0396921"&gt;I'm sorry, Dave. I'm afraid I can't do that.&lt;/q&gt;&lt;/p&gt;</pre>

Blockquotes

<pre>&lt;blockquote cite="https://www.huxley.net/bnw/four.html"&gt;<br />&lt;p&gt;Words can be like X-rays, if you use them properly – they'll go through anything. You read and you're pierced.&lt;/p&gt;<br />&lt;/blockquote&gt;<br />&lt;cite&gt;– Aldous Huxley, Brave New World&lt;/cite&gt;</pre>

Video

<pre class="w3-code notranslate htmlHigh"><span class="tagnamecolor"><span class="tagcolor">&lt;</span>video<span class="attributecolor"> width<span class="attributevaluecolor">="320"</span> height<span class="attributevaluecolor">="240"</span> controls</span><span class="tagcolor">&gt;</span></span>
  <span class="tagnamecolor"><span class="tagcolor">&lt;</span>source<span class="attributecolor"> src<span class="attributevaluecolor">="movie.mp4"</span> type<span class="attributevaluecolor">="video/mp4"</span></span><span class="tagcolor">&gt;</span></span>
  <span class="tagnamecolor"><span class="tagcolor">&lt;</span>source<span class="attributecolor"> src<span class="attributevaluecolor">="movie.ogg"</span> type<span class="attributevaluecolor">="video/ogg"</span></span><span class="tagcolor">&gt;</span></span>
  Your browser does not support the video tag.
<span class="tagnamecolor"><span class="tagcolor">&lt;</span>/video</span>&gt;</pre>

Audio

<pre>&lt;audio controls&gt;<br />  &lt;source src="horse.ogg" type="audio/ogg"&gt;<br />  &lt;source src="horse.mp3" type="audio/mpeg"&gt;<br />  Your browser does not support the audio element.<br />&lt;/audio </pre>

Embed

<pre class="w3-code notranslate htmlHigh"><span class="tagnamecolor"><span class="tagcolor">&lt;</span>iframe<span class="attributecolor"> width<span class="attributevaluecolor">="420"</span> height<span class="attributevaluecolor">="315"</span><br />  src<span class="attributevaluecolor">="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"</span></span><span class="tagcolor">&gt;</span></span><br /><span class="tagnamecolor"><span class="tagcolor">&lt;</span>/iframe<span class="tagcolor">&gt;</span></span></pre>

<div>
   
</div>

Canvas

<pre><span class="tagnamecolor"><span class="tagcolor">&lt;</span>canvas<span class="attributecolor"> id<span class="attributevaluecolor">="myCanvas"</span> width<span class="attributevaluecolor">="200"</span> height<span class="attributevaluecolor">="100"</span> style<span class="attributevaluecolor">="border:1px solid #000000;"</span></span><span class="tagcolor">&gt;</span></span><br /><span class="tagnamecolor"><span class="tagcolor">&lt;</span>/canvas<span class="tagcolor">&gt;</span></span></pre>