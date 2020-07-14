---
layout: post
title: Understanding Jekyll while creating my GitHub Page
description: Few pointers from setting up a Jekyll Website
tags: jekyll blog
last_modified: 2020-07-14 17:30:00 +0000
---

### Tips
1. Setting up Jekyll website is very easy, you can follow [here](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/){:target="_blank"}.
2. I used [Hyde theme](https://github.com/poole/hyde){:target="_blank"} for my blog.
3. I followed this [blog](http://longqian.me/2017/02/09/github-jekyll-tag/){:target="_blank"} to add tags to my post. After adding tags, I also followed the blogs' [github repo](https://github.com/qian256/qian256.github.io){:target="_blank"} to style my blog. All I did was replace the _hyde.css_ and _poole.css_ from that blog.
4. When my blog was up, I started to get _Not Secure_ on the page, but this was because some of the posts which came from the theme had image links with **http** instead of **https**. After I removed those posts, I could get _Secure_ on my site.
5. To get those social media icons on the sidebar, I added the following line of code to *_layouts/default.html*. And then added the social media icon links in *_includes/sidebar.html*.
    ```html
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    ```
6. I added google analytics following this [blog](https://curtisvermeeren.github.io/2016/11/18/Jekyll-Google-Analytics.html){:target="_blank"}. One small thing you have to do is, add _\<script\>...\</script\>_ tag in the _analytics.html_ file and then add the code provided in the blog in between these.
7. Later I added anchors to headers in a post. I have written a [post]({% post_url 2020-07-14-adding-anchors %}) explaining how.