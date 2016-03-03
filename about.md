---
layout: page
title: About
---

{% comment %}
  This inserts the "about" photo and text from `_config.yml`.
  You can edit it there (jekyll needs restart!) or remove it and provide your own photo/text.
  Don't forget to add the `me` class to the photo, like this: `![alt](src){:.me}`.
{% endcomment %}

{% if site.author.photo %}
  ![{{ site.author.name }}]({{ site.author.photo }}){:.me}
{% endif %}

{{ site.author.about }}

[write something about self]

***

## References

### Design

* Based on [Hyde](http://hyde.getpoole.com/) by [`@mdo`](https://twitter.com/mdo).

### Icons

* [Wreath](https://thenounproject.com/term/laurel-wreath/203146/) by [Nick Abrams](https://thenounproject.com/nabrams/) from the [Noun Project](https://thenounproject.com/).

[usr]: /how-to-find-a-short-username
