---
title: How to display html tags as plain text in HTML
date: 2019-04-02T10:59:31+00:00
author: avic
layout: post
description: You can use HTML entities to show HTML tags as plain text. HTML entities are special characters used to display HTML markup code that you would not normally see on a browser. 
permalink: /display-html-tags-as-plain-text/
categories:
  - HTML
---
You can **show HTML tags as plain text in HTML** on a website or webpage by **replacing `<` with  ` &lt;`  or  `&60;` and `>`   with ` &gt;` or  `&62;` on each HTML tag** that you want to be visible.

<img class="aligncenter wp-image-214 size-full" src="/public/04/display-code.png" alt="Show HTML tags on browser I using HTML entities"/>

Ordinarily, HTML tags are not visible to the reader on the browser. They are there but you cannot see them.

However, through **HTML entities** you can display the HTML tags that are part of the HTML markup code that are not visible on a browser.


**Example**  
So if you want to display: `<p> This is a paragraph </p>` on the browser, you write it as:  `&lt;p&gt;` This is a paragraph `&lt;p&gt;`.

## How to show HTML tags: HTML entities

HTML has some special characters that make up the language; they are the reserved character. The **reserved characters** in HTML are < , > , &#8221; and &. The browser will never display them since they have some meaning in HTML.  

HTML entities are pieces of text used to **display reserved characters**, invisible characters(like space) and other non-keyboard characters.

Entities begin with the ‘&’ followed by ‘entity name’ or ‘entity number’ and end with the ‘;’ ie. &entity-name; or &entity-number;

<h4 style="text-align: center;">
  Reserved characters in HTML
</h4>

<img src="/public/04/special-characters-html.png" alt="Reserved characters in HTML"/> 

<h4 style="text-align: center;">
  List of HTML entities
</h4>

<img src="/public/04/other-html-entities.png" alt="Commonly used HTML entities"/>

View the complete lists of HTML entities.

  1. The complete [list of HTML entities](https://www.freeformatter.com/html-entities.html) with their numbers and names.
  2. [Character Entity Reference Chart](https://dev.w3.org/html5/html-author/charref).
  3. [HTML entities list](https://developer.mozilla.org/en-US/docs/Glossary/Entity)

## How to quickly replace lots of < and > fast

The quickest way to replace alot of <(less than) and >(greater than) signs is to use the search and replace feature. This feature is available in all text editors.

<img src="/public/04/mass-change-entities.png" alt="replace alot of html < and > in HTML tags" /> 

To use this feature use &#8216;CTRL + H&#8217; or click on &#8216;FIND&#8217; on the menu bar and then click on replace. Add the symbol you want to replace on the find box and the entity you want to replace with on the replace box.

Then, click on replace or replace all.

I hope by now you can be able to display your HTML code on the web browser.

## How to preserve the code formatting/ indentation

As by now, you have noted that the indentation on your HTML code has disappeared.  
However, you can preserve the indentation by using the pre HTML tags. So wrap the code that you want to display online using the (&lt;pre&gt;pre html tags&lt;/pre&gt;)

<pre>&lt;pre &gt;
  Your HTML code goes in here.
      And can be indented.
&lt;/pre&gt;</pre>

HTML tags.

Example.

<img src="/public/04/display-code.png" alt="preserve HTML code formating indentation using html <pre> tag"/> 

## Can I use &lt;plaintext&gt; HTML tag.

Yes. Previously, plaintext HTML tag was used to show HTML tags on a webpage.

However, the plaintext HTML tag is deprecated since HTML version 2. That means they were remove from the official HTML language and may not work as expected. My advice: don't use the &lt;plaintext&gt; HTML tag. 


## How do I display HTML tags as text in PHP?
If you want to use PHP to show HTML tags as text, then, you can use the function <code>htmlspecialchars()</code> to escape < and > characters.
<pre>
<code>
    htmlspecialchars('&lt;strong&gt;This shows HTML tags&lt;/strong&gt;')
</code>
</pre>
Now go out there and share the code. If you have any question in HTML, ask in the comments below.
