---
layout: page
title: Posts
---
<div>
<ul>
{% assign posts_list = site.posts %}
    {% for node in posts_list %}
      {% if node.title != null %}
        {% if node.layout == "post" %}
          <li><a href="{{ node.url }}">{{ node.title }}</a> ({{ node.date | date_to_string }})</li>
        {% endif %}
      {% endif %}
    {% endfor %}
</ul>
</div>