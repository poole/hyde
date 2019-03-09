---
title: Improving Hydejack's Build Speed
image: /assets/img/blog/wade-lambert.jpg
description: >
  Hydejack 8.4.0 introduces new options to bring Hydejack's build time in line with other Jekyll themes. 
---

Hydejack was designed with personal sites in mind, i.e. sites with around 100 pages. Because of this, build speed hasn't been a major concern during its development. When attempting to use Hydejack with thousands of pages this becomes very apparent, as build times go from seconds, to minutes, to hours. 

Before we get started, if you are primarily concerned with build times during writing/previewing new articles, try using the `--incremental` flag, e.g.

    bundle exec jekyll serve --incremental

For more, see the [Jekyll docs](https://jekyllrb.com/docs/configuration/#build-command-options) .

With that out of the way, here are three ways to improve Hydejack's production build speed:


## Disable Inline CSS
Inlining critial CSS into each page increases page load speed in the browser, but it also introduces a *significant* build time increase. This is due to `scssify` being called for every single page with a large chunk of Hydejack's SCSS as input.

To disable this optimization, set `no_inline_css` to `true` in the config file.

```yml
hydejack:
  no_inline_css: true
```

## Disable Per-Page Styles
Hydejack allows you to change the accent color on a per-page basis. While this is a neat feature, it's certainly not necessary and many sites don't use it. Similar to inline CSS, it involves a call to `scssify` per page, which increases build time (though to a lesser extent).

To disable this feature, set `no_page_style` to `true` in the config file.

```yml
hydejack:
  no_page_style: true
```

## Use Simpler Related Posts

Hydejack does some clever things to show more related "Related Posts" on the bottom of blog posts. However, clever things (implemented within the liquid templating engine) take time, and this becomes apparent when trying to build a site with 10,000 posts.

To speed up buidling further, set the (admittedly poorly named) `use_lsi` option to `true`:

```yml
hydejack:
  use_lsi: true
```

## Define Sidebar Entries in the Config File
In previous versions of Hydejack adding entries to the sidebar was done by setting `menu` to `true` in the front matter of a page. This meant that finding the sidebar entries required checking every page for the `menu` flag, once per page. This was slow and the time increased quadratically with the number of pages. 
Staring with version 8.4.0, you can define sidebar entries in the config file under the `menu` key like so:

```yml
menu:
  - title: Blog
    url:   /blog/
  - title: Projects
    url:   /projects/
  - title: Resume
    url:   /resume/
  - title: About
    url:   /about/
```

Note that the old way of doing things still works if you upgrade to 8.4.0. Only when you set the `menu` key will Hydejack switch to the new behavior.
{:.message}


## Conclusion
Hydejack's default settings are fine for small personal blogs of around 100 pages. However, when building large sites with 1,000 pages or more, build time becomes an issue. The following settings will help, but can't overcome the inherent limitations of Jekyll.

```yml
# file: _config.yml
hydejack:
  no_inline_css: true
  no_page_style: true
  use_lsi:       true

menu:
  - title: Blog
    url:   /blog/
  - title: Projects
    url:   /projects/
  - title: Resume
    url:   /resume/
  - title: About
    url:   /about/
```