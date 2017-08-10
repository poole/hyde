---
layout: page
title: Configuration
redirect_from:
  - /docs/latest/configuration/
  - /docs/configuration/
---

Once Jekyll is running, you can start with basic configuration by adding various entries to `_config.yml`.
Besides the documentation here, the file is also extensively documented. If you're using the gem-based theme, the `_config.yml` in the root directory is provided by Jekyll and does not contain any documentation. However, you can get the example config file [here](https://github.com/qwtel/hydejack/blob/v6/_config.yml).

**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

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

**NOTE**: It is recommended that you use a blurred image in order for the text to remain readable. If you save a blurred image as JPG, it will also drastically reduce its file size.
{:.message}

## Changing `font` and `font_heading`
Hydejack lets you configure the fonts of regular text and headings. It has built-in support for Google Fonts, which are loaded lazily and swapped without FOIT. There are three keys in `_config.yml` associated with it: `font`, `font_heading` and `google_fonts`. The defaults are:

    font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
    font:         "'Noto Serif', Georgia, serif"
    google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"

As you can see, `font` and `font_heading` are values you would pass to the `font-family` CSS property (without the `;`). When using a Google Font, it should consist of at least 2 fonts, where everything except the first entry will be used as a fallback until the desired font is fetched from Google.

The `google_fonts` key is the string necessary to fetch the fonts from Google. You can get it from the download page at [Google Fonts](https://fonts.google.com) after you've selected one or more fonts:

![Where to find the Google Fonts string]({{ site.baseurl }}/assets/img/docs/google-fonts.png)

### Using safe web fonts
If you prefer not to use Google Fonts and use [safe web fonts](http://www.cssfontstack.com/) instead,
all you have to do is set `no_google_fonts` to `true`.
In this case, `font` and `font_heading` do not have to contain more than one font.
You may also remove the `google_fonts` key.

## Choosing a blog layout
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

## Adding an author
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

### Dealing with multiple authors
The first entry in `authors.yml` will be used as the default author.
However, if a blog post, project\*, about or welcome\* page doesn't belong to the default author, you can mark it by setting the `author` key in the front matter. The value must match the key as defined in `authors.yml`, e.g.

~~~yml
---
layout: post
title: Hello World
author: qwtel
---
~~~

## Adding an author's picture
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


**NOTE**: You can add any platform, even if it's not defined in [`social.yml`](https://github.com/qwtel/hydejack/blob/v6/_data/social.yml), by providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used when no icon is available. Supplying your own icons is an [advanced topic](advanced.md).
{:.message}

### Adding an email or RSS icon
If you'd like to add email <span class="icon-mail"></span> or RSS <span class="icon-rss2"></span> to the list, add the `email` and `rss` keys, e.g.:

    social:
      email: mailto:mail@gmail.com
      rss:   https://qwtel.com/hydejack/feed.xml

## Enabling comments
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

## Enabling Google Analytics
Enabling Google Analytics is as simple as setting the `google_analytics` key in `_config.yml` .

    google_analytics: UA-84025722-2

Conversely, if you want to disable it, you only have to remove the key and no GA code will be part of the generated pages.

**NOTE**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}

Continue with [Basics](basics.md){:.heading data-flip="title"}
{:.read-more}

[blog]: https://qwtel.com/hydejack/blog/
[posts]: https://qwtel.com/hydejack/posts/

*[FOIT]: Flash of Invisible Text
*[GA]: Google Analytics
