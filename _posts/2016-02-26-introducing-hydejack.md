---
layout: post
title: Introducing Hydejack
tags: [hyde]
---

<style>
  .preview {
    display: none;
  }

  @media (min-width: 48em) {
    .preview {
      display: block;
    }
  }
</style>

Hydejack is a pretentious two-column [Jekyll](http://jekyllrb.com) theme, stolen by [`@qwtel`](https://twitter.com/qwtel) from [Hyde](http://hyde.getpoole.com). You could say it was.. [hydejacked](http://media3.giphy.com/media/makedRIckZBW8/giphy.gif).

### Features
Unlike Hyde, it's opinionated about how you are going to use it (as a blog!)
Features included are:

* Github Pages compatible tag support based on [this post][tag].
* Per-site, per-tag and per-post link color and sidebar image.
* Touch-enabled sidebar / drawer for mobile, including fallback when JS is disabled.
* Optional author section at the bottom of each post.
* Posts grouped by year on front and tag page.
* Social media icons (github, twitter) on sidebar.
* "Cesar" link hover effect.

### Small-Screen Preview
{:.preview}

<iframe class="preview" src="/hydejack/2016/02/26/introducing-hydejack/" style="border: 1px solid #ddd; width: 340px; height: 520px; margin-top: 1rem"></iframe>

### How to Add a New Tag

Tags are not meant to be used #instagram #style: #food #goodfood #goodlife #happy #happylife #didimentionfood #yougetthepoint, as each tag requires some setup work. I think of it as categories that can be combined.

1.  Add entry to `_data/tags.yml`, where the key represents a slug and provide at least a `name` and optionally `image`, `color` and `description`.

    Example `/_data/tags.yml`:

    ~~~yml
    mytag:
      name: My Tag
    ~~~

2.  Make a new file in the `tag` folder, using the same name you've used as the key / slug and change the `tag` and `permalink` entries.

    Example `/tag/mytag.md`:

    ~~~yml
    ---
    layout: blog_by_tag
    tag: mytag
    permalink: /tag/mytag/
    ---
    ~~~

3.  Tag your blog posts using the `tags` key (color and image will only depend on the first tag).

    ~~~yml
    ---
    layout: post
    title: Introducing My New Tag
    tags: [mytag, othertag]
    ---
    ~~~

4. (optional) Add the tag to the sidebar, by adding it to `sidebar_tags` in `_config.yml`.
   They will appear in the listed order.

   ~~~yml
   sidebar_tags: [mytag, othertag]
   ~~~

[tag]: http://www.minddust.com/post/tags-and-categories-on-github-pages/
