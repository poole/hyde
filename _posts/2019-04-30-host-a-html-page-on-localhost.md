---
id: 250
title: How to host a HTML page on localhost
date: 2019-04-30T17:05:54+00:00
author: avic
layout: post
guid: https://learn.avicndugu.com/?p=250
permalink: /host-a-html-page-on-localhost/
categories:
  - HTML
---
><img class="aligncenter wp-image-571 size-full" src="https://learn.avicndugu.com/wp-content/uploads/2019/04/IMG_20200405_174811_314-e1586098863822.jpg" alt="" width="1960" height="1945" srcset="https://learn.avicndugu.com/wp-content/uploads/2019/04/IMG_20200405_174811_314-e1586098863822.jpg 1960w, https://learn.avicndugu.com/wp-content/uploads/2019/04/IMG_20200405_174811_314-e1586098863822-150x150.jpg 150w, https://learn.avicndugu.com/wp-content/uploads/2019/04/IMG_20200405_174811_314-e1586098863822-300x298.jpg 300w, https://learn.avicndugu.com/wp-content/uploads/2019/04/IMG_20200405_174811_314-e1586098863822-768x762.jpg 768w, https://learn.avicndugu.com/wp-content/uploads/2019/04/IMG_20200405_174811_314-e1586098863822-1024x1016.jpg 1024w" sizes="(max-width: 1960px) 100vw, 1960px" /> 

<span style="font-weight: 400;">Normally when I want to <strong>view a HTML file</strong>, I just right-click it and choose to open it with a web browser. However, I wanted to run a html page using localhost. I went online, researched and found 3 methods that works.<br /> </span><!--more-->

**Outline**

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol>
        <li style="list-style-type: none;">
          <ol>
            <li style="font-weight: 400;">
              <span style="font-weight: 400;">What is localhost and where can I access it.</span>
            </li>
            <li style="font-weight: 400;">
              <span style="font-weight: 400;">Local server. What is that?</span>
            </li>
            <li style="font-weight: 400;">
              <span style="font-weight: 400;">Methods of accessing HTML page on localhost<br /> </span>
            </li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
</li>

<p style="padding-left: 120px;">
  <span style="font-weight: 400;"><br /> <a href="#python-section">a. Method1: Using python</a><br /> <a href="#php-section">b. Method 2: Using PHP</a><br /> <a href="#nodejs-section">c. Method 3: Using Node JS</a></span>
</p>

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol>
        <li style="list-style-type: none;">
          <ol start="4">
            <li>
              Why use localhost to host a html page
            </li>
            <li>
              When to use localhost to run a html page
            </li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>
</li>

Sometimes, you want to see how the HTML page would work as if it were on a server. And that’s where **localhost** and local **server** comes in. Let me explain.

## What is localhost and where can I access it?

Localhost is the url on a computer that points to itself. The computer does not need the internet for the address to work since it only checks on itself.

To access localhost, you write localhost or 127.0.0.1 on the browser.

When you try to access localhost now, you will find nothing there. or see default apache page(if apache is installed).You need to host a html file on a server(on your computer) that serves a page on localhost.

## Local server. What is that?

A local server is a server running on the computer you are working on. It works like any other server. You need to start the server for it. when the server is ready, it can be accessed on a specific url.

Once the server is ready, accessing the localhost on a browser will display the page or folder served by the server.

<span style="font-weight: 400;"> </span><span style="font-weight: 400;">There are three ways I have tried that worked for me and I will show you how in the next few section. These are:<br /> </span>

## <span style="font-weight: 400;">method 1: Use python to run a simple server</span> {#python-section}

<span style="font-weight: 400;">Python has a in-built server that you can run with a single command.</span>

**Check if python is installed**

<span style="font-weight: 400;">For this method to work, you need to have python installed on your computer. You can check if you have python installed on Windows computer by checking if it is in your programs list. </span>



<span style="font-weight: 400;">For Ubuntu, Mac OS X and Debian, Python comes preinstalled. </span><span style="font-weight: 400;">You can easily check if you have python in your system by typing <code> python --version </code>  on the terminal.</span>

<span style="font-weight: 400;"><strong>Running a html page on localhost UNIX</strong>(Linux and Mac OS X)</span>

<li style="list-style-type: none;">
  <ol>
    <li>
      <span style="font-weight: 400;">Open the terminal on your system.</span>
    </li>
    <li>
      <span style="font-weight: 400;">Navigate to the folder containing the HTML file.</span>
    </li>
    <li>
      <span style="font-weight: 400;">Run the command:</span><span style="font-weight: 400;">   <code>python -m SimpleHTTPServer</code></span>
    </li>
  </ol>
</li>

<p style="padding-left: 40px;">
  You will see a log with where you can access the page
</p>

<pre style="padding-left: 40px;">Serving HTTP on 0.0.0.0 port 8000</pre>

<li style="list-style-type: none;">
  <ol start="4">
    <li>
      <span style="font-weight: 400;">Go to your browser and type 0.0.0.0:8000 or localhost:8000.</span>
    </li>
    <li>
      <span style="font-weight: 400;">You can set a specific port number by adding the port numuber to the command. The command on the terminal becomes : <code> python -m SimpleHTTPServer 6734 </code></span>
    </li>
  </ol>
</li>

<span style="font-weight: 400;">Then on the browser type <code> localhost:6734</code> as the URL.</span>

## <span style="font-weight: 400;">Method 2: Use PHP to run an inbuilt server</span> {##php-section}

<span style="font-weight: 400;">Php also has an i built web server that can run your files on local host.</span>

**Check if PHP is installed**

<span style="font-weight: 400;">PHP is usually installed when installing a local LAMP, WAMP or LAMP server setup. </span><span style="font-weight: 400;">You can easily check if you have python in your system by typing:</span><span style="font-weight: 400;"><code> php --version </code></span>

<span style="font-weight: 400;">If PHP is installed, the output will be:<br /> </span>

<pre><span style="font-weight: 400;">PHP 7.2.15-0ubuntu0.18.04.2 (cli) (built: Mar 22 2019 17:05:14) ( NTS )</span> <span style="font-weight: 400;">Copyright (c) 1997-2018 The PHP Group</span>

<span style="font-weight: 400;">Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies with Zend OPcache v7.2.15-0ubuntu0.18.04.2, Copyright (c) 1999-2018, by Zend Technologies</span></pre>

<span style="font-weight: 400;">Othewise, if you can not get something like this on windows, read you can read how to check if PHP is installed and troubleshooting. You can </span><span style="font-weight: 400;">Read on how to install php on Ubuntu or Windows or Mac OS X.</span>

<li style="list-style-type: none;">
  <ol>
    <li>
      <span style="font-weight: 400;">Open the terminal on your system.</span>
    </li>
    <li>
      <span style="font-weight: 400;">Navigate to the folder containing the HTML file.</span>
    </li>
    <li>
      <span style="font-weight: 400;">Run the command: php -S 0.0.0.0:8000  or php -S localhost:8000 on the terminal. </span><span style="font-weight: 400;">You get the following output:</span>
    </li>
  </ol>
</li>

<pre><span style="font-weight: 400;">Listening on http://localhost:8000

</span><span style="font-weight: 400;">Document root is /home/ndugu/Documents/portfolio/activity-logger

</span><span style="font-weight: 400;">Press Ctrl-C to quit.</span></pre>

<li style="list-style-type: none;">
  <ol start="4">
    <li>
      <span style="font-weight: 400;">Go online to the: </span><a href="http://localhost:8000"><span style="font-weight: 400;">http://localhost:8000.</span></a> Your server should be able to see your page on the browser.
    </li>
  </ol>
</li>

<span style="font-weight: 400;">You can read more on <a href="https://www.php.net/manual/en/features.commandline.webserver.php" target="_blank" rel="noopener noreferrer">PHP built in web server</a>.</span>

## <span style="font-weight: 400;">Method 3: Use Node js to run html file on local host</span> {##nodejs-section}

<span style="font-weight: 400;">If you have nodejs and npm installed,then you can install a http server by running this command in the terminal:</span>

<pre><span style="font-weight: 400;">  npm install http-server -g</span></pre>

<span style="font-weight: 400;">Navigate to folder where you have html file in terminal and type:</span>

<pre><span style="font-weight: 400;"> http-server</span></pre>

<span style="font-weight: 400;">To run a specific html file, type:</span>

<pre><span style="font-weight: 400;"> http-server name-of-file</span></pre>

## When to use localhost to run a html page

When you are building and testing a web project that is in your laptop that must run on a server. Some projects require that you have a local server running in your laptop. Localhost is just a way of accessing the server that you are currently working on.

#### I still can&#8217;t get the server to work. What should I look for?

Make sure your are using a colon &#8216; **:** &#8216; after localhost and not a forward slash &#8216; / &#8216;.

Most times you will see localhost url written as **localhost:8000** or any other 4 digit number. This number is called a port number. The port number allows you to run many pages on localhost with different port numbers at the same time.

When you try to access localhost now, you will find nothing there. You need to host a html file on a server(on your computer) that serves a page on localhost. Once the server is ready, accessing the localhost on a browser will display the page or folder served by the server.

If you are new to HTML, you can [learn and practice HTML](https://learn.avicndugu.com/practice-html/) on this website.