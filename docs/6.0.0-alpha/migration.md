---
layout: page
title: Migration
image: '/hydejack/assets/img/doc.jpg'
color: '#8e5c75'
---

[TODO]

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## From Hydejack v5
Unfortunately, upgrading form v5 is not straightforward. A lot of patterns and names have changed, motivated by a variety of reasons, including better integration with the rest of the Jekyll ecosystem, simplified workflows enabled by Jekyll 3.0, ...

**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}

### Adding and removing files
Copy the the following folders and files from Hydejack v6 into your existing repository

* `_data`
* `_includes`
* `_js`
* `_layouts`
* `_sass`
* `404.md`
<!-- * `about.md` -->
* `assets`
* `index.html`
* `package.json`

Make sure you merge the folder contents.

Delete the following folders and files:

1. Delete the `public` folder. If you have placed files in the `public` folder, only delete `public/css`, `public/js` and `public/fonts` instead. Static files are now located in the `assets` folder.
1. Delete `404.html`.
1. Delete `atom.xml`

### Changing the configuration
`_config.yml` has changed considerably. Open the file and do the following:

1. Rename the following keys

    * `font_accent` => `font_heading`
    * `load_google_fonts` => `google_fonts`
    * `google_analytics_id` => `google_analytics`
    * `disqus` => `disqus_shortname`

1. Add

    ~~~
    collections:
      featured_categories:
        permalink:       /category/:name/
        output:          true
      featured_tags:
        permalink:       /tag/:name/
        output:          true
      projects:
        permalink:       /projects/:path/
        output:          true
    ~~~

1. Add `- jekyll-feed` to `gems`.

1. Copy the entire `author` hash from `_config.yml` into the new file `_data/authors.yml`.

2. Delete every key of the `author` hash in `_config.yml` except `name` and `email`.

### Adding an author
3. Delete `photo` and `photo2x` in `_data/authors.yml` and add a `picture` hash instead that looks like

    ~~~
    picture:
      src: <photo>
      srcset:
        1x: <photo>
        2x: <photo2x>
    ~~~

For more information, see [Adding an author]({{ site.baseurl }}{% link docs/6.0.0-alpha/configuration.md %}#adding-an-author).


1. Open `about.md` and change the `layout` in the front matter to `about`.

1.

### Restoring the sidebar
6. Delete `sidebar_tags` in `_config.yml`. Instead open the pages you would

TODO

## From another Jekyll theme
When migrating your pre-existing Jekyll blog to Hydejack you have to watch out for keys in `_config.yml` and blog posts' front matter that might have special meaning within Hydejack.

These include, but are not limited to:

* Setting `comments` to `true` will have no effect, unless you also provide a `disqus_shortname` in `_config.yml`
* Setting `author` to a value, assumes there is an author defined in `_data/authors.yml`
* `image` is a blurred background image and `color` should b
* `description` is used to add a message box under a blog post's title, as well as the meta description tag.

## From free to "PRO" version*
Upgrading form the free version to "PRO" is straightforward. All that is necessary to copy the following folders from "PRO" into your repository.

* `_includes`
* `_layouts`
* `_sass`
* `assets`

Since you've probably added files to some of these folders make sure you merge the contents. If you've modified any files (discouraged) the changes will be overwritten and you have to redo those changes.

If you'd like to add examples of the new layouts, you can additionally copy:

* `projects.md`
* `resume.md`
* `welcome.md`

For more information on how to use these, see [TODO: add links to docu].
