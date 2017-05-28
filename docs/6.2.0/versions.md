---
layout: page
title: Versions
redirect_from: /docs/latest/versions/
---

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## v6.1.1
May 23 2017
{:.heading.post-date}

* Add support for `lang` in front matter and `_config.yml`.
* Add support for `keywords` in front matter and `_config.yml`.

## v6.1.0
May 15 2017
{:.heading.post-date}

* Updated JS dependencies
* Added version history and licenses to documentation
* Fixed print layout

## v6.0.0 (JavaScripten)
May 3 2017
{:.heading.post-date}

Hydejack has always featured a JavaScript-heavy sidebar, but other than that, JS has been used sparingly. This changes with this release, which adds a ton of (optional) code that changes the feel of the theme dramatically.

### Major
Pages are now loaded and swapped through JavaScript. This has a number of effects. First of all, it looks cool, but the animations aren't just about aesthetics: They also help to hide the network time of fetching the next page, making the entire site feel faster. At the same time, the FOUC introduced in the last release will no longer occur (except on the initial page load).

* Most JS is now unified in the `_js` directory and written in ES2016.
* The `blog-by-tag` layout has been renamed to `list`.
* `public` folder has been renamed to `assets` to make the theme compatible with Jekyll's gem-based themes.
* Tags are now supported via Jekyll Collections instead of `_data`.
* The sidebar can now add links to all kinds of pages.
* Categories are now supported.
* Author information moved to `_data/authors.yml`
* Added support for multiple authors.
* Using `jekyll-feed` plugin (supported on GitHub Pages) instead of custom solution.
* Added `about` layout.
* Added `not-found` layout.
* Added `redirect` layout

See the [the migration guide]({{ site.baseurl }}{% link docs/6.2.0/migration.md %}) for instructions on how to upgrade.

### Minor
* The "accent" font (heading font) is now used for all headings. This gives the theme a "bolder" look and was necessary for the animation: link => heading.
* Changed default text font from "PT Serif" to "Noto Serif".
* Added [CSS classes]({{ site.baseurl }}{% link docs/6.2.0/writing.md %}) for styling markdown content.
* Links have a new style. They now always display an underline to make the choice of the link color less critical (darker colors were hard to distinguish from regular text).
* Made social media icons larger and easier to tap.
* Social media icons are now also part of the "about" sections of a post.
* Added support for a copyright notice at the bottom. Can be set via the config variable `copyright`.
* Changed responsive breakpoints and added support for very large displays.
* The site is now printable.
* The `blog` layout now only shows the excerpt instead of the full post.
* Links to external pages are now marked with a symbol.
* Added margin above social media icons to prevent accidental tapping
* Added gem files so that `bundle install` and `bundle exec jekyll serve` work
* Disabled HTML minification when running via `jekyll serve`
* Added dingbat to signal end of post

### Fixes
* Related posts is no longer blank for posts that do not belong to a category.
* Footnotes now use the text version of "leftwards arrow with hook" instead of the emoji on iOS.
* Text is no longer invisible while waiting for Google Fonts to load.
* Always show scrollbar to prevent layout "jumps"

## v5.3.0
Oct 1 2016
{:.heading.post-date}

a11y improvements
- Use HTML5 semantics tags + roles
- Don't set `maximum-scale=1`
- Fix bug with `sr-only` class

Math support improvements
- LaTeX syntax errors will no longer prevent correct math blocks from being rendered
- LaTeX syntax errors logged to console

## v5.2.0
Sep 29 2016
{:.heading.post-date}

Prevent structural FOUC

## v5.1.0
Sep 28 2016
{:.heading.post-date}

Cross-browser compatibility improvements:
- Added features tests
- Fixed layout in IE 10 and 11
- Disabled stylesheets and JS in IE 9 and below.

## v5.0.0 (The Fast One)
Sep 16 2016
{:.heading.post-date}

This major release increases page load speed dramatically. The page now scores roughly 90/100 on [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fqwtel.com%2Fhydejack%2F) (up from ~50) and has a high score on similar tools.

Most importantly, the critical rendering path is no longer blocked by loading styles or scripts, meaning the site becomes visible faster.

Page load speed matters to Google, but is also _very_ apparent to visitors with slow internet connections.

However, as a side effect of these optimizations, the site now has a visible [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).
Future versions might address this, but it is the currency in which loading speed is being payed for and can not be fully avoided.

### Major
- HTML, CSS and JS served minified.
- JS downloading starts only after the rest of the page is renderd.
- Critical CSS (above-the-fold) is inlined into the document, the rest is fetched later.

In order to minify the CSS and make it more modular it has been rewritten in SCSS.

### Minor
- Colored focus outline in page color
- Tabindex for tab navigation
- Social media icons easier tappable with finger

### Trivia
Not strictly part of the release, but the images have been blurred to increase text readability and help with loading speed as well (burred images get compressed by JPG much better).

## v4.0.1
Sep 11 2016
{:.heading.post-date}

Fix per-page color and image

## v4.0.0 (Social Media Impocalypse)
Aug 30 2016
{:.heading.post-date}

### Breaking
- Structure of `_config.yml` has changed
  - Social media usernames are now located under `author: social: <platform>: <username>`.
  - `disqus` is now a top-level entry (moved from `author`).
  - Now has `font`, `font_accent` and `google_fonts` fields that are mandatory.
- Now defaults to the `blog` layout, old style is available via `blog-by-tag` layout, see `archive.html`.

### New features
- Added _a lot_ of social media icons, configurable via `_config.yml`.
- New `blog` layout. Classic, paginated.
- Fonts are configurable via `_config.yml`.

### Design
- Link underlines are now fixed-sized for all font sizes (no thicker lines for headlines, etc)

### Fixes
- Correctly set the meta description field using either the `description` field or `post.excerpt` as a fallback (used to contain the unmodified markdown).
- Fixed various URL bugs relating to `site.baseurl`.

### Internal
- Refactoring, preventing code duplications, heavier usage of `includes`.

## v3.0.0 (Hydejack)
May 7 2016
{:.heading.post-date}

Hydejack is a pretentious two-column [Jekyll](http://jekyllrb.com) theme, stolen by [`@qwtel`](https://twitter.com/qwtel) from [Hyde](http://hyde.getpoole.com). You could say it was.. [hydejacked](http://media3.giphy.com/media/makedRIckZBW8/giphy.gif).

### Features
Unlike Hyde, it's very opinionated about how you are going to use it.

Features include:
* Touch-enabled sidebar / drawer for mobile, including fallback when JS is disabled.
* Github Pages compatible tag support based on [this post][tag].
* Customizable link color and sidebar image, per-site, per-tag and per-post.
* Optional author section at the bottom of each post.
* Optional comment section powered by Disqus.
* Layout for posts grouped by year
* Wide array of social media icons on sidebar.
* Math blocks via [KaTeX](https://khan.github.io/KaTeX/).

## v2.0.0 (Hyde)
Jan 2 2014
{:.heading.post-date}

## v1.0.0 (Hyde)
Oct 15 2013
{:.heading.post-date}
