---
layout: page
title: Installation
redirect_from:
  - /docs/latest/installation/
  - /docs/installation/
---

There are multiple ways of installing Hydejack.
The easiest is [via the Ruby gem](#via-gem).
If you downloaded the zip, you'll want to install [via the zip file](#via-zip).
If you know what you are doing, you can [fork or clone the git repository](#via-git).

Buyers of the PRO version should [follow these steps](#pro-version).

**NOTE**: If you've used any version of Hydejack before,
also check out the [Migration]{:.heading data-flip="title"} guide.
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Setup
### Via gem
Installation via the gem-based theme has the advantage of not cluttering your blog repository,
so it is especially recommended for beginners.

If you haven't already, create a new Jekyll site first:

~~~bash
$ jekyll new <PATH>
~~~

Your blog directory should look something like this

~~~
├── _posts
│   └── 2017-04-07-welcome-to-jekyll.markdown
├── _config.yml
├── about.md
├── Gemfile
├── Gemfile.lock
└── index.md
~~~

Next, you'll want to add `jekyll-theme-hydejack` as a dependency by adding the following line to the `Gemfile`.

~~~ruby
gem "jekyll-theme-hydejack"
~~~

Now you want to edit the `_config.yml` of your Jekyll site and set Hydejack as the theme.
Look for the `theme` key (or add it when missing) and set its value to `jekyll-theme-hydejack`.

~~~
theme: jekyll-theme-hydejack
~~~

For more information on gem-based themes, see the [Jekyll Documentation](http://jekyllrb.com/docs/themes/).

You can now continue with [running locally](#running-locally).

### Via zip
If you downloaded the zip, the folder structure will look something like:

~~~
├── _data
├── _featured_categories
├── _featured_tags
├── _includes
│   ├── scripts
│   └── styles
├── _js
│   ├── lib
│   └── src
├── _layouts
├── _posts
├── _sass
│   ├── hydejack
│   └── pooleparty
├── assets
│   ├── css
│   ├── icomoon
│   ├── img
│   └── js
├── _config.yml
├── 404.md
├── about.md
├── index.html
└── posts.md
~~~

You can now continue with [running locally](#running-locally).

### Via git
If you are familiar with using git, you can add the [Hydejack repository](https://github.com/qwtel/hydejack)
as a remote, and merge its master branch into your working branch.

~~~bash
$ git remote add hydejack git@github.com:qwtel/hydejack.git
$ git pull hydejack master
~~~

You can also update Hydejack this way. The master branch will not contain work in progress,
but will contain major (breaking) changes. This approach is recommended if you intend to heavily customize Hydejack.

You can now continue with [running locally](#running-locally).

### PRO Version
If you bought the PRO version, you've received a zip archive with the following contents:

~~~
├── hydejack-docs-6.6.1.pdf
├── install
├── upgrade
├── favicons.psd
└── sidebar-bg.psd
~~~

`hydejack-docs-6.6.1.pdf`
: This documentation in PDF form.

`install`
: Contains all files and folders needed to create a new blog.

`upgrade`
: Contains only the files and folders needed for upgrading form an earlier version of Hydejack (6.0.0 or above).
  See the [migration guide][v6to6] for more.

`favicon.psd`
: A Photoshop template to help with generating the favicon, apple touch icon, etc.

`sidebar-bg.psd`
: A Photoshop template for blurred sidebar backgrounds.

Unzip the archive somewhere on your machine, then `cd` *into* the `install` folder, e.g.

~~~bash
$ cd ~/Downloads/hydejack-pro-6.6.1/install/
~~~

You can now continue with [running locally](#running-locally).

## Running locally
Make sure you've `cd`ed into the directory where `_config.yml` is located.

~~~bash
$ cd <path/to/hydejack>/
~~~

Before running for the first time, dependencies need to be fetched from [RubyGems](https://rubygems.org/):

~~~bash
$ bundle install
~~~

**NOTE**: If you are missing the `bundle` command, you can install Bundler by running `gem install bundler`.
{:.message}

Now you can run Jekyll on your local machine:

~~~bash
$ bundle exec jekyll serve
~~~

You can now point your browser to <http://localhost:4000> and see Hydejack in action.


Continue with [Configuration](configuration.md){:.heading data-flip="title"}
{:.read-more}


[migration]: migration.md
[v5to6]: migration.md#from-hydejack-v5
[v6to6]: migration.md#from-hydejack-v6
