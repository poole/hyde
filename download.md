---
layout: page
title: Download
menu: true
order: 7
---

There are two versions of Hydejack: The Free Version includes basic blogging functionality,
as did previous versions of the theme.
The new PRO Version includes additional features for professionals:
A [portfolio], a [resume] layout and a [welcome] page to feature your favorite projects and posts.

This table details what is and isn't included in each respective version.


| Version                          | Free               | PRO                |
|:---------------------------------|:------------------:|:------------------:|
| Blog                             | &#x2714;           | &#x2714;           |
| Features (see below)             | &#x2714;           | &#x2714;           |
| [Portfolio] Layout               |                    | &#x2714;           |
| [Resume] Layout                  |                    | &#x2714;           |
| [Welcome] Layout                 |                    | &#x2714;           |
|----------------------------------|--------------------|--------------------|
| License                          | [MIT][license]     | [PRO]              |
| Price                            | Free               | $29                |
|==================================|====================|====================|
| | [**Download on GitHub**][download]<br/> -- or -- <br/>[**Use the RubyGem**][gem] | [Buy Now – $29][buy]{:.simple-goods-btn style="background-color:#4f86aa!important"} [^3] |
{:.scroll-table-small}


{% comment %}
| Free Version | PRO Version | Developer Version |
|:-:|:-:|:-:|
| Blog Layout | Blog Layout | Blog Layout |
| Features (see blow) | Features (see below) | Features (see below) |
|  | Portfolio Layout | Portfolio Layout |
|  | Resume Layout | Resume Layout |
|  | Welcome Layout | Welcome Layout |
|  |  | [y-drawer] Developer License |
|  |  | [y-push-state] Developer License |
|---
| [GPL-3.0]-licensed | [PRO License][pro] | [DEV License][dev] |
| Free | $34 | $99 |
|====
| [**Download on GitHub**][download]<br/> -- or -- <br/>[**Use the RubyGem**][gem] | [Buy Now – $34][buy]{:.simple-goods-btn style="background-color:#4f86aa!important"} [^3] | [Buy Now – $99][buy]{:.simple-goods-btn style="background-color:#4f86aa!important"} [^3] |
{:style="table-layout:fixed"}
{% endcomment %}

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
The Free Version features the design and tech of Hydejack, but only supports basic blogging.

**[Download on GitHub][download]** -- or -- **[Use the RubyGem][gem]**

## PRO Version
The PRO Version aims to be the complete package for professionals on the web.
It includes layouts for your [portfolio], your [resume] (with support for [JSON Resume](https://jsonresume.org/)) and
a [welcome] page to introduce yourself to visitors.

[Buy Now - $34][buy]{:.simple-goods-btn style="background-color:#4f86aa!important"} [^3]

{% comment %}
## DEV Version
Buy this version if you are a developer yourself and intend to use the drawer menu and push state implementation in a different product.
You can obtain licenses for these production independently.


[Buy Now - $99][buy]{:.simple-goods-btn style="background-color:#4f86aa!important"} [^3]
{% endcomment %}

{% include author.html author=site.data.authors.qwtel heading="Contact" %}

<style>
a.simple-goods-btn{text-decoration:none !important}.simple-goods-btn{-moz-box-sizing:border-box !important;-moz-transition:all 0.2s ease !important;-moz-transition:all 0.2s ease !important;-ms-transition:all 0.2s ease !important;-ms-transition:all 0.2s ease !important;-o-transition:all 0.2s ease !important;-o-transition:all 0.2s ease !important;-webkit-box-sizing:border-box !important;-webkit-font-smoothing:subpixel-antialiased !important;-webkit-transition:all 0.2s ease !important;-webkit-transition:all 0.2s ease !important;background-color:#2a90ee !important;border-radius:3px 3px 3px 3px !important;box-sizing:border-box !important;color:#fff !important;cursor:pointer !important;display:inline-block !important;font-size:16px !important;font-weight:400 !important;margin:0 !important;padding:12px 34px 12px !important;position:relative !important;text-align:center !important;top:0 !important;transition:all 0.2s ease !important;font-family:"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif !important;font-weight:bold !important}.simple-goods-btn:hover{-webkit-transition:all 0.2s ease !important;transition:all 0.2s ease !important;background-color:#429cf0 !important}.simple-goods-btn:active{background-color:#2680d4 !important;outline:0 !important}
</style>

[^1]: Applies after the initial page load.  
[^2]: Actual page load speed depends on your hosting provider, resolution of embedded images and usage of 3rd party plugins.
[^3]: Transactions secured by [Stripe](https://stripe.com). Downloads handled by [Simple Goods](https://simplegoods.co/).

[blog]: blog.md
[portfolio]: projects.md
[resume]: resume.md
[welcome]: index.md
[license]: LICENSE.md
[pro]: licenses/PRO-license.md
[docs]: docs/6.4.1/index.md

[y-drawer]: https://qwtel.com/y-drawer/
[y-push-state]: https://qwtel.com/y-push-state/

[download]: https://github.com/qwtel/hydejack/releases/tag/v6.4.1
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack/versions/6.4.1
[buy]: https://app.simplegoods.co/i/AQTTVBOE

[gpss]: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fqwtel.com%2Fhydejack%2F
