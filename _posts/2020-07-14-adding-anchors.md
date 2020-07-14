---
layout: post
title: Adding anchors to my posts
tags: jekyll blog
---

### 1. Download the javascripts required to enable anchors
Download the latest release from this [Git repo](https://github.com/bryanbraun/anchorjs/releases). Just copy the `anchor.min.js` file into _public/css/_ path. Then download the jQuery script from their official [website](https://jquery.com/download/). Download the compressed production version. Copy this script to _public/css/_ path as well.

### 2. Adding the scipt to _post.html_
Just add the following codeblock at the start of _\_layouts/post.html_ and you are done.
```html
---
layout: default
---

<script src="/public/css/anchor.min.js"></script>
<script src="/public/css/jquery-3.5.1.min.js"></script>
<script>
	$(function() {
    anchors.options.visible = 'always'; 
    anchors.add('.post-content > h1, h2, h3, h4, h5, h6');
	});
</script>
```



### References
1. [Blog](https://blog.briandrupieski.com/generate-anchors-in-jekyll-blog-post)
