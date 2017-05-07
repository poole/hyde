---
layout: page
title: Build
image: 'https://qwtel.com/hydejack/assets/img/doc.jpg'
color: '#8e5c75'
redirect_from: /docs/latest/deployment/
---

Hydejack supports building locally and on GitHub pages. However, when building on GitHub Pages, providing better related posts via the LSI is not available.

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Building locally
When building Hydejack it is important to set the environment variable `JEKYLL_ENV` to `production`.
Otherwise the output will not be minified. Building itself happens via Jekyll's `build` command.

    $ JEKYLL_ENV=production bundle exec jekyll build

This will generate the finished static files in `_site` which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

### With latent semantic analysis
By default, related posts are simply the most recent posts.
Hydejack modifies this a bit, by showing the most recent posts of the same category/tag.
However, the results are still pretty "unrelated".
To provide better results, Jekyll supports [latent semantic analysis](https://en.wikipedia.org/wiki/Latent_semantic_analysis) via [`classifier-reborn`](http://www.classifier-reborn.com/)'s [Latent Semantic Indexer](http://www.classifier-reborn.com/lsi) (LSI).

To use the LSI, you first have to disable Hydejack's default behaviour, by setting `use_lsi: true` in `_config.yml`

    use_lsi: true

Then, you have to run `jekyll build` with the `--lsi` flag:

    $ JEKYLL_ENV=production bundle exec jekyll build --lsi

This will generate the finished static files in `_site` which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

## Building on GitHub Pages
If you are using the "PRO" version of Hydejack, this method is discouraged because it will publish the source code on GitHub 😢
{:.message}

GitHub Pages offers the possibility to upload your site's Jekyll source directly. Then, GitHub will run the build process in the cloud, provided you site only uses [certain plugins](https://pages.github.com/versions/). Hydejack supports GitHub Pages out of the box.

However, when using this method, the LSI is not available (see above), so make sure `use_lsi` is set to `false` in `_config.yml`.

    use_lsi: false

Builds on GitHub run in the `production` environment, so no further steps are necessary. For the deployment process, see [Jekyll's documentation on GitHub Pages](https://jekyllrb.com/docs/github-pages/) as well as [GitHub Help](https://help.github.com/categories/github-pages-basics/).

***

Continue with [Advanced]({{ site.baseurl }}{% link docs/6.0.0/advanced.md %}){:data-flip="title"} »
{:.faded.heading}

[deploy]: https://jekyllrb.com/docs/deployment-methods/

*[LSI]: Latent Semantic Indexer
