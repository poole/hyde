---
layout: page
title: Documentation
menu: true
order: 5
---

<!-- Hydejack is a complete, interactive, configureable, responsive, reactive[^r], mobile-first, touch-enabled, animated, [jankfree], printable, tab-able, fast[^1], search engine-friendly and robust [Jekyll](http://jekyllrb.com/) theme that feels like a modern web app, while preserving what is great about *web pages*: Working URLs, hyperlinks, a working back button, a working refresh button and less than 50MB of JavaScript[^2] (tongue-in-cheek).

It can be hosted on GitHub Pages, where it has support for categories and tags, math blocks via KaTeX,
opt-in comments via Disqus, multiple authors [enumerate more features] and that's just the free version[^3].

The site works all the way down to IE10; IE9 if you don't need fancy animations, and IE5 if you don't need fancy anything.
Rumor has it, you can even view it via [`lynx`](http://lynx.browser.org/). -->

**NOTE**: Hydejack is a Jekyll theme. As a user of Jekyll, it is assumed that yo are comfortable with editing text files and running shell commands.
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Installation

There are multiple ways of installing Hydejack.
The easiest is [via the Ruby gem](#via-gem-based-theme).
If you bought the "PRO" version of Hydejack or downloaded the .zip, you'll want to install [via the .zip file](#via-zip).
If you know what you are doing, you can [fork or clone the git repository](#via-git).

### Via gem-based theme
Installation via the gem-based theme has the advantage of not cluttering your blog repository, so it is especially recommended for beginners.

If you haven't already, create a new Jekyll site first:

    jekyll new <PATH>

Your blog directory should look something like this

~~~
├── Gemfile
├── Gemfile.lock
├── _config.yml
├── _posts
│   └── 2016-12-04-welcome-to-jekyll.markdown
├── about.md
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

A

***

For more information on gem-based theme, see the [Jekyll Documentation](http://jekyllrb.com/docs/themes/).


### Via .zip
### Via git

## Configuration
### Change the color and image
### Change the Google Fonts
### Add an author
### Add social media icons
### Enable comments
### Enable Google Analytics

## Basics
### Write a post
### Add a category
### Add a tag
### Add a page
### Add an about page
### Add a welcome page*
### Add a project*
### Add my resume*

## Markdown
This section features non-standard markdown features of Hydejack. Don't worry, we are merely adding CSS classes via the standard `{:.my-class}` syntax, so that your posts remain compatible with other kramdown processors.

For an introduction to markdown, there are better guides elsewhere. For example [kramdown Syntax](https://kramdown.gettalong.org/syntax.html) or [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).

### Add a "message"
You can add a message box by adding the `message` class to a paragraph.
{:.message}

Markdown:
~~~markdown
You can add a message box by adding the `message` class to a paragraph.
{:.message}
~~~


### Add large text
You can add large, or "leading" text by adding the `lead` class to the paragraph.
{:.lead}

Markdown:
~~~markdown
You can add large, or "leading" text by adding the `lead` class to the paragraph.
{:.lead}
~~~

### Add a large image
You can make an image to span the full width by adding the `lead` class.

![Alt Text](https://placehold.it/864x100){:.lead}

Markdown:
~~~markdown
![Alt Text](https://placehold.it/864x100){:.lead}
~~~

### Add a large quote
You can make a quote "pop out" by adding the `lead` class.

> You can make a quote "pop out"
{:.lead}

Markdown:
~~~markdown
> You can make a quote "pop out"
{:.lead}

~~~

<!-- ### Add a figure with caption
<figure>
  <img src="https://placehold.it/400x200" />
  <figcaption>My caption</figcaption>
</figure> -->

### Add math block
### Add a code snippet

## Migrating
### From other Jekyll theme
### From Hydejack v5
### From free to "PRO" version*

## Advanced
### Adding a custom social media icon
### Building the JavaScript

[jankfree]: http://jankfree.org/

[^1]: Perceived speed: Latency hidden through complex pre-fetching logic and animations. Load speed: Inlining styles and removing other requests from the critical rendering path.
[^r]: Uses `RxJS` internally.
[^2]: In fact, all of Hydejack's JS is optional and not part of the critical rendering path.
[^3]: The "PRO" version offers what you would need for a professional web presence: A [projects page]({{ site.baseurl }}/projects/) with [detail view]({{ site.baseurl }}/projects/hydejack-v6), a [welcome page]({{ site.baseurl }}/welcome) that highlights your favorite projects and posts, and a [resume]({{ site.baseurl }}/resume).
