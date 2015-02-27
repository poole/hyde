---
layout: post
title: Get Request
---


<div class="message">
  Hi
</div>

Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. *Aenean eu leo quam.* Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

> Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta **sem malesuada magna** mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.

## Inline HTML elements

HTML defines a long list of available inline tags, a complete list of which can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

- **To bold text**, use `<strong>`.
- *To italicize text*, use `<em>`.
- Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use `<abbr>`, with an optional `title` attribute for the full phrase.
- Citations, like <cite>&mdash; Mark otto</cite>, should use `<cite>`.
- <del>Deleted</del> text should use `<del>` and <ins>inserted</ins> text should use `<ins>`.
- Superscript <sup>text</sup> uses `<sup>` and subscript <sub>text</sub> uses `<sub>`.

Most of these elements are styled by browsers with few modifications on our part.

## Heading

Vivamus sagittis lacus vel augue rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Code

Cum sociis natoque penatibus et magnis dis `code element` montes, nascetur ridiculus mus.

{% highlight js %}
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
{% endhighlight %}

Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.

### Gists via GitHub Pages

Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui.

{% gist 5555251 gist.md %}

Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper.

### Lists

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

* Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
* Donec id elit non mi porta gravida at eget metus.
* Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1. Vestibulum id ligula porta felis euismod semper.
2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3. Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.

<dl>
  <dt>HyperText Markup Language (HTML)</dt>
  <dd>The language used to describe and define the content of a Web page</dd>

  <dt>Cascading Style Sheets (CSS)</dt>
  <dd>Used to describe the appearance of Web content</dd>

  <dt>JavaScript (JS)</dt>
  <dd>The programming language used to build advanced Web sites and applications</dd>
</dl>

Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.

### Images

Quisque consequat sapien eget quam rhoncus, sit amet laoreet diam tempus. Aliquam aliquam metus erat, a pulvinar turpis suscipit at.

![placeholder](http://placehold.it/800x400 "Large example image")
![placeholder](http://placehold.it/400x200 "Medium example image")
![placeholder](http://placehold.it/200x200 "Small example image")

### Tables

Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="0C0" style="width:292px" class="column-headers-background">A</th><th id="0C1" style="width:973px" class="column-headers-background">B</th><th id="0C2" style="width:100px" class="column-headers-background">C</th><th id="0C3" style="width:100px" class="column-headers-background">D</th><th id="0C4" style="width:499px" class="column-headers-background">E</th></tr></thead><tbody><tr style='height:20px;'><th id="0R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">1</div></th><td class="s0" dir="ltr" colspan="5">Parameters</td></tr><tr style='height:20px;'><th id="0R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">2</div></th><td class="s1" dir="ltr">locale (optional)</td><td class="s2" dir="ltr" colspan="4">If not specified, the Smartling Files API will return a listing of the original files matching the specified criteria. When the locale is not specified, completedStringCount will be &quot;0&quot;.</td></tr><tr style='height:20px;'><th id="0R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">3</div></th><td class="s1" dir="ltr">uriMask (optional)</td><td class="s2" dir="ltr" colspan="4">Filters for URI, for example: &#39;.strings&#39;</td></tr><tr style='height:20px;'><th id="0R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">4</div></th><td class="s1" dir="ltr">fileTypes (optional)</td><td class="s2" dir="ltr" colspan="4">Identifiers: android, ios, gettext, html, javaProperties, yaml, xliff, xml, json, docx, pptx, xlsx, idml, qt, resx, plaintext, cvs<br>File types are combined using the logical ‘OR’.</td></tr><tr style='height:20px;'><th id="0R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">5</div></th><td class="s1" dir="ltr">lastUploadedAfter(optional)</td><td class="s3" dir="ltr" colspan="4">Return all files uploaded after the specified date. See Date Format for more details.</td></tr><tr style='height:20px;'><th id="0R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">6</div></th><td class="s1" dir="ltr">lastUploadedBefore(optional)</td><td class="s3" dir="ltr" colspan="4">Return all files uploaded before the specified date. See  Date Format for more details.</td></tr><tr style='height:20px;'><th id="0R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">7</div></th><td class="s1" dir="ltr">offset (optional)</td><td class="s2" dir="ltr" colspan="4">For result set returns, the offset is a number indicating the distance from the beginning of the list; for example, for a result set of &quot;50&quot; files, you can set the offset at 10 to return files 10 - 50.</td></tr><tr style='height:20px;'><th id="0R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">8</div></th><td class="s1" dir="ltr">limit (optional)</td><td class="s2" dir="ltr" colspan="4">For result set returns, limits the number of files returned; for example, for a result set of 50 files, a limit of &quot;10&quot; would return files 0 - 10.</td></tr><tr style='height:20px;'><th id="0R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">9</div></th><td class="s1" dir="ltr">conditions (optional)</td><td class="s2" dir="ltr" colspan="4">An array of the following conditions: haveAtLeastOneUnapproved, haveAtLeastOneApproved, haveAtLeastOneTranslated, haveAllTranslated, haveAllApproved, haveAllUnapproved. Conditions are combined using the logical ‘OR’.</td></tr><tr style='height:20px;'><th id="0R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px;">10</div></th><td class="s1" dir="ltr">orderBy (optional)</td><td class="s3" dir="ltr" colspan="4">Choices: names of any return parameters; for example, fileUri, stringCount, wordCount, approvedStringCount, completedStringCount, lastUploaded and fileType. You can specify ascending or descending with each parameter by adding &quot;_asc&quot; or &quot;_desc&quot;; for example, &quot;fileUri_desc&quot;. If you do not specify ascending or descending, the default is ascending.</td></tr></tbody></table>

Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo.

-----

Want to see something else added? <a href="https://github.com/poole/poole/issues/new">Open an issue.</a>
