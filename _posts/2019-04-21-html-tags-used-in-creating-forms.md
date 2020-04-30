---
id: 266
title: What html tags are used in creating forms
date: 2019-04-21T21:46:52+00:00
author: avic
layout: post
guid: https://learn.avicndugu.com/?p=266
permalink: /html-tags-used-in-creating-forms/
categories:
  - HTML
---
<span style="font-weight: 400;">The html tags used in creating forms online are <strong><form> </form></strong> tags pair. These 2 html tags <strong>are</strong> the <strong>container</strong> that <strong>holds other tags</strong> that create the <strong>form fields</strong> to be filled. The tags used together with the form tags are:</span>

<!--more-->

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><label> </label></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><input></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><textarea> </textarea></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><button></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><select></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><option></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><optgroup></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><fieldset></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><label></span>
        </li>
        <li style="font-weight: 400;">
          <span style="font-weight: 400;"><output></span>
        </li>
      </ol>
    </li>
  </ol>
</li>

<span style="font-weight: 400;">That&#8217;s all the HTML tags you will need to create a form using HTML. However, I can show you how all of them are used below.</span>

## <span style="font-weight: 400;">What are HTML forms anyway and how do they look like?</span>

<span style="font-weight: 400;">Html forms are everywhere. If you have ever filled, a sign-up, log in or a subscribe form online, then you have interacted with a HTML form. A HTML form is used to collect information online and submit/ give it to a server somewhere.</span>

## <span style="font-weight: 400;">So how does a simple HTML form look like?</span>

<span style="font-weight: 400;">A basic HTML form should have the following format.</span>

<pre><span style="font-weight: 400;">&lt;form action="subscriber.php" method="post"&gt;
</span><span style="font-weight: 400;">  &lt;label for="email"&gt;Email&lt;/label&gt;
</span><span style="font-weight: 400;">  &lt;input type="email" name="email" id="email" required&gt;
</span><span style="font-weight: 400;">  &lt;input type="submit" value="Subscribe!"&gt;
</span><span style="font-weight: 400;">&lt;/form&gt;</span></pre>

[[Image output of this form]]

<span style="font-weight: 400;">This form has a place to write the email and a button to submit the data to the server.</span>

<span style="font-weight: 400;">You should have the form tags enclosing all the elements of the form. Inside, you should have the different input types that we will discuss below.</span>

## <span style="font-weight: 400;">What is inside a HTML form?</span>

### <span style="font-weight: 400;">Label <label></span>

<span style="font-weight: 400;">Used to hold the text that tells the user the work of each particular input area. Eg. label for the first name, second name, email etc.</span>

<span style="font-weight: 400;">The label is identified with [for=”name-of-the-input-associated-with-it”] to associate it with a given input.</span>

<span style="font-weight: 400;">Example</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;label for=”firstname”&gt;First Name&lt;/label&gt;</span>
<span style="font-weight: 400;">  &lt;input type=”text” name=”firstname”&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span>


</pre>

### <span style="font-weight: 400;">The input tag <input></span>

<span style="font-weight: 400;">The input tag is the most useful tag inside the form. There are many forms in which you can use them.</span>

<span style="font-weight: 400;"><input type=&#8221;&#8221;></span>

### <span style="font-weight: 400;">Input tags types</span>

#### <span style="font-weight: 400;">Text</span>

<span style="font-weight: 400;">Useful when you want the user to type a small piece of text that can fit on one line. Any kind of character is allowed including text, numbers, symbols and spaces.</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;label for="username"&gt;Username&lt;/label&gt;&lt;br&gt;</span>
<span style="font-weight: 400;">  &lt;input type="text" name="username"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

#### <span style="font-weight: 400;">Number</span>

<span style="font-weight: 400;">Useful when you want the user to enter a number as input e.g. age, number of children etc.</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;input type="number" name="age"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

#### <span style="font-weight: 400;">Email</span>

<span style="font-weight: 400;">Same as the text above, but cannot accept space and must also have @ and . in that order, that emails usually have. If these conditions are not met, it usually displays some form of warning.</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;input type="email" name="email" id="email" required&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

#### <span style="font-weight: 400;">Password</span>

<span style="font-weight: 400;">Same as text input except that it can accept numbers, input and symbols. However, when you type in this input area, the password is hidden and displayed as dots or asterisks. This prevents others from peeping and seeing passwords.</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;label for="name"&gt;Password&lt;/label&gt;</span>
<span style="font-weight: 400;">  &lt;input type="password" name="password"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

#### <span style="font-weight: 400;">Checkboxes</span>

<span style="font-weight: 400;">When you want a user to select more than one option from a given set of options, checkboxes are used. </span>

<pre><span style="font-weight: 400;">&lt;form&gt;
</span><span style="font-weight: 400;">  &lt;input type="checkbox" name="activity" value="swimmer"&gt;Swimmer&lt;br&gt;</span>
<span style="font-weight: 400;">  &lt;input type="checkbox" name="activity" value="actor" checked&gt;Actor&lt;br&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

#### <span style="font-weight: 400;">Radio-buttons</span>

<span style="font-weight: 400;">When you want a user to select only one option from a given set of options, radio buttons are used. </span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;input type="radio" name="activity" value="swimmer"&gt;Swimmer&lt;br&gt;</span>
<span style="font-weight: 400;">  &lt;input type="radio" name="activity" value="actor" checked&gt;Actor&lt;br&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

#### <span style="font-weight: 400;">Submit</span>

<span style="font-weight: 400;">This gives the form a button that when clicked, it submits the data to the server. Every form needs a submit type input that will submit the data.</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">  &lt;input type="submit" value="Subscribe!"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

### <span style="font-weight: 400;">Textarea <textarea></span>

<span style="font-weight: 400;">This proved the same as input type text but on a specified number of lines that you want. The rows specify the number of lines and cols define the number of characters per line.</span>

<pre><span style="font-weight: 400;">&lt;textarea rows="4" cols="30"&gt;</span>
<span style="font-weight: 400;">This is a text area that holds text on multiple number of lines. It can display text on 4 rows and can allow 30 characters per row.</span>
<span style="font-weight: 400;">&lt;/textarea&gt;</span></pre>

### <span style="font-weight: 400;">Dropdown list <select></span>

<span style="font-weight: 400;">This is a dropdown list that appears when clicked. once clicked, the input goes back to the original view.</span>

<pre><span style="font-weight: 400;">&lt;form&gt;</span>
<span style="font-weight: 400;">    &lt;select&gt;</span>
<span style="font-weight: 400;">        &lt;option value="mangoes"&gt;Mangoes&lt;/option&gt;</span>
<span style="font-weight: 400;">        &lt;option value="pineapples"&gt;Pineapples&lt;/option&gt;</span>
<span style="font-weight: 400;">        &lt;option value="bananas"&gt;Bananas&lt;/option&gt;</span>
<span style="font-weight: 400;">        &lt;option value="avocados"&gt;Avocados&lt;/option&gt;</span>
<span style="font-weight: 400;">    &lt;/select&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

### <span style="font-weight: 400;">Form action</span>

<span style="font-weight: 400;">This says where the form data will be sent when the submit button is pressed. It is URL of a file in that server. The URL can be absolute (http://www.) or relative (/forms/hope.php).</span>

&nbsp;

<pre><span style="font-weight: 400;">&lt;form action="subscriber.php" method="post"&gt;</span>
<span style="font-weight: 400;">  &lt;label for="email"&gt;Email&lt;/label&gt;</span>
<span style="font-weight: 400;">  &lt;input type="email" name="email" id="email" required&gt;</span>
<span style="font-weight: 400;">  &lt;input type="submit" value="Subscribe!"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

&nbsp;

&nbsp;

<pre><span style="font-weight: 400;">&lt;form action="subscriber.php" method="post"&gt;</span>
<span style="font-weight: 400;">  &lt;label for="email"&gt;Email&lt;/label&gt;</span>
<span style="font-weight: 400;">  &lt;input type="email" name="email" id="email" required&gt;</span>
<span style="font-weight: 400;">  &lt;input type="submit" formaction="newSubsciberList.php" value="Subscribe!"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

<span style="font-weight: 400;">The url at <input type=&#8221;submit&#8221; formaction> formaction overides the default form action at the top.</span>

### <span style="font-weight: 400;">Form method</span>

<span style="font-weight: 400;">This specifies the method by which you want the data to be sent. There are two methods.</span>

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol>
        <li>
          <h4>
            <span style="font-weight: 400;"> Get</span>
          </h4>
        </li>
      </ol>
    </li>
  </ol>
</li>

<span style="font-weight: 400;">The items to be sent appears on the URL which makes it less secure.</span>

<pre><span style="font-weight: 400;">&lt;form action="subscriber.php" method="get"&gt;</span>
<span style="font-weight: 400;">  &lt;label for="email"&gt;Email&lt;/label&gt;</span>
<span style="font-weight: 400;">  &lt;input type="email" name="email" id="email" required&gt;</span>
<span style="font-weight: 400;">  &lt;input type="submit" value="Subscribe!"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

<li style="list-style-type: none;">
  <ol>
    <li style="list-style-type: none;">
      <ol start="2">
        <li>
          <h4>
            <span style="font-weight: 400;"> Post</span>
          </h4>
        </li>
      </ol>
    </li>
  </ol>
</li>

<span style="font-weight: 400;">It is considered more secure and is the default method used when not specified.</span>

<pre><span style="font-weight: 400;">&lt;form action="subscriber.php" method="post"&gt;</span>
<span style="font-weight: 400;">  &lt;label for="email"&gt;Email&lt;/label&gt;</span>
<span style="font-weight: 400;">  &lt;input type="email" name="email" id="email" required&gt;</span>
<span style="font-weight: 400;">  &lt;input type="submit" value="Subscribe!"&gt;</span>
<span style="font-weight: 400;">&lt;/form&gt;</span></pre>

## <span style="font-weight: 400;">Where do we use form tag in HTML?</span>

<span style="font-weight: 400;">Form tags are used where you have to submit user data to a server somewhere. </span><span style="font-weight: 400;">If you need a form for subscribing to a newsletter, filling a questionnaire, login, sign up, etc. the form tags will get you there.</span>

## <span style="font-weight: 400;">Why form tag is used in HTML?</span>

<span style="font-weight: 400;">Without form tags, user&#8217;s cannot submit the information that they have entered to a server in a normal form. However, there are technology tools that allow users to submit and interact with data without relying on the form tags.</span>

## <span style="font-weight: 400;">Can we use form tag inside div tag?</span>

<span style="font-weight: 400;">Form tags can be used inside a div tag. In fact, form tags can be used anywhere inside the body tags(<body> </body>) of a HTML document. However, you should not put a form tag within another form tag.</span>