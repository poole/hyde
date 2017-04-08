---
layout: page
title: Configuration
---

<!-- ## Configuration -->
Once Jekyll is running, you can start with basic configuration by adding various entries to `_config.yml`.
Besides the documentation here, the file is also extensively documented. If you're using the gem-based theme, the `_config.yml` in the root directory is provided by Jekyll and does not contain any documentation. However, you can get the example config file [here](https://github.com/qwtel/hydejack/blob/master/_config.yml).

**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Changing the color and image
Hydejack allows you to choose the background image of the sidebar, as well as the accent color (color of the links, selection and focus outline, as well as background color of the sidebar, should no image be provided) on a per-page, per-category, per-tag, per-author and global basis.

It is recommended that you provide fallback values in `_config.yml`, should no other rule apply:

    image: /hydejack/assets/img/nap.jpg
    color: '#A85641'

**Note**: It is recommended that you use a blurred image in order for the text to remain readable. If you save a blurred image as JPG, it will also drastically reduce its file size.
{:.message}

## Changing the fonts
Hydejack lets you configure the fonts of regular text and headings. It has built-in support for Google Fonts, which are loaded lazily and swapped without FOIT. There are three keys in `_config.yml` associated with it: `font`, `font_heading` and `google_fonts`. The defaults are:

    font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
    font:         "'Noto Serif', Georgia, serif"
    google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"

The `font` and `font_heading` key are the values you would pass to the `font-family` CSS property (without the `;`). When using a Google Font, it should consist of at least 2 fonts, where everything but the first entry will be used as a fallback until the fonts are fetched from Google.

The `google_fonts` key on the other hand is the string necessary to load the fonts from Google. You can get it at the "check out" page at [Google Fonts](https://fonts.google.com):

![Google Fonts String]({{ site.baseurl }}/assets/img/google-fonts.png)

### Using safe web fonts
If you prefer not to use Google Fonts and use [safe web fonts](http://www.cssfontstack.com/) instead, all you have to do is remove the `google_fonts` key entirely. In this case, `font` and `font_heading` do not have to contain more than one font.

## Adding an author
At the very least, you should add an `author` key with a `name` and `email` sub-key (used by the [feed plugin](https://github.com/jekyll/jekyll-feed)) to `_config.yml`:

    author:
      name:  Florian Klampfer
      email: f.klampfer@gmail.com

If you would like the author information to be displayed in the about section of a post or project\*, as well as on the about and welcome\* page, you have to provide additional information in `_data/authors.yml`. If you've installed Hydejack via zip, this file already exists. Otherwise you have to create it (possibly the `_data` directory also). You can find the default file [here](https://github.com/qwtel/hydejack/blob/master/_data/authors.yml).

The `authors.yml` consists of key-value pairs, where the key is a shorthand for the author (e.g. the GitHub or Twitter handle) and the value is a hash containing the author's information.

    me:
      name:  Florian Klampfer
      email: f.klampfer@gmail.com

      about: |
        Hi, I'm Florian or `@qwtel`...

In order to set an author as the default author, you have to add the shorthand (in this case `me`) to the author in `_config.yml` via the `authors_key` property.

    author:
      name:        Florian Klampfer
      email:       f.klampfer@gmail.com
      authors_key: me

If an author's `about` value isn't empty, it will appear (markdownifyed) below each of the author's blog posts and projects* below the heading "About", as well as at the top of the `about` and `welcome`\* layout.

If a blog post, project\*, about or welcome\* page doesn't belong to the default author, you can mark it by setting the `author` key in the front matter to the key of the author in `authors.yml`, e.g.:

    ---
    layout: post
    title: "Hello World"
    author: me
    ---

## Adding an author's picture
If you'd like for the author's picture to appear in addition the the about text (see previous chapter), you have to provide an URL to the author's `picture` key in `_data/authors.yml`.

    picture:  /assets/img/me.jpg

If you'd like to provide multiple versions of the picture for screens with different pixel densities, you can provide a `src` and `srcset` property instead.

    picture:
      src:    //qwtel.com/assets/img/me.jpg
      srcset:
        1x:   //qwtel.com/assets/img/me.jpg
        2x:   //qwtel.com/assets/img/me@2x.jpg

The `src` property is a fallback image for browsers that don't support the `srcset` attribute.

The keys of the `srcset` property will be used as descriptors.
For mor information on `srcset`, see the [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset), or [this article from CSS-Tricks](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/).

## Adding social media icons
Hydejack supports a variety of social media icons out of the box. These are defined on a per-author basis, so make sure you've followed the steps in [Adding an author](#adding-an-author).

If you are using the gem-based version of Hydejack, also make sure that you've downloaded [`social.yml`](https://github.com/qwtel/hydejack/blob/master/_data/social.yml) and put it into `_data`. This is necessary because gem-based themes do not support including `_data`.


[TODO]

<!-- You can also `ctrl-f` the `social.yml` file to see if Hydejack supports a particular network.
**NOTE**: You can add any platform by simply providing an URL (just make sure it contains `//`). However, a fallback icon <span class="icon-link"></span> will be used instead of the platform's icon.
{:.message} -->

## Adding an entry to the sidebar
Hydejack's sidebar can add links to any Jekyll page, but will not do so by default. In order for a page to appear in the sidebar, it needs to have a truthy `menu` value defined in its front matter.

The page also needs to have a `title`, otherwise the entry in the sidebar will be blank.

If you want the link to appear at a particular position, you can set a numeric value to `order` key. Note however, that the page is not guaranteed to appear in the 5th position if you set a value of `5`, since it will only use it to sort the pages. Its position also depends on the `order` of other pages in the sidebar, which you may modify.

E.g., this page's front matter is

~~~yml
---
layout: page
title: "Documentation"
menu: true
order: 5
---
~~~

## Enabling comments

Hydejack supports comments via [Disqus](https://disqus.com/). You need to

[TODO]

Comments can be enabled on every page by

[TODO]

**Note**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}

## Enabling Google Analytics
Enabeling Google Anaylists is as simple as setting the `google_analytics` key in `_config.yml` .

    google_analytics:    UA-84025722-2

Conversely, if you want to disable it, you only have to remove the key and no GA code will be part of the generated pages.

**Note**: Pasting code snippets provided by 3rd parties into the body will have undesired side effects (and may not work at all), because pages are loaded and swapped via JavaScript.
{:.message}

*[FOIT]: Flash of Invisible Text
