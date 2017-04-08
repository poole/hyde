---
layout: page
title: Basics
---

[TODO]

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

<!-- ## Basics -->
## Using the `blog` layout
## Using the `list` layout

## Adding a category or tag
Hydejack allows you to use the `list` layout to show all posts of a particular tag or category.

### Tags and categories in Jekyll
Posts in Jekyll can belong to one or more categories, as well as one or more tags. They are defined in a post's front matter:

~~~yml
---
layout:     post
title:      Welcome to Jekyll
categories: [jekyll, update]
tags:       [jekyll, update]
---
~~~

Posts can also be assigned to a category based on their position within a folder structure, e.g.

~~~
├── jekyll
│   └── update
│       └── _posts
│           └── 2017-04-07-welcome-to-jekyll.markdown
~~~

would place `welcome-to-jekyll` in the categories `jekyll` and `update`.
Whether you use this method or not, categories will always be part of a posts URL, while tags will not, e.g.

* `/jekyll/update/2017/04/07/welcome-to-jekyll/`
* `/2017/04/07/welcome-to-jekyll/`

### Tags and categories in Hydejack

Categories and tags are displayed by Hydejack below the title, after the date. Categories are displayed with the preposition "in", while tags are displayed with the preposition "on", e.g.

* Welcome to Jekyll¬ 04/07/17 **in** Jekyll / Update
* Welcome to Jekyll¬ 04/07/17 **on** Jekyll, Update

If a post contains both, it will show the category first, e.g.

* Welcome to Jekyll¬ 04/07/17 **in** Jekyll / Update **on** Jekyll, Update

Be default, these are rendered as plain text. In order to create a "featured" tag or category, a file with the tag's / category's name has to be created in `_featured_tags` / `_featured_categories` respectively. Each file in these folders is part of a [Jekyll Collection](https://jekyllrb.com/docs/collections/) and will render it's own page.

~~~yml
---
layout: list
title: Hyde
slug: hyde
description: >
  Hyde is a brazen two-column Jekyll theme that pairs a prominent sidebar with uncomplicated content.
  It’s based on Poole, the Jekyll butler.
menu: true
order: 2
image: 'data:image/gif;base64,R0lGODlhAQABAPAAACAgIP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
color: '#268bd2'
---
~~~

## Add a page
## Add an about page
## Add a welcome page*
## Add a project*
## Add my resume*
