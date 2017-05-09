---
layout: page
title: Documentation
image: 'https://qwtel.com/hydejack/assets/img/doc.jpg'
color: '#8e5c75'
redirect_from: /docs/latest/complete/
---

Here you should be able to find everything you need to know to accomplish the most common tasks when blogging with Hydejack.
Should you think something is missing, [please let me know](https://github.com/qwtel/hydejack/issues).
Should you discover a mistake in the docs (or a bug in general) feel free to [open an issue](https://github.com/qwtel/hydejack/issues) on GitHub.

**NOTE**: While this manual tries to be beginner-friendly, as a user of Jekyll it is assumed that you are comfortable with editing multiple text files and running shell commands.
{:.message}

**NOTE**: This document was created using Hydejack's print layout. If you prefer to read it the documentation in your browser, you can find it [here](https://qwtel.com/hydejack-pro/docs/6.1.0/).
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

# Installation
There are multiple ways of installing Hydejack.
The easiest is [via the Ruby gem](#via-gem).
If you bought the "PRO" version of Hydejack or downloaded the zip, you'll want to install [via the zip file](#via-zip).
If you know what you are doing, you can [fork or clone the git repository](#via-git).

## Via gem
Installation via the gem-based theme has the advantage of not cluttering your blog repository, so it is especially recommended for beginners.

If you haven't already, create a new Jekyll site first:

    $ jekyll new <PATH>

Your blog directory should look something like this

~~~
├── _posts
│   └── 2017-04-07-welcome-to-jekyll.markdown
├── _config.yml
├── about.md
├── Gemfile
├── Gemfile.lock
└── index.md
~~~

Next, you'll want to add `jekyll-theme-hydejack` as a dependency by adding the following line to the `Gemfile`.

~~~ruby
gem "jekyll-theme-hydejack"
~~~

Now you want to edit the `_config.yml` of your Jekyll site and set Hydejack as the theme.
Look for the `theme` key (or add it when missing) and set its value to `jekyll-theme-hydejack`.

~~~
theme: jekyll-theme-hydejack
~~~

The dependencies will be fetched from [RubyGems](https://rubygems.org/) when running Jekyll via [Bundler](http://bundler.io/).

    $ bundle exec jekyll serve

You can now point your browser to [http://localhost:4000](http://localhost:4000) and see Hydejack in action.

**NOTE**: If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.message}

For more information on gem-based themes, see the [Jekyll Documentation](http://jekyllrb.com/docs/themes/).

## Via zip
If you downloaded the zip, the folder structure will look like:

~~~
├── _data
├── _featured_categories
├── _featured_tags
├── _includes
│   ├── scripts
│   └── styles
├── _js
│   ├── lib
│   └── src
│       └── flip
├── _layouts
├── _posts
├── _sass
│   ├── hydejack
│   └── pooleparty
├── assets
│   ├── css
│   ├── icomoon
│   ├── img
│   └── js
├── docs
│   └── 6.1.0
├── _config.yml
├── 404.md
├── about.md
├── index.html
└── posts.md
~~~

The dependencies will be fetched from [RubyGems](https://rubygems.org/) when running Jekyll via [Bundler](http://bundler.io/).

    $ bundle exec jekyll serve

You can now point your browser to [http://localhost:4000](http://localhost:4000) and see Hydejack in action.

**NOTE**: If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.message}

### Without Bundler
If you do not want to use Bundler, you can install the dependencies yourself via `gem install <dep>`. They are

- `jekyll`
- `jekyll-paginate`
- `jekyll-feed`
- `jekyll-sitemap`

## Via git
If you are familiar with using git, you can add the [Hydejack repository](https://github.com/qwtel/hydejack) as a remote, and merge its master branch into your working branch.

    $ git remote add hydejack ...
    $ git merge hydejack/master

You can also update Hydejack this way. The master branch will not contain work in progress, but will contain major (breaking) releases.

If you are starting a new blog you can also fork or clone the repository and use it as basis, though it's debatable whether that's desirable.

# Configuration
Once Jekyll is running, you can start with basic configuration by adding various entries to `_config.yml`.
Besides the documentation here, the file is also extensively documented. If you're using the gem-based theme, the `_config.yml` in the root directory is provided by Jekyll and does not contain any documentation. However, you can get the example config file [here](https://github.com/qwtel/hydejack/blob/v6/_config.yml).

**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}

## Setting `url` and `baseurl`
The first order of business should be to set the correct `url` and `baseurl` values in `_config.yml`.

The `url` is the domain of your site, including the protocol (`http` or `https`). For this site, it is

    url: https://qwtel.com

If your entire Jekyll blog is hosted in a subdirectory of your page, provide the path in `baseurl` with a leading `/`, but no trailing `/`, e.g.

    baseurl: /hydejack

Otherwise, provide the empty string `''`

### GitHub Pages
When hosting on [GitHub Pages](https://pages.github.com/) (unless you are using a custom domain), the `url` is

    url: https://<username>.github.io

The `baseurl` depends on the kind of page you are hosting.

* When hosting a *user or organization page*, use the empty string.
* When hosting *project page*, use `/<reponame>`.

For for information on the types of pages you can host on GitHub, see the [GitHub Help article](https://help.github.com/articles/user-organization-and-project-pages/).

## Changing `color` and `image`
Hydejack allows you to choose the background image of the sidebar, as well as the accent color (color of the links, selection and focus outline, as well as background color of the sidebar, should no image be provided) on a per-page, per-category, per-tag, per-author and global basis.

It is recommended that you provide fallback values in `_config.yml`, should no other rule apply:

    image: /hydejack/assets/img/nap.jpg
    color: '#A85641'

**Note**: It is recommended that you use a blurred image in order for the text to remain readable. If you save a blurred image as JPG, it will also drastically reduce its file size.
{:.message}

## Changing `font` and `font_heading`
Hydejack lets you configure the fonts of regular text and headings. It has built-in support for Google Fonts, which are loaded lazily and swapped without FOIT. There are three keys in `_config.yml` associated with it: `font`, `font_heading` and `google_fonts`. The defaults are:

    font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
    font:         "'Noto Serif', Georgia, serif"
    google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"

As you can see, `font` and `font_heading` are values you would pass to the `font-family` CSS property (without the `;`). When using a Google Font, it should consist of at least 2 fonts, where everything but the first entry will be used as a fallback until the desired font is fetched from Google.

The `google_fonts` key is the string necessary to fetch the fonts from Google. You can get it from the download page at [Google Fonts](https://fonts.google.com) after you've selected one or more fonts:

![Where to find the Google Fonts string]({{ site.baseurl }}/assets/img/google-fonts.png)

### Using safe web fonts
If you prefer not to use Google Fonts and use [safe web fonts](http://www.cssfontstack.com/) instead, all you have to do is remove the `google_fonts` key entirely. In this case, `font` and `font_heading` do not have to contain more than one font.

## Choosing a blog layout
Hydejack features two layouts for showing your blog posts.

*   The `list` layout only shows the title and groups the posts by year of publication. This layout is recommended for blogs with a smaller number of posts and infrequent updates.
[Demo](https://qwtel.com/hydejack-pro/posts/).

*   The `blog` layout is a traditional blog layout that is paginated and shows the title and an excerpt of each post. This layout is recommended for blogs with a large number of posts and frequent updates.
[Demo](https://qwtel.com/hydejack-pro/).

    If you are using the gem-based theme, you need to add the following to your `_config.yml` to use this layout:

    ~~~yml
    paginate: 5
    paginate_path: '/page-:num/'
    ~~~

    For more information see [Pagination](https://jekyllrb.com/docs/pagination/).

In order to use either layout, open `index.html` in the root folder and change the `layout` property in the front matter, e.g.

~~~yml
---
layout: blog
title:  Home
---
~~~

**NOTE**: The paginated `blog` layout needs to have the `.html` file extension, while the (non-paginated) `list` layout may have the `.md` or `.markdown` extension. This is due to the `jekyll-paginate` plugin.
{:.message}


## Adding an author
At the very least, you should add an `author` key with a `name` and `email` sub-key (used by the [feed plugin](https://github.com/jekyll/jekyll-feed)) to `_config.yml`:

    author:
      name:  Florian Klampfer
      email: f.klampfer@gmail.com

If you would like the author information to be displayed in the about section of a post or project\*, as well as on the about and welcome\* page, you have to provide additional information in `_data/authors.yml`. If you've installed Hydejack via zip, this file already exists. Otherwise you have to create it (and possibly the `_data` directory as well). You can find the default file [here](https://github.com/qwtel/hydejack/blob/v6/_data/authors.yml).

The `authors.yml` consists of key-value pairs, where the key is a shorthand for the author (e.g. the GitHub or Twitter handle) and the value is a hash containing the author's information.

    qwtel:
      name:  Florian Klampfer
      email: f.klampfer@gmail.com

      about: |
        Hi, I'm Florian or `@qwtel`...

Now, if an author's `about` value isn't empty, the text will appear (markdownifyed) at the bottom of each blog post and project*, as well as at the top of a page using the `about` and `welcome`\* layout.

### Dealing with multiple authors
The first entry in `authors.yml` will be used as the default author.
However, if a blog post, project\*, about or welcome\* page doesn't belong to the default author, you can mark it by setting the `author` key in the front matter. The value must match the key as defined in `authors.yml`, e.g.

~~~yml
---
layout: post
title: "Hello World"
author: qwtel
---
~~~

## Adding an author's picture
If you'd like for the author's picture to appear in addition the the about text (see previous chapter), you have to provide an URL to the author's `picture` key in `_data/authors.yml`.

    picture:  /assets/img/me.jpg

If you'd like to provide multiple versions of the picture for screens with different pixel densities, you can provide `src` and `srcset` keys instead.

    picture:
      src:    /assets/img/me.jpg
      srcset:
        1x:   /assets/img/me.jpg
        2x:   /assets/img/me@2x.jpg

The `src` key is a fallback image for browsers that don't support the `srcset` attribute.

The keys of the `srcset` hash will be used as descriptors.
For more information on `srcset`, see the [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset), or [this article from CSS-Tricks](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/).

## Adding social media icons
Hydejack supports a variety of social media icons out of the box.
These are defined on a per-author basis, so make sure you've followed the steps in [Adding an author](#adding-an-author).

**NOTE**: If you are using the gem-based version of Hydejack, download [`social.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/social.yml) and put it into `_data` in the root directory. This is necessary because gem-based themes do not support including `_data`.
{:.message}

Links to social networks are shown as icons in the sidebar, as well as wherever the author information is displayed (on the about page, in the about section of a post, etc).

You can add a link to a social network by adding an entry to the `social` key in [`authors.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/authors.yml). It consists of the
(slugifyed) name of the social network as key and your username within that network as value, e.g.

    social:
      twitter: qwtel
      github:  qwtel

You can change the order in which the icons appear by moving lines up or down, e.g.

    social:
      github:  qwtel # github appears first
      twitter: qwtel # twitter second

To get an overview of which networks are available and how a typical username in that network looks like, see the exemplary [`authors.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/authors.yml).

Should providing a username not produce a correct link for some reason, you can provide a complete URL instead, e.g.

    social:
      youtube: https://www.youtube.com/channel/UCu0PYX_kVANdmgIZ4bw6_kA


**NOTE**: You can add any platform, even if it's not defined in [`social.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/social.yml), by providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used when no icon is available. Supplying your own icons is an [advanced topic]({{ site.baseurl }}{% link docs/6.1.0/advanced.md %}).
{:.message}

### Adding an email or RSS icon
If you'd like to add email <span class="icon-envelop"></span> or RSS <span class="icon-rss"></span> to the list, add:

    social:
      email: mailto:f.klampfer@gmail.com
      rss:   https://qwtel.com/hydejack/feed.xml

Note the the location of your `feed.xml` may vary.

## Enabling comments
Hydejack supports comments via [Disqus](https://disqus.com/). Before you can add comments to a page, you need to register and add your Hydejack site to Disqus' admin console. Once you have your "Disqus shortname", you must add it to `_config.yml`, e.g.

    disqus_shortname: qwtel

Now comments can be enabled on every page by adding `comments: true` to the front matter, e.g.

~~~yml
---
layout:   page
title:    Configuration
comments: true
---
~~~

**Note**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}

## Enabling Google Analytics
Enabling Google Analytics is as simple as setting the `google_analytics` key in `_config.yml` .

    google_analytics: UA-84025722-2

Conversely, if you want to disable it, you only have to remove the key and no GA code will be part of the generated pages.

**Note**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}

# Migration
## From Hydejack v5
Unfortunately, upgrading form v5 is not straightforward. A lot of patterns and names have changed, motivated by a variety of reasons, including better integration with the rest of the Jekyll ecosystem and simplified workflows enabled by Jekyll Collections.

### Updating the folder structure
Copy the the following folders and files from Hydejack v6 into your existing repository.
Make sure you merge the folder contents.

* `_data`
* `_includes`
* `_layouts`
* `_sass`
* `assets`
* `404.md`
* `index.html`

1. Delete the `public` folder. If you have placed files in the `public` folder, only delete `public/css`, `public/js` and `public/fonts` instead. Static files are now located in the `assets` folder.
1. Delete `404.html` (now provided by `404.md` and the `not-found` layout)


### Updating the configuration
`_config.yml` has changed considerably. Open it and make the following changes.

1.  Rename the following keys

    * `font_accent` => `font_heading`
    * `load_google_fonts` => `google_fonts`
    * `google_analytics_id` => `google_analytics`
    * `disqus` => `disqus_shortname`

1.  Enable Jekyll Collections by adding

    ~~~yml
    collections:
      featured_categories:
        permalink: /category/:name/
        output:    true
      featured_tags:
        permalink: /tag/:name/
        output:    true
      projects:
        permalink: /projects/:path/
        output:    true
    ~~~

1.  Copy the entire `author` hash (including the top-level `author` key) from `_config.yml` into the new file `_data/authors.yml` and add it to the top of the file (you can delete the rest of the file).
1.  In `_config.yml`, delete every key of the `author` hash except `name` and `email`.
1.  Choose a shortname and use it as the key for the author, e.g.

    ~~~yml
    qwtel:
      name:    Florian Klampfer
      email:   f.klampfer@gmail.com
      photo:   ...
      photo2x: ...
      about: |
        Hi, I'm Florian or `@qwtel`...
      social:
        twitter: qwtel
        github:  qwtel
    ~~~

You can take a look at the [full `authors.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/authors.yml) for reference.

**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}

### Updating the author
1.  Open `_data/authors.yml`
1.  Delete `photo` and `photo2x` form the author you've copied and add a `picture` hash instead that looks like

    ~~~yml
    picture:
      src: <photo>
      srcset:
        1x: <photo>
        2x: <photo2x>
    ~~~

    If you have only one photo, you can just provide the URL directly, e.g. `picture: <url>`.

For more information, see [Adding an author]({{ site.baseurl }}{% link docs/6.1.0/configuration.md %}#adding-an-author).

### Restoring the tags
1.  Delete the `tag` folder.
2.  Create a top-level folder called `_featured_tags`.
3.  For each entry in `_data/tags.yml`, create a markdown file in `_features_tags` with the tag name as filename,
    e.g. `hyde.md`.
4.  For each tag, copy its contents from `_data/tags.yml` into the new file's front matter, e.g.

    ~~~yml
    ---
    name: Hyde
    image: /hydejack/public/img/hyde.jpg
    color: '#949667'
    description: >
      Hyde is a brazen two-column Jekyll theme...
    ---
    ~~~

5. Add `layout: list` to the front matter.
6. Once you've copied all tags into their own files, delete `_data/tags.yml`.

### Restoring the sidebar entries
Hydejack can now link to any kind of page in the sidebar.

1. Delete `sidebar_tags` in `_config.yml` as this key is no longer used.
2. Open a file who's page you would like to add to the sidebar. If you want to add a tag, open `_featured_tags/<tagname>.md`.
3. Add `menu: true` to its front matter.
4. (Optional) Set `order: <position>`, where `<position>` is the position at which you would like the link to appear.

### Restoring the RSS feed
The feed is now provided by the `jekyll-feed` plugin instead of a custom solution.

1.  Delete `atom.xml`
1.  Add `- jekyll-feed` to `gems` in `_config.yml`, e.g.

    ~~~yml
    gems:
      - jekyll-feed
      - jekyll-sitemap
      - jekyll-paginate
    ~~~

2.  Add the following to `_config.yml`:

    ~~~yml
    feed:
      path: atom.xml
    ~~~

### Restoring the comments
Hydejack now supports comments on every page. However, you have to enable them per page by adding `comments: true` to the front matter (shold you have followed the [Disqus integration guide](https://disqus.com/admin/install/platforms/jekyll/), this should be familiar).

As mentioned above, don't forget to rename `disqus` to `disqus_shortname` in `_config.yml`.

### Restoring the about page
Hydejack now has a dedicated layout for about pages.
To use it, open `about.md` and change the `layout` in the front matter to `about` and delete `{\% include about-short.html author=site.author %\}`.

## From free to "PRO" version*
Upgrading form the free version to "PRO" is straightforward. All that is necessary to copy the following folders from "PRO" into your repository.

* `_includes`
* `_layouts`
* `_sass`
* `assets`

Since you've probably added files to some of these folders, make sure you merge the contents.
If you've modified any files (discouraged) the changes will be overwritten and you have to redo those changes.

If you'd like to add examples of the new layouts, you can additionally copy:

* `projects.md`
* `resume.md`
* `welcome.md`


# Basics
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
: A medium-length description, used on the tag or category's detail page as meta description and shown in a message box below the title.

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
[Demo](https://qwtel.com/hydejack-pro/about/).

The main difference is that it will display an author's `about` text and `picture` above the regular content.
To create an about page, make sure `layout` is set to `about`, and that the `author` key is set to an author defined in `_data/authors.yml`. For more on authors, see [Adding an author]({{ site.baseurl }}{% link docs/6.1.0/configuration.md %}#adding-an-author).

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
[Demo](https://qwtel.com/hydejack-pro/welcome/).

You can create a welcome page by creating a new markdown file and setting the layout to `welcome` in the front matter.

~~~yml
---
layout: welcome
title: Welcome
author: qwtel
---
~~~

**NOTE**: If you would like the welcome page to be at the site's root, you'd  have to name the file `index.md`. Additionally, you should move the blog layout (`index.html`) to a subdirectory like `blog` or `posts`. See [Choosing a blog layout]({{ site.baseurl }}{% link docs/6.1.0/configuration.md %}#choosing-a-blog-layout)
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
Each project generates an entry on the projects layout ([Demo](https://qwtel.com/hydejack-pro/projects/)) and its own detail view ([Demo](https://qwtel.com/hydejack-pro/projects/hydejack-v6/)).

A project is represented by a file in the `_projects` directory.
The project's meta information is defined in the files front matter.
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
[Demo](https://qwtel.com/hydejack-pro/resume/).

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

# Writing
Hydejack offers a few additional features to markup your markdown. Don't worry, these are merely CSS classes added via the standard `{:.my-class}` syntax, so that your posts remain compatible with other kramdown processors.

**NOTE**: For an introduction to markdown in general, see [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) and [kramdown Syntax](https://kramdown.gettalong.org/syntax.html).
{:.message}

## Adding a table of contents
You can add a generated table of contents to any page by adding `{:toc}` below a list.

Markdown:
~~~md
* this unordered seed list will be replaced by toc as unordered list
{:toc}
~~~

## Adding message boxes
You can add a message box by adding the `message` class to a paragraph.

**NOTE**: You can add a message box.
{:.message}

Markdown:
~~~markdown
**NOTE**: You can add a message box.
{:.message}
~~~

## Adding large text
You can add large text by adding the `lead` class to the paragraph.

You can add large text.
{:.lead}

Markdown:
~~~markdown
You can add large text.
{:.lead}
~~~

## Adding large images
You can make an image span the full width by adding the `lead` class.

![Full-width image](https://placehold.it/800x100){:.lead}

Markdown:
~~~markdown
![Full-width image](https://placehold.it/800x100){:.lead}
~~~

## Adding large quotes
You can make a quote "pop out" by adding the `lead` class.

> You can make a quote "pop out".
{:.lead}

Markdown:
~~~
> You can make a quote "pop out".
{:.lead}
~~~

## Adding faded text
You can gray out text by adding the `faded` class.

Use this sparingly and for information that is not essential --- or you don't want viewers to read at all, like when you pull a line form a dirty rap song..

I'm faded, faded, faded.
{:.faded}

Markdown:
~~~md
I'm faded, faded, faded.
{:.faded}
~~~

## Adding code blocks
To add a code block without syntax highlighting, simply indent 4 spaces (regular markdown).
For code blocks with code highlighting, use `~~~<language>`. This syntax is also supported by GitHub.
For more information and a list of supported languages, see [{ Rouge }](http://rouge.jneen.net/).

~~~js
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those
// arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
~~~

Markdown:

    ~~~js
    // Example can be run directly in your JavaScript console

    // Create a function that takes two arguments and returns the sum of those
    // arguments
    var adder = new Function("a", "b", "return a + b");

    // Call the function
    adder(2, 6);
    // > 8
    ~~~

## Adding math
Hydejack supports [math blocks](https://kramdown.gettalong.org/syntax.html#math-blocks) via [KaTeX](https://khan.github.io/KaTeX/).

Why KaTeX instead of MathJax? KaTeX is faster and more lightweight at the cost of having less features, which,
for the purpose of writing blog posts, should be a favorable tradeoff.

**NOTE**: KaTeX does not support the `align` and `align*` environments.
Instead, `aligned` should be used, e.g. `\begin{aligned} ... \end{aligned}`.
{:.message}

### Inline
Inline math $$ f(x) = x^2 $$.

Markdown:
~~~md
Inline math $$ f(x) = x^2 $$.
~~~

### Block

$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$

Markdown:

~~~latex
$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$
~~~

# Build
Hydejack supports building locally and on GitHub pages. However, when building on GitHub Pages, providing better related posts via the LSI is not available.

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Building locally
When building Hydejack it is important to set the environment variable `JEKYLL_ENV` to `production`.
Otherwise the output will not be minified. Building itself happens via Jekyll's `build` command.

    $ JEKYLL_ENV=production bundle exec jekyll build

This will generate the finished static files in `_site` which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

### With latent semantic analysis
By default, related posts are simply the most recent posts.
Hydejack modifies this a bit, by showing the most recent posts of the same category/tag.
However, the results are still pretty "unrelated".
To provide better results, Jekyll supports [latent semantic analysis](https://en.wikipedia.org/wiki/Latent_semantic_analysis) via [`classifier-reborn`](http://www.classifier-reborn.com/)'s [Latent Semantic Indexer](http://www.classifier-reborn.com/lsi) (LSI).

To use the LSI, you first have to disable Hydejack's default behaviour, by setting `use_lsi: true` in `_config.yml`

    use_lsi: true

Then, you have to run `jekyll build` with the `--lsi` flag:

    $ JEKYLL_ENV=production bundle exec jekyll build --lsi

This will generate the finished static files in `_site` which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

## Building on GitHub Pages
If you are using the "PRO" version of Hydejack, this method is discouraged because it will publish the source code on GitHub 😢
{:.message}

GitHub Pages offers the possibility to upload your site's Jekyll source directly. Then, GitHub will run the build process in the cloud, provided you site only uses [certain plugins](https://pages.github.com/versions/). Hydejack supports GitHub Pages out of the box.

However, when using this method, the LSI is not available (see above), so make sure `use_lsi` is set to `false` in `_config.yml`.

    use_lsi: false

Builds on GitHub run in the `production` environment, so no further steps are necessary. For the deployment process, see [Jekyll's documentation on GitHub Pages](https://jekyllrb.com/docs/github-pages/) as well as [GitHub Help](https://help.github.com/categories/github-pages-basics/).

***

Continue with [Advanced]({{ site.baseurl }}{% link docs/6.1.0/advanced.md %}){:data-flip="title"} »
{:.faded.heading}

[deploy]: https://jekyllrb.com/docs/deployment-methods/

# Advanced
## Adding a custom social media icon
Hydejack includes a number of social media icons by default (in fact, everything that is provided by [IcoMoon](https://icomoon.io/)), but since the landscape is always changing, it is likely that a platform that is important to you will be missing at some point.

**NOTE**: You can add any platform by simply providing an URL (just make sure it contains `//`). However, a fallback icon <span class="icon-link"></span> will be used instead of the platform's icon.
{:.message}

### Creating the icon font
In order to add a custom social media icon you have to use the [IcoMoon App](https://icomoon.io/app/) (free) to create a custom icon webfont. However, it is important that the generated font include all icons already in use by Hydejack. For this purpose, find the `selection.json` at [`assets/icomoon/selection.json`](https://github.com/qwtel/hydejack/blob/v6/assets/icomoon/selection.json) and upload it to the app via "Import Icons".
Then, use the app to add your icon(s).
Consult the [IcoMoon docs](https://icomoon.io/#docs) for additional help.

Once you've created and downloaded the icon font form IconMoon, replace the `icomoon` folder in `assets` in it's entirety. Keep in mind that future updates of Hydejack will override this folder.

### Adding the platform's metadata
In this second step it is necessary, to add the network's metadata to `_data/social.yml`.
An entry looks like:

    deviantart:
      name: DeviantArt
      icon: icon-deviantart
      prepend: "https://"
      append: ".deviantart.com"

`name`
: The name of the network. Used for for the title attribute and screen readers.

`icon`
: The icon CSS class. Can be chosen during the IcoMoon creation process.

`prepend`
: Optional. A string that is prepended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `https://`

`append`
: Optional. A string that is appended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `.deviantart.com`.

## Building the JavaScript
**NOTE**: In order to build the JavaScript you need to have [node.js](https://nodejs.org/en/) installed. Specifically, the `npm` command needs to be available, which is part of node.js.
{:.message}

When building for the first time (and after each update of Hydejack) you have to run

    $ npm install

This will fetch all dependencies (and put them in a local folder called `node_modules`), lint the code and write the bundled and minified script into `assets/js/hydejack.js`.

Subsequent builds are administered via

    $ npm run build

If you want to actively develop the scripts, it is better to run

    $ npm run dev

which will build a non-minified, non-transpiled (ES6) version of `hydejack.js` after every filechange.

# Versions
## v6.1.0
May 9 2017
{:.heading.post-date}

* Updated JS dependencies
* Added version history and licenses to documentation
* Fixed print layout

## v6.0.0 (JavaScripten)
May 3 2017
{:.heading.post-date}

Hydejack has always featured a JavaScript-heavy sidebar, but other than that, JS has been used sparingly. This changes with this release, which adds a ton of (optional) code that changes the feel of the theme dramatically.

### Major
Pages are now loaded and swapped through JavaScript. This has a number of effects. First of all, it looks cool, but the animations aren't just about aesthetics: They also help to hide the network time of fetching the next page, making the entire site feel faster. At the same time, the FOUC introduced in the last release will no longer occur (except on the initial page load).

* Most JS is now unified in the `_js` directory and written in ES2016.
* The `blog-by-tag` layout has been renamed to `list`.
* `public` folder has been renamed to `assets` to make the theme compatible with Jekyll's gem-based themes.
* Tags are now supported via Jekyll Collections instead of `_data`.
* The sidebar can now add links to all kinds of pages.
* Categories are now supported.
* Author information moved to `_data/authors.yml`
* Added support for multiple authors.
* Using `jekyll-feed` plugin (supported on GitHub Pages) instead of custom solution.
* Added `about` layout.
* Added `not-found` layout.
* Added `redirect` layout

See the [the migration guide]({{ site.baseurl }}{% link docs/6.1.0/migration.md %}) for instructions on how to upgrade.

### Minor
* The "accent" font (heading font) is now used for all headings. This gives the theme a "bolder" look and was necessary for the animation: link => heading.
* Changed default text font from "PT Serif" to "Noto Serif".
* Added [CSS classes]({{ site.baseurl }}{% link docs/6.1.0/writing.md %}) for styling markdown content.
* Links have a new style. They now always display an underline to make the choice of the link color less critical (darker colors were hard to distinguish from regular text).
* Made social media icons larger and easier to tap.
* Social media icons are now also part of the "about" sections of a post.
* Added support for a copyright notice at the bottom. Can be set via the config variable `copyright`.
* Changed responsive breakpoints and added support for very large displays.
* The site is now printable.
* The `blog` layout now only shows the excerpt instead of the full post.
* Links to external pages are now marked with a symbol.
* Added margin above social media icons to prevent accidental tapping
* Added gem files so that `bundle install` and `bundle exec jekyll serve` work
* Disabled HTML minification when running via `jekyll serve`
* Added dingbat to signal end of post

### Fixes
* Related posts is no longer blank for posts that do not belong to a category.
* Footnotes now use the text version of "leftwards arrow with hook" instead of the emoji on iOS.
* Text is no longer invisible while waiting for Google Fonts to load.
* Always show scrollbar to prevent layout "jumps"

## v5.3.0
Oct 1 2016
{:.heading.post-date}

a11y improvements
- Use HTML5 semantics tags + roles
- Don't set `maximum-scale=1`
- Fix bug with `sr-only` class

Math support improvements
- LaTeX syntax errors will no longer prevent correct math blocks from being rendered
- LaTeX syntax errors logged to console

## v5.2.0
Sep 29 2016
{:.heading.post-date}

Prevent structural FOUC

## v5.1.0
Sep 28 2016
{:.heading.post-date}

Cross-browser compatibility improvements:
- Added features tests
- Fixed layout in IE 10 and 11
- Disabled stylesheets and JS in IE 9 and below.

## v5.0.0 (The Fast One)
Sep 16 2016
{:.heading.post-date}

This major release increases page load speed dramatically. The page now scores roughly 90/100 on [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fqwtel.com%2Fhydejack%2F) (up from ~50) and has a high score on similar tools.

Most importantly, the critical rendering path is no longer blocked by loading styles or scripts, meaning the site becomes visible faster.

Page load speed matters to Google, but is also _very_ apparent to visitors with slow internet connections.

However, as a side effect of these optimizations, the site now has a visible [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).
Future versions might address this, but it is the currency in which loading speed is being payed for and can not be fully avoided.

### Major
- HTML, CSS and JS served minified.
- JS downloading starts only after the rest of the page is renderd.
- Critical CSS (above-the-fold) is inlined into the document, the rest is fetched later.

In order to minify the CSS and make it more modular it has been rewritten in SCSS.

### Minor
- Colored focus outline in page color
- Tabindex for tab navigation
- Social media icons easier tappable with finger

### Trivia
Not strictly part of the release, but the images have been blurred to increase text readability and help with loading speed as well (burred images get compressed by JPG much better).

## v4.0.1
Sep 11 2016
{:.heading.post-date}

Fix per-page color and image

## v4.0.0 (Social Media Impocalypse)
Aug 30 2016
{:.heading.post-date}

### Breaking
- Structure of `_config.yml` has changed
  - Social media usernames are now located under `author: social: <platform>: <username>`.
  - `disqus` is now a top-level entry (moved from `author`).
  - Now has `font`, `font_accent` and `google_fonts` fields that are mandatory.
- Now defaults to the `blog` layout, old style is available via `blog-by-tag` layout, see `archive.html`.

### New features
- Added _a lot_ of social media icons, configurable via `_config.yml`.
- New `blog` layout. Classic, paginated.
- Fonts are configurable via `_config.yml`.

### Design
- Link underlines are now fixed-sized for all font sizes (no thicker lines for headlines, etc)

### Fixes
- Correctly set the meta description field using either the `description` field or `post.excerpt` as a fallback (used to contain the unmodified markdown).
- Fixed various URL bugs relating to `site.baseurl`.

### Internal
- Refactoring, preventing code duplications, heavier usage of `includes`.

## v3.0.0 (Hydejack)
May 7 2016
{:.heading.post-date}

Hydejack is a pretentious two-column [Jekyll](http://jekyllrb.com) theme, stolen by [`@qwtel`](https://twitter.com/qwtel) from [Hyde](http://hyde.getpoole.com). You could say it was.. [hydejacked](http://media3.giphy.com/media/makedRIckZBW8/giphy.gif).

### Features
Unlike Hyde, it's very opinionated about how you are going to use it.

Features include:
* Touch-enabled sidebar / drawer for mobile, including fallback when JS is disabled.
* Github Pages compatible tag support based on [this post][tag].
* Customizable link color and sidebar image, per-site, per-tag and per-post.
* Optional author section at the bottom of each post.
* Optional comment section powered by Disqus.
* Layout for posts grouped by year
* Wide array of social media icons on sidebar.
* Math blocks via [KaTeX](https://khan.github.io/KaTeX/).

## v2.0.0 (Hyde)
Jan 2 2014
{:.heading.post-date}

## v1.0.0 (Hyde)
Oct 15 2013
{:.heading.post-date}

# Licenses
## Attributions
### IcoMoon Icons Free Version
[IcoMoon Icons Free Version](https://icomoon.io/#icons-icomoon)
by [Keyamoon](http://keyamoon.com/).
Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).  
No modifications were made.

## Licenses
### Hydejack Free Version
~~~
MIT License

Copyright (c) 2017 Florian Klampfer.

This software also uses portions of the Hyde project, which is
MIT licensed with the following copyright:

Copyright (c) 2013 Mark Otto.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

### y-drawer
~~~
MIT License

Copyright (c) 2017 Florian Klampfer

This software also uses portions of the ratchet project, which is
MIT licensed with the following copyright:

Copyright (c) 2015 connors and other contributors

This software also uses portions of the Swipe project, which is
MIT licensed with the following copyright:

Copyright (c) 2013 Brad Birdsall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
~~~

### y-push-state
~~~
MIT License

Copyright (c) 2017 Florian Klampfer

This software also uses portions of the smoothState.js project, which is
MIT licensed with the following copyright:

Copyright (c) 2014 Miguel Angel Perez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

### rxjs
~~~
 Copyright (c) 2015-2017 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
~~~

### KaTeX
~~~
The MIT License (MIT)

Copyright (c) 2015 Khan Academy

This software also uses portions of the underscore.js project, which is
MIT licensed with the following copyright:

Copyright (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative
Reporters & Editors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

### corejs
~~~
Copyright (c) 2014-2016 Denis Pushkarev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
~~~

### color
~~~
Copyright (c) 2012 Heather Arthur

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
~~~

### elem-dataset
~~~
The MIT License (MIT)

Copyright (c) Alex Cross (alexcross.io)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

### web-animations-js
~~~
 Copyright 2014 Google Inc. All rights reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
~~~

### Modernizr
~~~
The MIT License (MIT)

Copyright (c) 2009-2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

### compress
~~~
The MIT License (MIT)

Copyright (c) 2014 Anatol Broder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

### loadCSS
~~~
The MIT License (MIT)

Copyright (c) @scottjehl, 2016 Filament Group

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
~~~

*[FLIP]: First Last Invert Play
*[LSI]: Latent Semantic Indexer
