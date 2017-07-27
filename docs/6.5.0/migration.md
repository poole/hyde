---
layout: page
title: Migration
redirect_from:
  - /docs/latest/migration/
  - /docs/migration/
---

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## From Hydejack v6
Unless otherwise noted, to upgrade from an older to a newer version of Hydejack (6.0.0 and above), copy to following folders from the zip into your repository.

* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`

**NOTE**: If you've modified any of Hydejack's files, changes will be overwritten and you have to redo those changes.
{:.message}

Buyers of the PRO version will find the files necessary for an upgrade in the `upgrade` folder of the downloaded zip archive. Unless you've made any changes to Hydejack's own files, you can safely copy them into your blog directory.

### From gem-based to zip
When upgrading from the gem-based version to any zip version (free *or* PRO) copy to following files and folders:

* `_data/`
* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`
* `404.md`

Also make sure to remove the following line from `_config.yml`, as all necessary files are now located in the directory itself:

    theme: jekyll-theme-hydejack

## From Hydejack v5
Unfortunately, upgrading form v5 is not straightforward. A lot of patterns and names have changed, motivated by a variety of reasons, including better integration with the rest of the Jekyll ecosystem and simplified workflows enabled by Jekyll Collections.

### Updating the folder structure
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

### Updating the configuration
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

### Updating the author
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

For more information, see [Adding an author](configuration.md#adding-an-author).

### Restoring the tags
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

### Restoring the sidebar entries
Hydejack can now link to any kind of page in the sidebar.

1. Delete `sidebar_tags` in `_config.yml`.
2. Open a file who's page you would like to add to the sidebar. If you want to add a tag, open `_featured_tags/<tagname>.md`.
3. Add `menu: true` to its front matter.
4. (Optional) Set `order: <number>`, where `<number>` is the number at which you would like the link to appear.

### Restoring the RSS feed
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

### Restoring the comments
The way comments are enabled has changed slightly. You now have to enable them per page by adding `comments: true` to the front matter (this is what the [Disqus integration guide](https://disqus.com/admin/install/platforms/jekyll/) suggests).

As mentioned above, don't forget to rename `disqus` to `disqus_shortname` in `_config.yml`.

### Restoring the about page
Hydejack now has a dedicated layout for about pages.
To use it, open `about.md` and change the `layout` in the front matter to `about` and delete `{\% include about-short.html author=site.author %\}`.

Continue with [Configuration](configuration.md){:.heading data-flip="title"}
{:.read-more}
