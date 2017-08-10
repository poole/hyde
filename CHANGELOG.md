---
layout: page
title: CHANGELOG
redirect_from:
  - /docs/latest/versions/
  - /docs/versions/
---

## v6.6.1
Aug 10 2017
{:.heading.post-date}

* Fixed sending incorrect paths to Google Analytics.
  In previous versions, Hydejack would always send the URL of the initial page for all subsequent page views.
  Thanks [`@dannydwarren`](https://twitter.com/dannydwarren) for pointing this out.
* Fixed `tagline` not showing up in the title.

## v6.6.0
Aug 7 2017
{:.heading.post-date}

* Dependencies from external domains have been removed
  (with the exception of those that are explicitly defined and optional: Google Analytics, Google Fonts and Disqus).
  Instead, they are now located in the assets folder and managed via Bower.
* KaTeX is no longer loaded on pages that do not contain math blocks.
* `preload` link tags no longer use `onload`. Instead callbacks are registered within a script tag.
* Code in code blocks is no longer smaller sized than inline code.

## v6.5.0
Jul 27 2017
{:.heading.post-date}

This maintenance release includes various quality-of-life improvements when using the gem-based version of the theme.

### Added
* Hydejack now uses additional Jekyll plugins by default, which make working with GitHub more convenient.
  They have been added to the `Gemfile` and `_config.yml`.
  Note that existing users need to update their `_config.yml`:

  ~~~yml
  gems:
    - jekyll-default-layout # new
    - jekyll-feed
    - jekyll-optional-front-matter # new
    - jekyll-paginate
    - jekyll-redirect-from
    - jekyll-relative-links # new
    - jekyll-sitemap
  ~~~

* Added `licenses` folder that includes the full license texts of licenses mentioned in `NOTICE.md`.
* You can, once again, define the author in `_config.yml`.
  Using `_data/authors.yml` is still recommended (and takes precedence),
  but this option is more convenient when setting up a quick (project-) page using the gem-based theme.
  Also, a mini-version of `_data/social.yml` can be provided as part `_config.yml`, e.g.:

  ~~~yml
  author:
    social:
      github: https://github.com/qwtel/hydejack
      npm: https://www.npmjs.com/package/hydejack
      download: https://github.com/qwtel/hydejack/archive/v6.5.0.zip

  data_social:
    github:
      name: GitHub
      icon: icon-github
    npm:
      name: npm
      icon: icon-npm
    download:
      name: Download
      icon: icon-box-add
  ~~~

* A download icon has been added to the default icon font and `_data/social.yml` has been updated.
* Added `_includes/my-scripts.html`, `_sass/my-inline.scss` and `_sass/my-style.scss` to make it easier to add custom scripts and styles without modifying the source. This is especially handy when using the gem-based version of the theme.

### Changed
* Loading web fonts now starts earlier and content download no longer blocks
  swapping out the fallback font for the new font.
  Previously, a page containing lots of images could have delayed displaying the web fonts significantly.
* The `home` layout no longer contains a message suggesting that you don't use it.
* The `home` layout now shows up to 5 blog posts and up to 5 pages blow the regular content.
* The version history has been moved from `docs/<version>/versions.md` to `CHANGELOG.md`.
* The license notices have been moved from `docs/<version>/licenses.md` to `NOTICE.md`.
* Updated gem and npm dependencies

### Design
* The default font has been changed from "Noto Serif" to "Noto Sans".
  If you have a `font` entry in `_config.yml`, this will have no effect.
* `nap.jpg` is no longer used as default background image in the gem-based theme.
* The sidebar content width is now limited to the width of the sidebar (this only effects large screens).
* Project cards and pagination buttons now have slightly rounded borders for a less "rigid" look.

#### How to restore the old styles
If you would like to use the old font, add the following to `_config.yml`:

~~~yml
font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
font:         "'Noto Serif', Georgia, serif"
google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"
~~~

If you were relying on the default setting for the background image, add the following to `_config.yml`:

~~~yml
image: /hydejack/assets/img/nap.jpg
~~~

Note that you have to replace `/hydejack` with your `baseurl`.

To restore the old sidebar, open (or create) `_sass/my-inline.scss` and add the following:

~~~css
@media screen { .sidebar-sticky { left: 2rem; max-width: none; } }
~~~

To remove the border radius, open (or create) `_sass/my-inline.scss` and add the following:

~~~css
.card, .pagination-item { border-radius: 0!important; }
~~~

## v6.4.1
Jun 23 2017
{:.heading.post-date}

* Fix invalid color hex

## v6.4.0
Jun 21 2017
{:.heading.post-date}

In this release I've added a "Other Projects" section to the bottom of each project page,
making it easier for users to navigate through your collection and discover other projects.
Also, it's now possible to display larger (data-) tables that were previously cut off (especially on mobile devices).

For more on how to add tables, see the new section in [docs/writing][writing].

Smaller changes include a reduced usage of horizontal lines and a more "semantic" use of `hr` elements.
Specifically, the semantics of the resume layout have been improved.

### Minor
* Added "Other Projects" section to the bottom of the project layout (similar to "Related Posts")
* Added CSS classes that make viewing larger (data-) tables possible
* Added section on tables to [docs/writing][writing]
* Reduced use of `<hr/>` elements, using CSS borders instead.
* Improved semantic HTML of resume
* Follow favicon best practices and include example icons
* Added `no_google_fonts` option

### Design
* Reduced number of horizontal lines, making many layouts feel less "cluttered" (esp. `blog` layout)
* Made link hover styles consistent across the board
* Visually separated `thead` and `tbody` and `tfoot` within tables.
* Changed RSS and email icons
* Removed top margin for consecutive headings, e.g. when using `h3` immediately after `h2`.

### Fixes
* Fixed bug that caused inline math to be moved to the end of a paragraph when dynamically loading a page.
* Fixed bug that caused layout to break in IE11.
* Fixed bug that caused the project animation to "jump" when using long project titles.
* No more empty attributes on `img` tags.

## v6.3.0
Jun 6 2017
{:.heading.post-date}

This release makes including third party plugins easier.
Until now, the push state approach to loading new pages has been interfering with embedded `script` tags.
This version changes this by simulating the sequential loading of script tags on a fresh page load.

This approach should work in a majority of cases, but can still cause problems with scripts that can't be added more than once per page.
If an issue can't be resolved, there's now the option to disable push state by setting `disable_push_state: true` in `config.yml`.

### Minor
* Support embedding `script` tags in markdown content
* Add `disable_push_state` option to `_config.yml`
* Add `disable_drawer` option to `_config.yml`
* Rename syntax highlighting file to `syntax.scss`
* Added [chapter on third party scripts][scripts] to documentation

### Design
* Add subtle intro animation
* Rename "Check out X for more" to "See X for more" on welcome\* page
* Replace "»" with "→" in "read more"-type of links

### Fixes
* Fix default color in gem-based theme

## v6.2.0
May 29 2017
{:.heading.post-date}

* Changed default color and image
* Updated demo content
* Finalized welcome and project page
* Color is now fading correctly when no background image is provided
* Added exemplary usage of excerpt separator
* Removed social media links from `welcome` and `about` page
* Updated dependencies

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

See the [the migration guide][migration] for instructions on how to upgrade.

### Minor
* The "accent" font (heading font) is now used for all headings. This gives the theme a "bolder" look and was necessary for the animation: link => heading.
* Changed default text font from "PT Serif" to "Noto Serif".
* Added [CSS classes][writing] for styling markdown content.
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

[tag]: http://www.minddust.com/post/tags-and-categories-on-github-pages/
[migration]: docs/6.6.1/migration.md
[writing]: docs/6.6.1/writing.md
[scripts]: docs/6.6.1/scripts.md
