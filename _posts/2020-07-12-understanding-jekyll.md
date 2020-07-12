---
layout: post
title: Understanding Jekyll while creating my GitHub Page
description: Few pointers from setting up a Jekyll Website
tags: jekyll blog
---

### Tips
1. Setting up Jekyll website is very easy, you can follow [here](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/).
2. I used [Hyde theme](https://github.com/poole/hyde) for my blog.
3. I followed this [blog](http://longqian.me/2017/02/09/github-jekyll-tag/) to add tags to my post. After adding tags, I also followed the blogs' github repo to style my blog.
4. When my blog was up, I started to get _Not Secure_ on the page, but this was because some of the posts which came from the theme had image links with **http** instead of **https**. After I removed those posts, I could get _Secure_ on my site.
5. To get those social media icons on the sidebar, I added `<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">` to *_layouts/default.html*. And then added the social media icon links in *_includes/sidebar.html*.