---
layout: page
title: Basics
image: 'https://qwtel.com/hydejack/assets/img/doc.jpg'
color: '#8e5c75'
redirect_from: /docs/latest/basics/
---

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

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

Categories | `/jekyll/update/2017/04/07/welcome-to-jekyll/`
Tags       | `/2017/04/07/welcome-to-jekyll/`

As far as Jekyll is concerned, these are the only differences.

### Tags and categories in Hydejack
Categories and tags are displayed by Hydejack below the title, after the date. Categories are displayed with the preposition "in", while tags are displayed with the preposition "on", e.g.

Categories | Welcome to Jekyll¬ 07 Apr 2017 **in** Jekyll / Update
Tags       | Welcome to Jekyll¬ 07 Apr 2017 **on** Jekyll, Update
Both       | Welcome to Jekyll¬ 07 Apr 2017 **in** Jekyll / Update **on** Jekyll, Update

### Adding a new category or tag
Be default, categories and tags are rendered as plain text. Further steps are necessary if you want them to link to a page that contains a list of all posts that belong to that category or tag.

For each "featured" category or tag, a file called `<categoryname>.md` or `<tagname>.md` has to be created in `_featured_tags` or `_featured_categories`, respectively.
Each file in these folders is part of a [Jekyll Collection](https://jekyllrb.com/docs/collections/).

<!-- In order for the category or tag to render its own page, it needs to have the `list` layout.
Like posts, featured tags and categories may have a `description`.
A tag's or category's `image` and `color` will be used as fallback for all pages that belong to that category or tag.
It is recommended that the `slug` is set manually (normally it is derived from the title) because it must match the names used on a post's front matter. -->

Essential properties are set in the files front matter:

~~~yml
---
layout: list
title:  Hyde
slug:   hyde
description: >
  Hyde is a brazen two-column Jekyll](http://jekyllrb.com) theme
  that pairs a prominent sidebar with uncomplicated content.
  It's based on [Poole](http://getpoole.com), the Jekyll butler.
image:  'data:image/gif;base64,R0lGODlhAQABAPAAACAgIP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
color:  '#268bd2'
menu:   true
---
~~~

`layout`
: Must be `list`

`title`
: Used as title of the page, as well as name of the category or tag as part of the line below a blog post's title.
Can be different from the name of the tag or category, as long as `slug` is identical to the name.

`slug`
: Must be identical to the key used in the blog's front matter, i.e. if you use `categories: [jekyll]` or `tags:       [jekyll]`, the `slug` must be `jekyll`. Normally the slug is derived from the title, but since it is used to find all posts that belong to a certain tag or category, it is recommended that you set it explicitly.

`description`
: A medium-length description, used on the tag or category's detail page as meta description and shown in a message box below the title. [Demo]({{ "/tag/hyde" | relative_url }}).

`image`
: Will be used as fallback for all pages that belong to that category or tag.

`color`
: Will be used as fallback for all pages that belong to that category or tag.

`menu`
: Set to to `true` if you want the category or tag to be linked in the sidebar. For more information, see
[Adding an entry to the sidebar](#adding-an-entry-to-the-sidebar).

Once the file is created, the page can be found at `/category/<categoryname>` or `/tag/<tagname>`.

## Adding a page
You can add generic pages that support markdown content but aren't blog posts.
For example, this documentation is written in markdown, consisting of several generic pages.

To create a page, create a new markdown file and put `layout: page` in a front matter

~~~yml
---
layout: page
title:  Documentation
---
~~~

Now you can add content as you would in a blog post.

## Adding an entry to the sidebar
Hydejack's sidebar can add links to any Jekyll page. In order for a page to appear in the sidebar, it needs to have a truthy `menu` value defined in its front matter. The page also needs to have a `title`, otherwise the entry in the sidebar will be blank.

If you want the link to appear at a particular position, you can set a numeric value to the `order` key. However, the page is not guaranteed to appear in the 5th position if you set a value of `5`, since it will only use the number to sort the pages. The position of a page also depends on the `order` of other pages in the sidebar.

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
[Demo]({{ site.baseurl }}{% link about.md %}).

The main difference is that it will display an author's `about` text and `picture` above the regular content.
To create an about page, make sure `layout` is set to `about`, and that the `author` key is set to an author defined in `_data/authors.yml`. For more on authors, see [Adding an author]({{ site.baseurl }}{% link docs/6.0.0/configuration.md %}#adding-an-author).

~~~yml
---
layout: about
title:  About
author: qwtel
---
~~~

## Adding a welcome page*
If you bought the "PRO" version of Hydejack you have access to the `welcome` layout.
It is intended to showcase your projects and blog posts in a compact way.
Technically, it is a modified version of the `about` layout, so it will also show author information at the top.


You can create a welcome page by creating a new markdown file and setting the layout to `welcome` in the front matter.

~~~yml
---
layout: welcome
title: Welcome
author: qwtel
---
~~~

**NOTE**: If you would like the welcome page to be at the site's root, you'd  have to name the file `index.md`. Additionally, you should move the blog layout (`index.html`) to a subdirectory like `blog` or `posts`. See [Choosing a blog layout]({{ site.baseurl }}{% link docs/6.0.0/configuration.md %}#choosing-a-blog-layout)
{:.message}

Without further configuration, the welcome page will show the two most recent projects and five most recent blog posts.
However, the welcome layout supports selecting specific projects and posts in the front matter.

~~~yml
---
layout: welcome
title: Welcome
selected_projects:
  - /projects/hydejack-v5
  - /projects/hyde-v2
selected_posts:
  - /2017/03/17/javascripten
  - /2016/09/17/the-fast-one
  - /2016/08/30/social-media-impocalypse
more_projects: /projects/
more_posts: /posts/
---
~~~

`layout`
: Must be `welcome`.

`selected_projects`
: A list of project ids that are displayed below the author's about text and the content of the page.
A project's id is its path with a leading `/` and no file extension at the end.
If no ids are provided, the two most recent projects will be used.

`selected_projects`
: A list of blog post ids that are featured on the welcome page.
A posts's id is its path with a leading `/` and no file extension at the end.
If no ids are provided, the five most recent posts will be used.

`more_projects`
: URL. When provided, a "More Projects" link will be shown below the projects.

`more_posts`
: URL. When provided, a "More Posts" link will be shown below the posts.

## Adding a project*
Projects are organized using Jekyll's [Collection feature](https://jekyllrb.com/docs/collections/).
Each project is represented by a file in the `_projects` directory.
A projects meta information is defined in the files front matter.
Additionally, you can add markdown content. A project's front matter may look like:

~~~yml
---
layout: project
title: 'Hyde v2'
date: 2 Jan 2014
screenshot:
  src: '/hydejack/assets/img/projects/hyde-v2@0,25x.png'
  srcset:
    2870w: '/hydejack/assets/img/projects/hyde-v2.png'
    1435w: '/hydejack/assets/img/projects/hyde-v2@0,5x.png'
    718w:  '/hydejack/assets/img/projects/hyde-v2@0,25x.png'
link: http://hyde.getpoole.com
source: https://github.com/poole/hyde
caption: Hyde is a brazen two-column Jekyll theme.
description: >
  Hyde is a brazen two-column Jekyll](http://jekyllrb.com) theme
  that pairs a prominent sidebar with uncomplicated content.
  It's based on [Poole](http://getpoole.com), the Jekyll butler.
author: mdo
---
~~~

`layout`
: Must be set to `project`

`date`
: Providing a year is the minimum requirement. Used to sort the projects.

`screenshot`
: A 16:9 screenshot of the project. You can pass a URL to an image, but it is recommended that you provide an entire `srcset` (see above). Hydejack will show the screenshot in various sizes, depending on the screen width, so that no specific size will fit all. Instead it is recommended that you use a [mipmap]-like approach, providing the image in multiple sizes, each image half the width of the previous one. The `src` key is a fallback image for browsers that don't support the `srcset` attribute. The keys of the `srcset` hash will be used as descriptors.
For more information on `srcset`, see the [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset), or [this article from CSS-Tricks](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/).

`link`
: A URL pointing to a live version of the project.

`source`
: For open source projects, an URL pointing to a repository.

`caption`
: A short description, shown as part of each "project card" in the `projects` layout.

`description`
: A medium-length description, used on the project's detail page as meta description and shown as message box below he screenshot.

`author`
: Shown below the project, similar to posts.


## Adding a resume*
Hydejack's "PRO" version features a generalized resume layout.
It generates the resume page from a valid [JSON Resume](https://jsonresume.org/), which is good news if you already have a JSON resume. Otherwise, there are various ways of obtaining one:

* You can use the visual [JSON Resume Editor](http://registry.jsonresume.org/).
* If you have a LinkedIn profile, you can try [LinkedIn to Json Résumé](https://jmperezperez.com/linkedin-to-json-resume/).
* You can edit the [example `resume.json`](https://github.com/qwtel/hydejack/blob/v6/_data/resume.json) in the `_data` directly. It contains example entries for each type of entry.

If you prefer editing YAML files, there is an [example `_resume.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/_resume.yml) file in `_data`.
In order to use it, delete `resume.json`, and rename `_resume.yml` to `resume.yml`.

Once you have a JSON Resume, place it into `_data`. To render the resume page, create a new markdown file and set the layout to `resume` in the front matter.

~~~yml
---
layout: resume
title: Resume
---
~~~

**NOTE**: You can download the final [`resume.json`]({{ site.baseurl }}{% link assets/resume.json %}){:.no-push-state download="resume.json"} (minified) from the assets folder. When running locally, you can also find it at `_site/assets/resume.json`.
{:.message}

***

Continue with [Writing]({{ site.baseurl }}{% link docs/6.0.0/writing.md %}){:data-flip="title"} »
{:.faded.heading}

[mipmap]: https://en.wikipedia.org/wiki/Mipmap
