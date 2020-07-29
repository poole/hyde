---
title: How to host a HTML page on localhost
date: 2019-04-30T17:05:54+00:00
author: avic
layout: post
description: You will learn how to use Python, PHP and NODEJS host a HTML page on localhost. You don't need to know any of these three languages to run a HTML page on local host.
permalink: /host-a-html-page-on-localhost/
categories:
  - HTML
---
<img src="/public/04/IMG_20200405_174811_314-e1586098863822-825x510.jpg" alt="Drawing of Local HTML with NODEjs, PHP and Python."/> 

Normally when I want to <strong>view a HTML file</strong>, I just right-click it and choose to open it with a web browser. However, I wanted to run a html page using localhost. I went online, researched and found 3 methods that works.
<!--more-->

**Outline**
1. <a href="#what-localhost">What is localhost and where can I access it.</a>
2. Local server. What is that?
3. Methods of accessing HTML page on localhost
  - <a href="#python-section">Localhost using python</a>
  - <a href="#php-section">Local host using PHP</a>
  - <a href="#nodejs-section">Localhost using Node JS</a>
4. Why use localhost to host a html page
5. <a href="#when-localhost">When to use localhost to run a html page</a>

Sometimes, you want to see how the HTML page would work as if it were on a server. And that’s where **localhost** and local **server** comes in. Let me explain.

<h2 id="what-localhost">What is localhost and where can I access it?</h2>

Localhost is the url on a computer that points to itself. The computer does not need the internet for the address to work since it only checks on itself.

To access localhost, you write localhost or 127.0.0.1 on the browser.

When you try to access localhost now, you will find nothing there. or see default apache page(if apache is installed).You need to host a html file on a server(on your computer) that serves a page on localhost.

## Local server. What is that?

A local server is a server running on the computer you are working on. It works like any other server. You need to start the server for it. when the server is ready, it can be accessed on a specific url.

Once the server is ready, accessing the localhost on a browser will display the page or folder served by the server.

 There are three ways I have tried that worked for me and I will show you how in the next few section. These are:<br /> 

<h2 id="python-section">method 1: Use python to run a HTML page on localhost</h2> 

Python has a in-built server that you can run with a single command.

**Check if python is installed**

For this method to work, you need to have python installed on your computer. You can check if you have python installed on Windows computer by checking if it is in your programs list. 



For Ubuntu, Mac OS X and Debian, Python comes preinstalled. You can easily check if you have python in your system by typing <code> python --version </code>  on the terminal.

<strong>Running a html page on localhost UNIX</strong>(Linux and Mac OS X)

<li style="list-style-type: none;">
  <ol>
    <li>
      Open the terminal on your system.
    </li>
    <li>
      Navigate to the folder containing the HTML file.
    </li>
    <li>
      Run the command:   <code>python -m SimpleHTTPServer</code>
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
      Go to your browser and type 0.0.0.0:8000 or localhost:8000.
    </li>
    <li>
      You can set a specific port number by adding the port numuber to the command. The command on the terminal becomes : <code> python -m SimpleHTTPServer 6734 </code>
    </li>
  </ol>
</li>

Then on the browser type <code> localhost:6734</code> as the URL.

<h2 id="php-section">## Method 2: Use PHP to run an inbuilt localhost server</h2>

Php also has an i built web server that can run your files on local host.

**Check if PHP is installed**

PHP is usually installed when installing a local LAMP, WAMP or LAMP server setup. You can easily check if you have python in your system by typing:<code> php --version </code>

If PHP is installed, the output will be:<br /> 

<pre>PHP 7.2.15-0ubuntu0.18.04.2 (cli) (built: Mar 22 2019 17:05:14) ( NTS ) Copyright (c) 1997-2018 The PHP Group

Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies with Zend OPcache v7.2.15-0ubuntu0.18.04.2, Copyright (c) 1999-2018, by Zend Technologies</pre>

Othewise, if you can not get something like this on windows, read you can read how to check if PHP is installed and troubleshooting. You can Read on how to install php on Ubuntu or Windows or Mac OS X.

<li style="list-style-type: none;">
  <ol>
    <li>
      Open the terminal on your system.
    </li>
    <li>
      Navigate to the folder containing the HTML file.
    </li>
    <li>
      Run the command: php -S 0.0.0.0:8000  or php -S localhost:8000 on the terminal. You get the following output:
    </li>
  </ol>
</li>

<pre>Listening on http://localhost:8000

Document root is /home/ndugu/Documents/portfolio/activity-logger

Press Ctrl-C to quit.</pre>

<li style="list-style-type: none;">
  <ol start="4">
    <li>
      Go online to the: <a href="http://localhost:8000">http://localhost:8000.</a> Your server should be able to see your page on the browser.
    </li>
  </ol>
</li>

You can read more on <a href="https://www.php.net/manual/en/features.commandline.webserver.php" target="_blank" rel="noopener noreferrer">PHP built in web server</a>.

<h2 id="nodejs-section">Method 3: Use Node js to run html file on local host</h2>

If you have nodejs and npm installed,then you can install a http server by running this command in the terminal:

<pre>  npm install http-server -g</pre>

Navigate to folder where you have html file in terminal and type:

<pre> http-server</pre>

To run a specific html file, type:

<pre> http-server name-of-file</pre>

<h3 id="when-localhost">When to use localhost to run a html page</h3>

When you are building and testing a web project that is in your laptop that must run on a server. Some projects require that you have a local server running in your laptop. Localhost is just a way of accessing the server that you are currently working on.

#### I still can&#8217;t get the server to work. What should I look for?

Make sure your are using a colon &#8216; **:** &#8216; after localhost and not a forward slash &#8216; / &#8216;.

Most times you will see localhost url written as **localhost:8000** or any other 4 digit number. This number is called a port number. The port number allows you to run many pages on localhost with different port numbers at the same time.

When you try to access localhost now, you will find nothing there. You need to host a html file on a server(on your computer) that serves a page on localhost. Once the server is ready, accessing the localhost on a browser will display the page or folder served by the server.

If you are new to HTML, you can [learn and practice HTML](https://learn.avicndugu.com/practice-html/) on this website.