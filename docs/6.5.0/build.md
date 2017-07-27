---
layout: page
title: Build
redirect_from:
  - /docs/latest/build/
  - /docs/build/
---

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Building locally
When building Hydejack it is important to set the environment variable `JEKYLL_ENV` to `production`.
Otherwise the output will not be minified. Building itself happens via Jekyll's `build` command.

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build
~~~

This will generate the finished static files in `_site`,
which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

### GitHub Pages
To deploy to GitHub Pages, the steps are:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build
$ cd _site
$ git init # you only need to do this once
$ git remote add origin <github_remote_url> # you only need to do this once
$ git add .
$ git commit -m "Build"
$ git push origin master:<remote_branch>
$ cd ..
~~~

`github_remote_url`
: Find this on your repository's GitHub page.

`remote_branch`
: Either `master` for "user or organization pages", or `gh-pages` for "project pages"

More on [user, organization, and project pages](https://help.github.com/articles/user-organization-and-project-pages/).

## Building locally with latent semantic analysis
By default, related posts are simply the most recent posts.
Hydejack modifies this a bit, by showing the most recent posts of the same category or tag.
However, the results are still pretty "unrelated".
To provide better results, Jekyll supports [latent semantic analysis][lsa] via [`classifier-reborn`][crb]'s
[Latent Semantic Indexer][lsi]

To use the LSI, you first have to disable Hydejack's default behaviour, by setting `use_lsi: true` in `_config.yml`

    use_lsi: true

Then, you have to run `jekyll build` with the `--lsi` flag:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build --lsi
~~~

This will generate the finished static files in `_site`,
which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].

### GitHub Pages
To deploy to GitHub Pages, the steps are:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build --lsi
$ cd _site
$ git init # you only need to do this once
$ git remote add origin <github_remote_url> # you only need to do this once
$ git add .
$ git commit -m "Build"
$ git push origin master:<remote_branch>
$ cd ..
~~~

`github_remote_url`
: Find this on your repository's GitHub page.

`remote_branch`
: Either `master` for "user or organization pages", or `gh-pages` for "project pages"

More on [user, organization, and project pages](https://help.github.com/articles/user-organization-and-project-pages/).


Continue with [Advanced](advanced.md){:.heading data-flip="title"}
{:.read-more}

[deploy]: https://jekyllrb.com/docs/deployment-methods/
[lsa]: https://en.wikipedia.org/wiki/Latent_semantic_analysis
[crb]: http://www.classifier-reborn.com/
[lsi]: http://www.classifier-reborn.com/lsi

*[LSI]: Latent Semantic Indexer
