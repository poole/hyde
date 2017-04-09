---
layout: page
title: Basics
---

[TODO]

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

<!-- ## Basics -->
## Choosing a blog layout
Hydejack features two layouts for showing your blog posts.

* The `blog` layout is a traditional blog layout that is paginated and shows the title and an excerpt of each post. This layout is recommended for blogs with a large number of posts and frequent updates.
[Live]({{ site.basurel }}{% link index.html %}).

* The `list` layout only shows the title and groups the posts by year of publication. This layout is recommended for blogs with a smaller number of posts and infrequent updates.
[Live]({{ site.basurel }}{% link posts.md %}).

In order to choose either layout, open `index.html` in the root folder and change the `layout` property in the front matter, e.g.

~~~yml
---
layout: blog
title:  Home
---
~~~

**NOTE**: The paginated `blog` layout needs to have the `.html` file extension, while the (non-paginated) `list` layout may have the `.md` or `.markdown` extension. This is due to the `jekyll-paginate` plugin.
{:.message}

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

* `/jekyll/update/2017/04/07/welcome-to-jekyll/` for categories
* `/2017/04/07/welcome-to-jekyll/` for tags

As far as Jekyll is concerned, these is the only differences.

### Tags and categories in Hydejack

Categories and tags are displayed by Hydejack below the title, after the date. Categories are displayed with the preposition "in", while tags are displayed with the preposition "on", e.g.

* Welcome to Jekyll¬ 04/07/17 **in** Jekyll / Update
* Welcome to Jekyll¬ 04/07/17 **on** Jekyll, Update

If a post contains both, it will show the category first, e.g.

* Welcome to Jekyll¬ 04/07/17 **in** Jekyll / Update **on** Jekyll, Update

### Making a tag/category clickable

Be default, these are rendered as plain text. In order to create a "featured" tag or category, a file with the tag's / category's name has to be created in `_featured_tags` / `_featured_categories` respectively. Each file in these folders is part of a [Jekyll Collection](https://jekyllrb.com/docs/collections/) and will render it's own page.

[TODO]

~~~yml
---
layout: list
title:  Hyde
slug:   hyde
description: >
  Hyde is a brazen two-column Jekyll theme that pairs a prominent sidebar with uncomplicated content.
  It’s based on Poole, the Jekyll butler.
menu:   true
order:  2
image:  'data:image/gif;base64,R0lGODlhAQABAPAAACAgIP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
color:  '#268bd2'
---
~~~

## Writing a post

[TODO]

## Adding a page
You can add generic pages that support markdown content but aren't blog posts.
For example, this documentation is made you of several linked pages.

To create a page, create a new markdown file and put `layout: page` in a front matter

~~~yml
---
layout: page
title:  Documentation
---
~~~

Now you can add content as you would in a blog post.

## Adding an entry to the sidebar
Hydejack's sidebar can add links to any Jekyll page, but will not do so by default. In order for a page to appear in the sidebar, it needs to have a truthy `menu` value defined in its front matter.

The page also needs to have a `title`, otherwise the entry in the sidebar will be blank.

If you want the link to appear at a particular position, you can set a numeric value to `order` key. Note however, that the page is not guaranteed to appear in the 5th position if you set a value of `5`, since it will only use it to sort the pages. Its position also depends on the `order` of other pages in the sidebar, which you may modify.

E.g., this page's front matter is

~~~yml
---
layout: page
title:  Documentation
menu:   true
order:  5
---
~~~

## Adding an about page
About pages are such a frequent use case that Hydejack has a special layout for it.
However, it's only a slight modification of the `page` layout.
[Live]({{ site.baseurl }}{% link about.md %}).

The main difference is that it will display an author's `about` text and `picture` above the regular content.
To create an about page, make sure `layout` is set to `about`, and that the `author` key is set to an author defined in `_data/authors.yml`. For more on authors, see [Adding an author]({{ site.baseurl }}{% link docs/6.0.0-alpha/configuration.md %}#adding-an-author).

~~~yml
---
layout: about
title:  About
author: me
---
~~~

## Adding a welcome page*
[TODO]

## Adding a project*
[TODO]

## Adding my resume*
[TODO]
