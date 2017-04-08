---
layout: page
title: Migration
---

[TODO]

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

<!-- # Migration -->
## From another Jekyll theme
When migrating your pre-existing Jekyll blog to Hydejack you have to watch out for keys in `_config.yml` and blog posts' front matter that might have special meaning within Hydejack.

These include, but are not limited to:

* Setting `comments` to `true` will have no effect, unless you also provide a `disqus_shortname` in `_config.yml`
* Setting `author` to a value, assumes there is an author defined in `_data/authors.yml`
* `image` is a blurred background image and `color` should b
* `description` is used to add a message box under a blog post's title, as well as the meta description tag.

## From Hydejack v5
Unfortunately, upgrading form v5 is not straightforward. A lot of patterns and names have changed, motivated by a variety of reasons, including better integration with the rest of the Jekyll ecosystem, simplified workflows enabled by Jekyll 3.0, ...

[TODO]

## From free to "PRO" version*
Upgrading form the free version to "PRO" is straightforward. All that is necessary to copy the following folders from "PRO" into your repository.

* `_includes`
* `_layouts`
* `_sass`
* `assets`

Since you've probably added files to some of these folders make sure you merge the contents. If you've modified any files (discouraged) the changes will be overwritten and you have to redo those changes.

If you'd like to add examples of the new layouts, you can additionally copy:

* `_data`
* `projects.md`
* `resume.md`
* `welcome.md`

For more information on how to use these, see [TODO: add links to docu].
