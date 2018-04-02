---
layout: page
title: Blog
---


<div class="post-list">
<ul>
  {% for post in site.posts %}
    <li>
      <h2 class='post-title'><a href="{{ post.url }}">{{ post.title }}</a></h2>
	  <span class="post-date">{{post.date | date: "%-d %B %Y" }}</span>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
</div>
