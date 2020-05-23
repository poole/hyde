---
title: What does form do in HTML?
date: 2019-07-13T10:08:55+00:00
author: avic
layout: post
permalink: /what-does-form-do-in-html/
categories:
  - HTML
---
<div dir="auto">
  <div dir="ltr">
    <div dir="ltr">
      A HTML form is used to<strong> get user input</strong> on a website(or web app) and <strong>then use</strong> the input to <strong>interact with a server</strong>. The HTML form element does three things:
    </div>
    
    <ol>
      <li style="list-style-type: none;">
        <ol>
          <li dir="ltr">
            <strong>Holds</strong> and contain the<strong> elements</strong> that will collect the input.
          </li>
          <li dir="ltr">
            <strong>point to</strong> where the collected data (from the form) will be sent.
          </li>
          <li dir="ltr">
            Indicates <strong>how the data</strong> is sent to the server(Method).
          </li>
        </ol>
      </li>
    </ol>
  </div>
</div>

<!--more-->

<div dir="auto">
  <div dir="ltr">
    <div>
      An example of a HTML form will look like this.
    </div>
    
    <pre dir="ltr">&lt;form action="/action_page.php" method="get"&gt;
    First name: &lt;input type="text" name="fname"&gt;&lt;br&gt;
    Last name: &lt;input type="text" name="lname"&gt;&lt;br&gt;
    &lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;</pre>
    
    <div dir="ltr">
      Let&#8217;s look at these three ideas in details
    </div>
    
    <h2 dir="ltr">
      1. Indicate where the data goes(ACTION)
    </h2>
    
    <div>
      The form has an attribute called action. The action attribute contains a URL. This URL is where the data is being sent by the form. The action attribute must be a valid url. The URL can be a relative path(&#8220;/contacts/clients.php&#8221;) or an absolute path (&#8220;https://avicndugu.com&#8221;).
    </div>
    
    <div>
      If you don&#8217;t include the action attribute the URL becomes the URL of the page containing the form.
    </div>
    
    <h2 dir="ltr">
      2. Holds form elements
    </h2>
    
    <div dir="ltr">
      HTML forms can contain different kind of html elements. Some of these elements are:
    </div>
    
    <pre dir="ltr">&lt;input&gt;                 &lt;textarea&gt;
&lt;button&gt;                &lt;select&gt;
&lt;option&gt;                &lt;optgroup&gt;
&lt;fieldset&gt;              &lt;label&gt;
&lt;output&gt;</pre>
    
    <h2 dir="ltr">
      3. how the data is sent to the server(Method)
    </h2>
    
    <div dir="ltr">
      On the web, you can use two methods to send data to the server. These are:
    </div>
    
    <h4 dir="ltr">
      GET Method:
    </h4>
    
    <div>
      You can use GET method to <strong>ask the server</strong> to send back some <strong>information.</strong>
    </div>
    
    <div dir="ltr">
      Any data you submit in this form will appear as part of the URL.
    </div>
    
    <div dir="ltr">
      An example of a get request is the google search. If you look at the URL when you do a google search, you will see what you typed appear there.
    </div>
    
    <div dir="ltr">
      <img class="aligncenter size-full wp-image-344" src="/public/07/get-method-url-string-google-search.png" alt="" />
    </div>
    
    <h4 dir="ltr">
      POST Method:
    </h4>
    
    <div dir="ltr">
      You can use the post method when you need to submit sensitive information like passwords, credit card number etc.
    </div>
    
    <div>
      Your data does not appear in the URL and is therefore considered secure.
    </div>
    
    <div dir="ltr">
    </div>
    
    <h3 dir="ltr">
      What does form action mean in HTML?
    </h3>
    
    <div dir="ltr">
      The form &#8216;action&#8217; is a form attribute that is a URL that indicates where the data in the form will be sent to.
    </div>
    
    <h3 dir="ltr">
      What is form action and method in HTML?
    </h3>
    
    <div dir="ltr">
      Form action specifies where your form will send the data while method specifies the way in which you send data.
    </div>
    
    <h3 dir="ltr">
      Where do you use form tags?
    </h3>
    
    <div dir="ltr">
      HTML forms can be used to:
    </div>
    
    <div dir="ltr">
      <ol>
        <li>
          Fill multiple choice questions: Commonly used in surveys, personality test etc
        </li>
        <li>
          Fill essay questions: Commonly used when applying for school, scholarship program etc.
        </li>
        <li>
          Collect data.
        </li>
        <li>
          Login/ Sign up: Used on any site that requires you to become a member.
        </li>
      </ol>
    </div>
  </div>
</div>

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->

<!--more-->