---
layout: welcome
title: Hydejack
description: >
  **Hydejack** is a cutting-edge Jekyll theme that combines the best of static sites and modern web apps.
  It features a suite of JavaScript that makes the page feel like an app,
  without sacrificing backwards-compatibility, page-load speed or SEO.
  Open `index.md` to edit this text.
selected_projects:
  - _projects/default.md
  - _projects/pretentious.md
  - _projects/hyde.md
  - _projects/oldschool.md
  - _projects/solid-red.md
  - _projects/solid-orange.md
selected_posts:
  - _posts/2017-07-27-better-gem-support.md
  - _posts/2017-06-21-related-projects-and-data-tables.md
  - _posts/2017-06-06-third-party-scripts.md
  - _posts/2017-05-03-javascripten.md
  - _posts/2012-02-07-example-content.md
more_projects: projects.md
more_posts: posts.md
content_separator: <!--more-->
---

**Hydejack** aims to be the complete package for professionals on the web.
It features a blog suitable for both prose and technical documentation,
a showcase for projects and a resume that fits with the rest of the design.

> Your presence on the web --- A [blog], a [portfolio] and a [resume].
{:.lead}

**Hydejack** is highly customizable and lets you achieve a variety of styles.
Below you can find a selection of variations that are included.

<!--more-->

## [Download](download.md){:.flip-title}
There are two versions of **Hydejack**: The Free Version includes basic blogging functionality,
as did previous versions of the theme.
The new PRO Version includes additional features for professionals:
A [portfolio], a [resume] layout and a [welcome] page to feature your favorite projects and posts.

This table details what is and isn't included in each respective version.

|                                     | Free               | PRO                |
|:------------------------------------|:------------------:|:------------------:|
| Blog                                | &#x2714;           | &#x2714;           |
| Features (see below)                | &#x2714;           | &#x2714;           |
| [Portfolio] Layout                  |                    | &#x2714;           |
| [Resume] Layout                     |                    | &#x2714;           |
| [Welcome] Layout                    |                    | &#x2714;           |
| Newsletter Subscription Box         |                    | &#x2714;           |
| Custom Forms                        |                    | &#x2714;           |
| Latest issue of "Fishing Quarterly" |                    |                    |
| Ten free scuba diving lessons       |                    |                    |
| License                             | [GPL-3.0][license] | [PRO]              |
| Price                               | Free               | $59                |
|| [Download on GitHub][github]<br/> -- or -- <br/>[Use the RubyGem][gem] | [Buy Now – $59][buy]{:.btn.btn-primary} [^3] |
{:.stretch-table}

## Features
All versions include *all* of these features:

* Full in-app page loading --- no Flash of White, no Flash of Unstyled Content[^1]
* Advanced animations, inspired by Material Design
* A customizable sidebar that turns into a touch-enabled app drawer on mobile
* Near-perfect [Google PageSpeed Score][gpss][^2]
* Even higher *perceived speed* thanks to pre-fetching and latency-hiding
* Support for categories and tags --- even when hosting on GitHub Pages
* Built-in collection of social media icons
* Author section below each article and multiple authors
* Simple and semantic HTML --- can be viewed even with text-based browsers
* Progressive enhancement --- sacrifice features, not content
* Google Analytics and Google Fonts support
* Blog layout with pagination
* Syntax highlighting
* Math formulas via LaTeX
* Disqus comments
* RSS feed
* Print layout

## Free Version
The Free Version features the design and tech of **Hydejack**, but only supports basic blogging.

[Download on GitHub][github] -- or -- [Use the RubyGem][gem]

## PRO Version
The PRO Version aims to be the complete package for professionals on the web.
It includes layouts for your [portfolio], your [resume] (with support for [JSON Resume](https://jsonresume.org/)) and
a [welcome] page to introduce yourself to visitors.

[Buy Now - $59][buy]{:.btn.btn-primary} [^3]

{% include author.html author=site.data.authors.qwtel heading="Contact" heading_id="contact" %}

[^1]: Applies after the initial page load.  
[^2]: Actual page load speed depends on your hosting provider, resolution of embedded images and usage of 3rd party plugins.
[^3]: Transactions secured by [Stripe](https://stripe.com). Downloads handled by [Simple Goods](https://simplegoods.co/).
[^4]: Only available when serving site over HTTPS, and in browsers that support Service Workers (currently Chrome and Firefox, but more to come. You can track progress [here](http://caniuse.com/#feat=serviceworkers)).

[blog]: blog.md
[portfolio]: projects.md
[resume]: resume.md
[download]: download.md
[welcome]: index.md
[license]: LICENSE.md
[pro]: licenses/PRO.md
[docs]: docs/7.0.0-beta.3/index.md

[y-drawer]: https://qwtel.com/y-drawer/
[y-push-state]: https://qwtel.com/y-push-state/

[github]: https://github.com/qwtel/hydejack/releases
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack
[buy]: https://app.simplegoods.co/i/AQTTVBOE

[gpss]: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fqwtel.com%2Fhydejack%2F
