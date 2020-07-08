How to add a simple search bar to Jekyll Blog

Collecting the Data
1. Create search.json file on root of your jekyll blog.


2. Add this  code to your search.json file. It will generate a json file with all the headings in your blog. 
<code>
---
---
[
  {% for post in site.posts %}
    {
      "title"    : "{{ post.title | escape }}",
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</code>

3. Create a script folder inside public if it doesn't exist.
add a new file named search.js.


I tried other methods but they were too complicated to debug why they were not working.



My methods
1. STEP 1
create a folder named search: add an index.html file.
Add the following content here.


---
title: Search
author: avic
layout: page
permalink: /search/
---
<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search">
<ul id="myUL">
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">
      {{ post.title }}
    </a>
  </li>
  {% endfor %}
</ul>
<script>
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      console.log(a)
    } else {
      li[i].style.display = "none";
    }
  }
}
</script>
</div>


This liquid syntax code creates a list of all your titles.

{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">
      {{ post.title }}
    </a>
  </li>
  {% endfor %}


The rest of the the input area triggers the script tag below to search the list generated and update it with the matching terms.


Code source was w3school.com

