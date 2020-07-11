---
layout: page
title: Archive
---
<ul>
{% for post in site.posts %}

<!-- {{ post.date | date_to_string }} » [ {{ post.title }} ]({{ post.url }}) -->
<!-- * [ {{ post.title }} ]({{ post.url }}) ({{ post.date | date_to_string }})  <br />
  {{ post.description }} -->
<li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date_to_string }})<br>
{{ post.description }}
</li>
{% endfor %}
</ul>