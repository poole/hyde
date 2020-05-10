---
layout: page
title: Install
description: >
  There are multiple ways of installing Hydejack.
  The easiest and cleanest way is via the Starter Kit.
  Alternatively, you can use the Ruby gem.
hide_description: true
---

There are multiple ways of installing Hydejack.
The easiest and cleanest way is [via the Starter Kit](#via-starter-kit).
Alternatively, you can use the [Ruby gem](#via-gem).
If you don't mind a cluttered source directory, you can use [the zip file](#via-zip).
Finally, If you know what you are doing, you can [fork the git repository](#via-git).

Buyers of the PRO version should [follow these steps](#pro-version).

0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## Via Starter Kit
Using the Starter Kit has the advantage of not cluttering your blog repository.
Additionally, it allows you to publish your site on GitHub Pages with a single `push`.

If you have a GitHub account, fork the [hy-starter-kit](https://github.com/hydecorp/hy-starter-kit) repository. Otherwise [download the source files][src] and unzip them somewhere on your machine.

**NOTE**: In addition to the docs here, you can follow the quick start guide in the Starter Kit.
{:.message}

`cd` into the directory where `_config.yml` is located and follow the steps in [Running locally](#running-locally).

Alternatively, you can just [![Deploy to Netlify][dtn]][nfy]{:.no-hover.no-mark}.

[src]: https://github.com/hydecorp/hy-starter-kit/archive/v9.0.0-alpha.4.zip
[nfy]: https://app.netlify.com/start/deploy?repository=https://github.com/hydecorp/hydejack-starter-kit
[dtn]: https://www.netlify.com/img/deploy/button.svg

## Via gem
Jekyll has [built-in support](https://jekyllrb.com/docs/themes/) for using themes that are hosted on RubyGems.  

If you haven't already, create a new Jekyll site first:

~~~bash
$ jekyll new <PATH>
~~~

Your site's root dir should look something like this

~~~
├── _posts
│   └── 2017-04-07-welcome-to-jekyll.markdown
├── _config.yml
├── about.md
├── Gemfile
├── Gemfile.lock
└── index.md
~~~

**NOTE**: Hydejack works with Jekyll's default `config.yml`, but it is recommended that you replace it with
[Hydejack's default config file](https://github.com/hydecorp/hydejack/blob/v8/_config.yml).
It contains the names of all config options known to Hydejack and provides sensible defaults (like minifying HTML and CSS in production builds).
{:.message}

Next, you'll want to add `jekyll-theme-hydejack` as a dependency by adding the following line to the `Gemfile`.

~~~ruby
gem "jekyll-theme-hydejack"
~~~

(You can also remove the old theme `jekyll-theme-minima` from the Gemfile)

Now you want to edit the `_config.yml` of your Jekyll site and set Hydejack as the theme.
Look for the `theme` key and set its value to `jekyll-theme-hydejack`.

~~~yml
theme: jekyll-theme-hydejack
~~~

For more information on gem-based themes, see the [Jekyll Documentation](http://jekyllrb.com/docs/themes/).

You can now continue with [running locally](#running-locally).

## Via zip
If you downloaded the [extended zip](https://github.com/hydecorp/hydejack/releases),
extract the contents somewhere on your machine.
The high-level folder structure will look something like.

~~~
├── _data
├── _featured_categories
├── _featured_tags
├── _includes
├── _js
├── _layouts
├── _posts
├── _sass
├── assets
├── _config.yml
├── 404.md
├── about.md
├── index.html
└── posts.md
~~~

`cd` into the directory where `_config.yml` is located and follow the steps in [Running locally](#running-locally).

## Via git
If you are familiar with using git, you can add the [Hydejack repository](https://github.com/hydecorp/hydejack)
as a remote, and merge its master branch into your working branch.

~~~bash
$ git remote add hydejack git@github.com:hydecorp/hydejack.git
$ git pull hydejack master
~~~

You can also update Hydejack this way. The master branch will not contain work in progress,
but will contain major (breaking) changes.
This approach is recommended if you intend to customize Hydejack.

You can now continue with [running locally](#running-locally).

## PRO Version
If you bought the PRO version, you've received a zip archive with the following contents:

~~~
├── install
├── upgrade
├── CHANGELOG.pdf
├── Documentation.pdf
├── NOTICE.pdf
├── PRO License.pdf
├── PRO–hy-drawer License.pdf
├── PRO–hy-img License.pdf
├── PRO–hy-push-state License.pdf
└── .ssh
~~~

`install`
: Contains all files and folders needed to create a new blog.

`upgrade`
: Contains only the files and folders needed for upgrading form an earlier version of Hydejack (6.0.0 or above). See [Upgrade]{:.heading.flip-title} for more.

For new installations only the `install` folder is relevant.
Unzip the archive somewhere on your machine, then `cd` *into* the `install` folder, e.g.

~~~bash
$ cd ~/Downloads/hydejack-pro-9.0.0-alpha.4/install/
~~~

You can now continue with [Running locally](#running-locally).


## Running locally
Make sure you've `cd`ed into the directory where `_config.yml` is located.
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

and point your browser to <http://localhost:4000> to see Hydejack in action.


Continue with [Config](config.md){:.heading.flip-title}
{:.read-more}


[upgrade]: upgrade.md
