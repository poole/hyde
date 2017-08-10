---
layout: page
title: Documentation
sitemap: false
redirect_from:
  - /docs/latest/complete/
  - /docs/latest/print/
  - /docs/print/
---

Here you should be able to find everything you need to know to accomplish the most common tasks when blogging with Hydejack.
Should you think something is missing, [please let me know](mailto:mail@qwtel.com).
Should you discover a mistake in the docs (or a bug in general) feel free to [open an issue](https://github.com/qwtel/hydejack/issues) on GitHub.

**NOTE**: While this manual tries to be beginner-friendly, as a user of Jekyll it is assumed that you are comfortable with editing multiple text files and running shell commands.
{:.message}



**NOTE**: This document was created using Hydejack's print layout.
If you prefer to read it the documentation in your browser,
you can find it [here]({{ site.baseurl }}{% link docs/6.6.1/index.md %}).
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}



{% comment %}****---------------------------------------------------------------
                    INSTALLATION
----------------------------------------------------------------{% endcomment %}

## Installation
There are multiple ways of installing Hydejack.
The easiest is [via the Ruby gem](#via-gem).
If you downloaded the zip, you'll want to install [via the zip file](#via-zip).
If you know what you are doing, you can [fork or clone the git repository](#via-git).

Buyers of the PRO version should [follow these steps](#pro-version).

**NOTE**: If you've used any version of Hydejack before,
also check out the [Migration]{:.heading data-flip="title"} guide.
{:.message}




### Setup
#### Via gem
Installation via the gem-based theme has the advantage of not cluttering your blog repository,
so it is especially recommended for beginners.

If you haven't already, create a new Jekyll site first:

~~~bash
$ jekyll new <PATH>
~~~

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

For more information on gem-based themes, see the [Jekyll Documentation](http://jekyllrb.com/docs/themes/).

You can now continue with [running locally](#running-locally).

#### Via zip
If you downloaded the zip, the folder structure will look something like:

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
├── _config.yml
├── 404.md
├── about.md
├── index.html
└── posts.md
~~~

You can now continue with [running locally](#running-locally).

#### Via git
If you are familiar with using git, you can add the [Hydejack repository](https://github.com/qwtel/hydejack)
as a remote, and merge its master branch into your working branch.

~~~bash
$ git remote add hydejack git@github.com:qwtel/hydejack.git
$ git pull hydejack master
~~~

You can also update Hydejack this way. The master branch will not contain work in progress,
but will contain major (breaking) changes. This approach is recommended if you intend to heavily customize Hydejack.

You can now continue with [running locally](#running-locally).

#### PRO Version
If you bought the PRO version, you've received a zip archive with the following contents:

~~~
├── hydejack-docs-6.6.1.pdf
├── install
├── upgrade
├── favicons.psd
└── sidebar-bg.psd
~~~

`hydejack-docs-6.6.1.pdf`
: This documentation in PDF form.

`install`
: Contains all files and folders needed to create a new blog.

`upgrade`
: Contains only the files and folders needed for upgrading form an earlier version of Hydejack (6.0.0 or above).
  See the [migration guide][v6to6] for more.

`favicon.psd`
: A Photoshop template to help with generating the favicon, apple touch icon, etc.

`sidebar-bg.psd`
: A Photoshop template for blurred sidebar backgrounds.

Unzip the archive somewhere on your machine, then `cd` *into* the `install` folder, e.g.

~~~bash
$ cd ~/Downloads/hydejack-pro-6.6.1/install/
~~~

You can now continue with [running locally](#running-locally).

### Running locally
Make sure you've `cd`ed into the directory where `_config.yml` is located.

~~~bash
$ cd <path/to/hydejack>/
~~~

Before running for the first time, dependencies need to be fetched from [RubyGems](https://rubygems.org/):

~~~bash
$ bundle install
~~~

**NOTE**: If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.message}

Now you can run Jekyll on your local machine:

~~~bash
$ bundle exec jekyll serve
~~~

You can now point your browser to <http://localhost:4000> and see Hydejack in action.






[migration]: #migration
[v5to6]: #from-hydejack-v5
[v6to6]: #from-hydejack-v6



{% comment %}****---------------------------------------------------------------
                    MIGRATION
----------------------------------------------------------------{% endcomment %}

## Migration
### From Hydejack v6
Unless otherwise noted, to upgrade from an older to a newer version of Hydejack (6.0.0 and above), copy to following folders from the zip into your repository.

* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`

**NOTE**: If you've modified any of Hydejack's files, changes will be overwritten and you have to redo those changes.
{:.message}

Buyers of the PRO version will find the files necessary for an upgrade in the `upgrade` folder of the downloaded zip archive. Unless you've made any changes to Hydejack's own files, you can safely copy them into your blog directory.

#### From gem-based to zip
When upgrading from the gem-based version to any zip version (free *or* PRO) copy to following files and folders:

* `_data/`
* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`
* `404.md`

Also make sure to remove the following line from `_config.yml`, as all necessary files are now located in the directory itself:

    theme: jekyll-theme-hydejack

### From Hydejack v5
Unfortunately, upgrading form v5 is not straightforward. A lot of patterns and names have changed, motivated by a variety of reasons, including better integration with the rest of the Jekyll ecosystem and simplified workflows enabled by Jekyll Collections.

#### Updating the folder structure
Copy the the following folders and files from Hydejack v6 into your existing repository.
Make sure you merge the folder contents.

* `_data/`
* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`
* `404.md`
* `index.html` (`index.md`\*)

1. Delete the `public` folder. If you have placed files in the `public` folder, only delete `public/css`, `public/js` and `public/fonts`. Static files are now located in the `assets` folder.
2. Delete `404.html` (now provided by `404.md` and the `not-found` layout)

#### Updating the configuration
`_config.yml` has changed considerably. Open it and make the following changes.

1.  Rename the following keys

    * `font_accent` => `font_heading`
    * `load_google_fonts` => `google_fonts`
    * `google_analytics_id` => `google_analytics`
    * `disqus` => `disqus_shortname`

2.  Enable Jekyll Collections by adding

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

3.  Copy the entire `author` hash (including the top-level `author` key) from `_config.yml` into the new file `_data/authors.yml` and add it to the top of the file (you can delete the rest of the file).
4.  In `_config.yml`, delete every key of the `author` hash except `name` and `email`.
5.  Choose a shortname and use it as the key for the author, e.g.

    ~~~yml
    qwtel:
      name:    Florian Klampfer
      email:   mail@qwtel.com
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

#### Updating the author
1.  Open `_data/authors.yml`
2.  Delete `photo` and `photo2x` form the author you've copied and add a `picture` hash instead that looks like

    ~~~yml
    picture:
      src: <photo>
      srcset:
        1x: <photo>
        2x: <photo2x>
    ~~~

    If you have only one photo, you can just provide the URL directly, e.g. `picture: <url>`.

For more information, see [Adding an author](#adding-an-author).)

#### Restoring the tags
1.  Delete the `tag` folder.
2.  Create a top-level folder called `_featured_tags`.
3.  For each entry in `_data/tags.yml`, create a markdown file in `_features_tags` with the name of the tag as filename,
    e.g. `hyde.md` for tag "hyde".
4.  For each tag, copy its contents from `_data/tags.yml` into the new file's front matter, e.g.

    ~~~yml
    ---
    layout: list
    name: Hyde
    image: /hydejack/public/img/hyde.jpg
    color: '#949667'
    description: >
      Hyde is a brazen two-column Jekyll theme...
    ---
    ~~~

5. Add `layout: list` to the front matter.
6. Once you've copied all tags into their own files, delete `_data/tags.yml`.

#### Restoring the sidebar entries
Hydejack can now link to any kind of page in the sidebar.

1. Delete `sidebar_tags` in `_config.yml`.
2. Open a file who's page you would like to add to the sidebar. If you want to add a tag, open `_featured_tags/<tagname>.md`.
3. Add `menu: true` to its front matter.
4. (Optional) Set `order: <number>`, where `<number>` is the number at which you would like the link to appear.

#### Restoring the RSS feed
The feed is now provided by the `jekyll-feed` plugin instead of a custom solution.

1.  Delete `atom.xml`
2.  Add `- jekyll-feed` to `gems` in `_config.yml`, e.g.

    ~~~yml
    gems:
      - jekyll-feed
      - jekyll-sitemap
      - jekyll-paginate
    ~~~

3.  (Optional) Add the following to `_config.yml` to make the feed appear at the same URL as the old `atom.xml`.

    ~~~yml
    feed:
      path: atom.xml
    ~~~

#### Restoring the comments
The way comments are enabled has changed slightly. You now have to enable them per page by adding `comments: true` to the front matter (this is what the [Disqus integration guide](https://disqus.com/admin/install/platforms/jekyll/) suggests).

As mentioned above, don't forget to rename `disqus` to `disqus_shortname` in `_config.yml`.

#### Restoring the about page
Hydejack now has a dedicated layout for about pages.
To use it, open `about.md` and change the `layout` in the front matter to `about` and delete `{\% include about-short.html author=site.author %\}`.



{% comment %}****---------------------------------------------------------------
                    CONFIGURATION
----------------------------------------------------------------{% endcomment %}

## Configuration
Once Jekyll is running, you can start with basic configuration by adding various entries to `_config.yml`.
Besides the documentation here, the file is also extensively documented. If you're using the gem-based theme, the `_config.yml` in the root directory is provided by Jekyll and does not contain any documentation. However, you can get the example config file [here](https://github.com/qwtel/hydejack/blob/v6/_config.yml).

**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}




### Setting `url` and `baseurl`
The first order of business should be to set the correct `url` and `baseurl` values in `_config.yml`.

The `url` is the domain of your site, including the protocol (`http` or `https`). For this site, it is

    url: https://qwtel.com

If your entire Jekyll blog is hosted in a subdirectory of your page, provide the path in `baseurl` with a leading `/`, but no trailing `/`, e.g.

    baseurl: /hydejack

Otherwise, provide the empty string `''`

#### GitHub Pages
When hosting on [GitHub Pages](https://pages.github.com/) (unless you are using a custom domain), the `url` is

    url: https://<username>.github.io

The `baseurl` depends on the kind of page you are hosting.

* When hosting a *user or organization page*, use the empty string.
* When hosting *project page*, use `/<reponame>`.

For for information on the types of pages you can host on GitHub, see the [GitHub Help article](https://help.github.com/articles/user-organization-and-project-pages/).

### Changing `color` and `image`
Hydejack allows you to choose the background image of the sidebar, as well as the accent color (color of the links, selection and focus outline, as well as background color of the sidebar, should no image be provided) on a per-page, per-category, per-tag, per-author and global basis.

It is recommended that you provide fallback values in `_config.yml`, should no other rule apply:

    image: /hydejack/assets/img/nap.jpg
    color: '#A85641'

**NOTE**: It is recommended that you use a blurred image in order for the text to remain readable. If you save a blurred image as JPG, it will also drastically reduce its file size.
{:.message}

### Changing `font` and `font_heading`
Hydejack lets you configure the fonts of regular text and headings. It has built-in support for Google Fonts, which are loaded lazily and swapped without FOIT. There are three keys in `_config.yml` associated with it: `font`, `font_heading` and `google_fonts`. The defaults are:

    font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
    font:         "'Noto Serif', Georgia, serif"
    google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"

As you can see, `font` and `font_heading` are values you would pass to the `font-family` CSS property (without the `;`). When using a Google Font, it should consist of at least 2 fonts, where everything except the first entry will be used as a fallback until the desired font is fetched from Google.

The `google_fonts` key is the string necessary to fetch the fonts from Google. You can get it from the download page at [Google Fonts](https://fonts.google.com) after you've selected one or more fonts:

![Where to find the Google Fonts string]({{ site.baseurl }}/assets/img/docs/google-fonts.png)

#### Using safe web fonts
If you prefer not to use Google Fonts and use [safe web fonts](http://www.cssfontstack.com/) instead,
all you have to do is set `no_google_fonts` to `true`.
In this case, `font` and `font_heading` do not have to contain more than one font.
You may also remove the `google_fonts` key.

### Choosing a blog layout
Hydejack features two layouts for showing your blog posts.

*   The `list` layout only shows the title and groups the posts by year of publication. This layout is recommended for blogs with a smaller number of posts and infrequent updates. You can also used it for an "archive" page.
[Demo][posts].

*   The `blog` layout is a traditional blog layout that is paginated and shows the title and an excerpt of each post. This layout is recommended for blogs with a large number of posts and frequent updates.
[Demo][blog].

In order to use either layout, open `index.html` (or `index.md`) in the root folder and change the `layout` property in the front matter, e.g.

~~~yml
---
layout: list # or blog
title:  Home
---
~~~

If you want to use the `blog` layout with the gem-based theme, you need to add the following to your `_config.yml` to use this layout:

~~~yml
paginate: 5
paginate_path: '/page-:num/'
~~~

The `blog` layout needs to have the `.html` file extension and the `paginate_path` needs to match the path to the `index.html` file, i.e. if you want the blog to appear at `/blog/`, put a `index.html` in a `blog` dir and set `paginate_path` to be `/blog/page-:num/`. Jekyll will print additional error messages if you violate this.

For more information see [Pagination](https://jekyllrb.com/docs/pagination/).

### Adding an author
At the very least, you should add an `author` key with a `name` and `email` sub-key (used by the [feed plugin](https://github.com/jekyll/jekyll-feed)) to `_config.yml`:

    author:
      name:  Florian Klampfer
      email: mail@qwtel.com

If you would like the author information to be displayed in the about section of a post or project\*, as well as on the about and welcome\* page, you have to provide additional information in `_data/authors.yml`. If you've installed Hydejack via zip, this file already exists. Otherwise you have to create it (and possibly the `_data` directory as well). You can find the default file [here](https://github.com/qwtel/hydejack/blob/v6/_data/authors.yml).

The `authors.yml` consists of key-value pairs, where the key is a shorthand for the author (e.g. the GitHub or Twitter handle) and the value is a hash containing the author's information.

    qwtel:
      name:  Florian Klampfer
      email: mail@qwtel.com

      about: |
        Hi, I'm Florian or `@qwtel`...

If an author's `about` value isn't empty, the text will appear (markdownifyed) at the bottom of each blog post and project*, as well as at the top of pages using the `about` and `welcome`\* layout.

#### Dealing with multiple authors
The first entry in `authors.yml` will be used as the default author.
However, if a blog post, project\*, about or welcome\* page doesn't belong to the default author, you can mark it by setting the `author` key in the front matter. The value must match the key as defined in `authors.yml`, e.g.

~~~yml
---
layout: post
title: Hello World
author: qwtel
---
~~~

### Adding an author's picture
If you'd like for the author's picture to appear in addition the the about text (see previous chapter), you have to provide an URL to the `picture` key in `_data/authors.yml`.

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

### Adding social media icons
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


**NOTE**: You can add any platform, even if it's not defined in [`social.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/social.yml), by providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used when no icon is available. Supplying your own icons is an [advanced topic](#advanced).
{:.message}

#### Adding an email or RSS icon
If you'd like to add email <span class="icon-mail"></span> or RSS <span class="icon-rss2"></span> to the list, add the `email` and `rss` keys, e.g.:

    social:
      email: mailto:mail@gmail.com
      rss:   https://qwtel.com/hydejack/feed.xml

### Enabling comments
Hydejack supports comments via [Disqus](https://disqus.com/). Before you can add comments to a post or project*, you need to register and add your Hydejack site to Disqus' admin console. Once you have your "Disqus shortname", you must add it to `_config.yml`:

    disqus_shortname: qwtel

Now comments can be enabled for posts and projects* by adding `comments: true` to the front matter.

~~~yml
---
layout: post
title: Hello World
comments: true
---
~~~

**NOTE**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}

### Enabling Google Analytics
Enabling Google Analytics is as simple as setting the `google_analytics` key in `_config.yml` .

    google_analytics: UA-84025722-2

Conversely, if you want to disable it, you only have to remove the key and no GA code will be part of the generated pages.

**NOTE**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}




[blog]: https://qwtel.com/hydejack/blog/
[posts]: https://qwtel.com/hydejack/posts/

*[FOIT]: Flash of Invisible Text
*[GA]: Google Analytics



{% comment %}****---------------------------------------------------------------
                    BASICS
----------------------------------------------------------------{% endcomment %}

## Basics
### Adding a category or tag
Hydejack allows you to use the `list` layout to show all posts of a particular tag or category.

#### Recap: Tags and categories in Jekyll
Posts in Jekyll can belong to one or more categories, as well as one or more tags. They are defined in a post's front matter:

~~~yml
---
layout:     post
title:      Welcome to Jekyll
categories: [jekyll, update]
tags:       [jekyll, update]
---
~~~

Posts can also be assigned to a category based on their position within the folder structure, e.g.

~~~
├── jekyll
│   └── update
│       └── _posts
│           └── 2017-04-07-welcome-to-jekyll.markdown
~~~

would place "Welcome to Jekyll" in the categories `jekyll` and `update`.
Whether you use this method or not, categories will always be part of a posts URL, while tags will not, e.g.

Categories | `/jekyll/update/2017/04/07/welcome-to-jekyll/`
Tags       | `/2017/04/07/welcome-to-jekyll/`
{:.scroll-table-small}

As far as Jekyll is concerned, these are the only differences.

#### Tags and categories in Hydejack
Categories and tags are displayed by Hydejack below the title, after the date. Categories are displayed with the preposition "in", while tags are displayed with the preposition "on", e.g.

Categories | Welcome to Jekyll¬ 07 Apr 2017 **in** Jekyll / Update
Tags       | Welcome to Jekyll¬ 07 Apr 2017 **on** Jekyll, Update
Both       | Welcome to Jekyll¬ 07 Apr 2017 **in** Jekyll / Update **on** Jekyll, Update
{:.scroll-table-small}

#### Adding a new category or tag
Be default, categories and tags are rendered as plain text. Further steps are necessary if you want them to link to a page that contains a list of all posts that belong to that category or tag.

For each "featured" category or tag, a file called `<categoryname>.md` or `<tagname>.md` has to be created in `_featured_tags` or `_featured_categories`, respectively.
Each file in these folders is part of a [Jekyll Collection](https://jekyllrb.com/docs/collections/).

The the data of a category or tag is set in the files front matter, e.g.

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
: Must be identical to the key used in the blog's front matter, i.e. if you use `categories: [jekyll]` or `tags:       [jekyll]`, the `slug` must be `jekyll`. Normally the slug is derived from the title, but it is recommended that you set it explicitly.

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

### Adding a page
You can add generic pages that support markdown content but aren't blog posts.
For example, this documentation is written in markdown, consisting of several generic pages.

To add a page, create a new markdown file and put `layout: page` in a front matter

~~~yml
---
layout: page
title:  Documentation
---
~~~

Now you can add content as you would in a blog post.

### Adding an entry to the sidebar
Hydejack's sidebar can add links to any page within the site. In order for a page to appear in the sidebar, it needs to have a truthy `menu` value defined in its front matter. The page also needs to have a `title`, otherwise the entry in the sidebar will be blank.

If you want the link to appear at a particular position, you can set a numeric value to the `order` key. However, the page is not guaranteed to appear in the 5th position when you set a value of `5`, since it will only use that number to sort the pages, i.e. the position of a page also depends on the `order` of all other pages in the sidebar.

### Adding an about page
About pages are a frequent use case, so Hydejack has a special layout for it, which is a slight modification of the `page` layout.
[Demo][about].
The main difference is that it will display an author's `about` text and `picture` above the regular content.

To create an about page, make sure `layout` is set to `about`, and that the `author` key is set to an author defined in `_data/authors.yml`. For more on authors, see [Adding an author](#adding-an-author).)

~~~yml
---
layout: about
title:  About
author: qwtel
---
~~~

### Adding a welcome page*
If you bought the PRO version of Hydejack you have access to the `welcome` layout.
It is intended to showcase your projects and blog posts in a compact way.
Technically, it is a modified version of the `about` layout, so it will also show author information at the top.
[Demo][welcome].

You can create a welcome page by creating a new markdown file and setting the layout to `welcome` in the front matter.

~~~yml
---
layout: welcome
title: Welcome
author: qwtel
---
~~~

Without further configuration, the welcome page will show the two most recent projects and five most recent blog posts.
However, the welcome layout supports selecting specific projects and posts, by adding to the front matter:

~~~yml
---
layout: welcome
title: Welcome
selected_projects:
  - _projects/hydejack-v6.md
  - _projects/hyde-v2.md
selected_posts:
  - _posts/2017-05-03-javascripten.md
  - _posts/2012-02-07-example-content.md
more_projects: projects.md
more_posts: posts.md
---
~~~

`layout`
: Must be `welcome`.

`selected_projects`
: A list of paths to project files that should be displayed below the main content of the page.
The paths are relative to the main directory with no leading `./`.
If no paths are provided, the two most recent projects will be used.

`selected_projects`
: A list of paths to blog posts that should be featured on the welcome page.
The paths are relative to the main directory with no leading `./`.
If no paths are provided, the five most recent posts will be used.

`more_projects`
: The path to the main projects page.
The path is relative to the main directory with no leading `./`.

`more_posts`
: The path to the main posts page.
The path is relative to the main directory with no leading `./`.

### Adding a project*
Projects are organized using [Jekyll Collections](https://jekyllrb.com/docs/collections/).
Each project generates an entry on the projects layout ([Demo][projects]) as well as its own detail page ([Demo][project]).

Each project is defined by a file in the `_projects` directory.
The project's meta information is defined in the file's front matter. You can also add markdown content. A project's front matter may look like:

~~~yml
---
layout: project
title: Hyde v2*
date: 2 Jan 2014
screenshot:
  src: /hydejack/assets/img/projects/hyde-v2@0,25x.jpg
  srcset:
    1920w: /hydejack/assets/img/projects/hyde-v2.jpg
    960w: /hydejack/assets/img/projects/hyde-v2@0,5x.jpg
    480w: /hydejack/assets/img/projects/hyde-v2@0,25x.jpg
caption: Hyde is a brazen two-column Jekyll theme.
description: >
  Hyde is a brazen two-column [Jekyll](http://jekyllrb.com) theme that pairs a prominent sidebar with uncomplicated content. It's based on [Poole](http://getpoole.com), the Jekyll butler.
links:
  -
    title: Demo
    url: http://hyde.getpoole.com
  -
    title: Source
    url: https://github.com/poole/hyde
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

`caption`
: A short description, shown as part of each "project card" in the `projects` layout.

`description`
: A medium-length description, used on the project's detail page as meta description and shown as message box below he screenshot.

`links`
: A list of `title`-`url` pairs that that link to external resources related to this project.

`author`
: Shown below the project, similar to posts.

### Adding a resume*
Hydejack's PRO version features a generalized resume layout.
[Demo][resume].

It generates the resume page from a valid [JSON Resume](https://jsonresume.org/), which is good news if you already have a JSON resume. Otherwise, there are various ways of obtaining one:

* You can use the visual [JSON Resume Editor](http://registry.jsonresume.org/).
* If you have a LinkedIn profile, you can try [LinkedIn to Json Résumé](https://jmperezperez.com/linkedin-to-json-resume/).
* You can edit the [example `resume.json`](https://github.com/qwtel/hydejack/blob/v6/_data/resume.json) in the `_data` directly. It contains example entries for each type of entry.

Once you have a JSON Resume, place it into `_data`.

If you prefer editing YAML files, there is an [example `_resume.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/_resume.yml) file in `_data`.
In order to use it, rename it to `resume.yml` and delete `resume.json`.

To render the resume page, create a new markdown file and set the layout to `resume` in the front matter:

~~~yml
---
layout: resume
title: Resume
---
~~~

**NOTE**: You can download the final `resume.json` (minified) from the assets folder. When running locally, you can find it at `_site/assets/resume.json`.
{:.message}




[about]: https://qwtel.com/hydejack/about/
[welcome]: https://qwtel.com/hydejack/
[resume]: https://qwtel.com/hydejack/resume/
[projects]: https://qwtel.com/hydejack/projects/
[project]: https://qwtel.com/hydejack/projects/hydejack-v6/

[mipmap]: https://en.wikipedia.org/wiki/Mipmap



{% comment %}****---------------------------------------------------------------
                    WRITING
----------------------------------------------------------------{% endcomment %}

## Writing
Hydejack offers a few additional features to markup your markdown.
Don't worry, these are merely CSS classes added via the standard `{:.my-class}` syntax,
so that your posts remain compatible with other Jekyll themes.

**NOTE**: For an introduction to markdown in general, see [Mastering Markdown][mm] and [kramdown Syntax][ksyn].
{:.message}




### Adding a table of contents
You can add a generated table of contents to any page by adding `{:toc}` below a list.

Example: see above

Markdown:
~~~md
* this unordered seed list will be replaced by toc as unordered list
{:toc}
~~~

### Adding message boxes
You can add a message box by adding the `message` class to a paragraph.

Example:

**NOTE**: You can add a message box.
{:.message}

Markdown:
~~~markdown
**NOTE**: You can add a message box.
{:.message}
~~~

### Adding large text
You can add large text by adding the `lead` class to the paragraph.

Example:

You can add large text.
{:.lead}

Markdown:
~~~markdown
You can add large text.
{:.lead}
~~~

### Adding large images
You can make an image span the full width by adding the `lead` class.

Example:

![Full-width image](https://placehold.it/800x100){:.lead}

Markdown:
~~~markdown
![Full-width image](https://placehold.it/800x100){:.lead}
~~~

### Adding large quotes
You can make a quote "pop out" by adding the `lead` class.

Example:

> You can make a quote "pop out".
{:.lead}

Markdown:
~~~
> You can make a quote "pop out".
{:.lead}
~~~

### Adding faded text
You can gray out text by adding the `faded` class.

Use this sparingly and for information that is not essential
--- or you don't want viewers to read at all, like when you pull a line form a dirty rap song..

Example:

I'm faded, faded, faded.
{:.faded}

Markdown:
~~~md
I'm faded, faded, faded.
{:.faded}
~~~

### Adding tables
Adding tables is straightforward and works just as described in the [kramdown docs][ksyntab].

However, as you'll discover, this only works for small tables like the one below.
Larger (data-) tables will be cut off on the right.
Typically, even smaller tables will be cut off when viewed on a mobile device.

| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |

When it comes to displaying large tables on mobile, there is no one-size-fits-all solution.
There are however [two straight-forward, CSS-only solutions][rtable] that are included in Hydejack.

#### Scroll Table
Adding either `scroll-table` or `scroll-table-small` to the CSS classes of a table will enable horizontal scrolling.
The `-small` version will only enable scrolling on "small" screens (< 1080px wide).
This is useful when the table displays correctly on desktop, but not mobile.

Example:

| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|-----------------+------------+-----------------+----------------|-----------------+------------+-----------------+----------------|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                |
| 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                |
|=================+============+=================+================|=================+============+=================+================|=================+============+=================+================|=================+============+=================+================|
| Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                |
{:.scroll-table}

Markdown:
~~~md
| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|-----------------+------------+-----------------+----------------|-----------------+------------+-----------------+----------------|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                | Second body     |            |                 |                |
| 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                | 2 line          |            |                 |                |
|=================+============+=================+================|=================+============+=================+================|=================+============+=================+================|=================+============+=================+================|
| Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                | Footer row      |            |                 |                |
{:.scroll-table}
~~~

#### Flip Table
Alternatively, you can "flip" (transpose) the table.
Unlike the other approach, this will keep the table head (now the first column) fixed in place.

You can enable this behavior by adding `flip-table` or `flip-table-small` to the CSS classes of the table.
Again, the `-small` version will only enable scrolling on "small" screens (< 1080px wide).

**NOTE**: This approach only works on simple tables that have a single `tbody` and an optional `thead`.
{:.message}

Example:

| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
| 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            |
| 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            |
| 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            |
| 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            |
| 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            |
| 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            |
| 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            |
{:.flip-table}

Markdown:
~~~md
| Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  | Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    | First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            | Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            | Third line      |quux        | baz             | bar            |
| 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            | 4th line        |quux        | baz             | bar            |
| 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            | 5th line        |quux        | baz             | bar            |
| 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            | 6th line        |quux        | baz             | bar            |
| 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            | 7th line        |quux        | baz             | bar            |
| 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            | 8th line        |quux        | baz             | bar            |
| 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            | 9th line        |quux        | baz             | bar            |
| 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            | 10th line       |quux        | baz             | bar            |
{:.flip-table}
~~~

Two things to keep in mind when using `scroll-table`, `flip-table`, `scroll-table-small`, or `flip-table-small`:
* Smaller tables will no longer be stretched to span the full width.
* The layout engine will not attempt to add line-breaks within cells, making columns that contain text unusually large.

**NOTE**: When using tables in HTML format (i.e. something that looks like `<table>...</table>`),
add the CSS class by setting the `class` attribute on `table`, e.g. `<table class="scroll-table">...</table>`.
{:.message}

### Adding code blocks
To add a code block without syntax highlighting, simply indent 4 spaces (regular markdown).
For code blocks with code highlighting, use `~~~<language>`. This syntax is also supported by GitHub.
For more information and a list of supported languages, see [{ Rouge }](http://rouge.jneen.net/).

Example:

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

**NOTE**: I advice against using Jekyll's `{ % highlight % } ... { % endhighlight % }` syntax,
especially when using it together with the `linenos` option,
as the generated output will break the page during minification (i.e. during a production build).
You can read more about it [here](https://github.com/penibelst/jekyll-compress-html/issues/71) and
[here](https://github.com/jekyll/jekyll/issues/4432).
{:.message}

### Adding math
Hydejack supports [math blocks][ksynmath] via [KaTeX][katex].

Why KaTeX instead of MathJax? KaTeX is faster and more lightweight at the cost of having less features, which,
for the purpose of writing blog posts, should be a favorable tradeoff.

**NOTE**: KaTeX does not support the `align` and `align*` environments.
Instead, `aligned` should be used, e.g. `\begin{aligned} ... \end{aligned}`.
{:.message}

#### Inline
Example:

Lorem ipsum $$ f(x) = x^2 $$.

Markdown:
~~~md
Lorem ipsum $$ f(x) = x^2 $$.
~~~

#### Block
Example:

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





[mm]: https://guides.github.com/features/mastering-markdown/
[ksyn]: https://kramdown.gettalong.org/syntax.html
[ksyntab]:https://kramdown.gettalong.org/syntax.html#tables
[ksynmath]: https://kramdown.gettalong.org/syntax.html#math-blocks
[katex]: https://khan.github.io/KaTeX/
[rtable]: https://dbushell.com/2016/03/04/css-only-responsive-tables/



{% comment %}****---------------------------------------------------------------
                    SCRIPTS
----------------------------------------------------------------{% endcomment %}

## Scripts
There are two ways of adding third party scripts.
[Embedding](#embedding) is ideal for one-off scripts, e.g. `widgets.js` that is part of embedded tweets (see below).
Adding [global scripts](#global-scripts) is for scripts that should be loaded on every page.

```html
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The next version of Hydejack (v6.3.0) will allow embedding 3rd party scripts, like the one that comes with this tweet for example.</p>&mdash; Florian Klampfer (@qwtel) <a href="https://twitter.com/qwtel/status/871098943505039362">June 3, 2017</a></blockquote>
```

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The next version of Hydejack (v6.3.0) will allow embedding 3rd party scripts, like the one that comes with this tweet for example.</p>&mdash; Florian Klampfer (@qwtel) <a href="https://twitter.com/qwtel/status/871098943505039362">June 3, 2017</a></blockquote>




### Embedding
Hydejack supports embedding third party scripts directly inside markdown content. This will work in most cases, except when a script can not be loaded on a page more than once (this will occur when a user navigates to the same page twice).

**NOTE**: Adding "raw" script tags will make the page slow, unless they have the `async` or `defer` attribute set. For more see [below](#async-vs-defer-vs-loadjsdeferred).
{:.message}

### Global scripts
If you have scripts that should be loaded on every page you can add them globally.
Hydejack's own script is loaded from `_includes/scripts.html`, but I'd recommend creating your own file called `my-scripts.html` (inside `_includes`).

You can put arbitrary HTML into `my-scripts.html`, but generally you'd want to add script tags. The [same rules](#async-vs-defer-vs-loadjsdeferred) apply.

**NOTE**: Upgrading to a new version of Hydejack will overwrite `scripts.html`, so you have to go in and uncomment the line again. This is due to how Jekyll includes work.
{:.message}

### `async` vs. `defer` vs. `loadJSDeferred`
I highly recommended setting the `async` or `defer` attribute on your external scripts (i.e. the ones that have a `src` attribute).
Otherwise the entire page can't finish loading until a separate HTTP request is completed, which can take a long time (this applies to the web in general, not just Hydejack).

Specific to Hydejack is the `loadJSDeferred` function, which is used to load Hydejack's own scripts. It has various advantages which are detailed in the table below.

|           | `async`     | `defer`                | `loadJSDeferred`      |
|:----------|:------------|:-----------------------|:----------------------|
| Download  | immediately | immediately            | after document `load` |
| Execution | asap        | before document `load` | after document `load` |
| Ordering  | none        | preserves order        | via callback nesting  |
| Support   | IE8+        | IE9+                   | IE5+ (Hydejack only)  |
{:.flip-table-small}

### Using `loadJSDeferred` (Hydejack only)
Using `loadJSDeferred` is slightly more work than just adding `defer` to a script tag.

```html
<script>
  loadJSDeferred('<script-src>', function () {
    // <callback code>
  });
</script>
```

If you have scripts that depend on other scripts, you can nest calls, e.g.

```html
<script>
  loadJSDeferred('<script-src-1>', function () {
    // <callback script 1>
    loadJSDeferred('<script-src-2>', function () {
      // <callback script 1 + 2>
      loadJSDeferred('<script-src-3>', function () {
        // <callback script 1 + 2 + 3>
      });
    });
  });
</script>
```

### Registering push state event listeners
When embedding scripts globally you might want to run some init code after each page load. However, the problem with push state-based page loads is that the `load` event won't fire again. Luckily, Hydejack's push state component exposes an event that you can listen to instead.

```html
<script>
  document.getElementById('_yPushState').addEventListener('y-push-state-load', function() {
    // <your init code>
  });
</script>
```

Note that the above code must only run once, so include it in your `my-scripts.html`.

Other events you can register on `_yPushState` include

`y-push-state-start`
: Occurs when clicking a link

`y-push-state-ready`
: Animation fished and response has been parsed, ready to swap out the content.

`y-push-state-after`
: The old content has been replaced with the new content.

`y-push-state-animationend`
: The animation has finished playing.

`y-push-state-progress`
: Special case when animation is finished, but no response from server has arrived yet. This is also when the spinner will appear.

`y-push-state-load`
: All embedded script tags have been inserted into the document and have finished loading.



{% comment %}****---------------------------------------------------------------
                    BUILD
----------------------------------------------------------------{% endcomment %}

## Build
### Building locally
When building Hydejack it is important to set the environment variable `JEKYLL_ENV` to `production`.
Otherwise the output will not be minified. Building itself happens via Jekyll's `build` command.

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build
~~~

This will generate the finished static files in `_site`,
which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

#### GitHub Pages
To deploy to GitHub Pages, the steps are:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build
$ cd _site
$ git init # you only need to do this once
$ git remote add origin <github_remote_url> # you only need to do this once
$ git add .
$ git commit -m "Build"
$ git push origin master:<remote_branch>
$ cd ..
~~~

`github_remote_url`
: Find this on your repository's GitHub page.

`remote_branch`
: Either `master` for "user or organization pages", or `gh-pages` for "project pages"

More on [user, organization, and project pages](https://help.github.com/articles/user-organization-and-project-pages/).

### Building locally with latent semantic analysis
By default, related posts are simply the most recent posts.
Hydejack modifies this a bit, by showing the most recent posts of the same category or tag.
However, the results are still pretty "unrelated".
To provide better results, Jekyll supports [latent semantic analysis][lsa] via [`classifier-reborn`][crb]'s
[Latent Semantic Indexer][lsi]

To use the LSI, you first have to disable Hydejack's default behaviour, by setting `use_lsi: true` in `_config.yml`

    use_lsi: true

Then, you have to run `jekyll build` with the `--lsi` flag:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build --lsi
~~~

This will generate the finished static files in `_site`,
which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

#### GitHub Pages
To deploy to GitHub Pages, the steps are:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build --lsi
$ cd _site
$ git init # you only need to do this once
$ git remote add origin <github_remote_url> # you only need to do this once
$ git add .
$ git commit -m "Build"
$ git push origin master:<remote_branch>
$ cd ..
~~~

`github_remote_url`
: Find this on your repository's GitHub page.

`remote_branch`
: Either `master` for "user or organization pages", or `gh-pages` for "project pages"

More on [user, organization, and project pages](https://help.github.com/articles/user-organization-and-project-pages/).





[deploy]: https://jekyllrb.com/docs/deployment-methods/
[lsa]: https://en.wikipedia.org/wiki/Latent_semantic_analysis
[crb]: http://www.classifier-reborn.com/
[lsi]: http://www.classifier-reborn.com/lsi

*[LSI]: Latent Semantic Indexer



{% comment %}****---------------------------------------------------------------
                    ADVANCED
----------------------------------------------------------------{% endcomment %}

## Advanced
### Adding a custom social media icon
Hydejack includes a number of social media icons by default (in fact, everything that is provided by [IcoMoon](https://icomoon.io/)), but since the landscape is always changing, it is likely that a platform that is important to you will be missing at some point.

**NOTE**: You can add any platform by simply providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used.
{:.message}

#### Creating the icon font
In order to add a custom social media icon you have to use the [IcoMoon App](https://icomoon.io/app/) (free) to create a custom icon webfont. However, it is important that the generated font include all icons already in use by Hydejack. For this purpose, find the `selection.json` in [`assets/icomoon/selection.json`](https://github.com/qwtel/hydejack/blob/v6/assets/icomoon/selection.json) and upload it to the app via "Import Icons".
Then, use the app to add your icon(s).
Consult the [IcoMoon docs](https://icomoon.io/#docs) for additional help.

Once you've created and downloaded the icon font form IconMoon, replace the `icomoon` folder in `assets` in its entirety. Keep in mind that future updates of Hydejack will override this folder.

#### Adding the platform's metadata
For the second step it is necessary to add the network's metadata to `_data/social.yml`.
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

### Building the JavaScript
**NOTE**: In order to build the JavaScript you need to have [node.js](https://nodejs.org/en/) installed. Specifically, the `npm` command needs to be available, which is part of node.js.
{:.message}

Before you start, make sure you've copied the following files:
* `_js/`
* `package.json`
* `.babelrc`
* `.eslintignore`
* `.eslintrc`

When building for the first time (and after each update of Hydejack) you have to run

    $ npm install

This will fetch all dependencies (and put them in a local folder called `node_modules`), lint the code and write the bundled and minified script into `assets/js/hydejack.js`.

Subsequent builds are administered via

    $ npm run build

If you want to actively develop the scripts, it is better to run

    $ npm run dev

which will build a non-minified, non-transpiled (ES2016) version of `hydejack.js` after each filechange.

*[FLIP]: First Last Invert Play