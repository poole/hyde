---
title: Service Release 8.5
image: /assets/img/blog/louis-hansel.jpg
description: >
  Service release 8.5 includes a number of obvious improvements made possible by changes in the way the web works.
---

Service release 8.5 includes a number of obvious improvements made possible by changes in the way the web works.

## Better Dark Mode
This service release includes a major improvement to dark mode, which is now matching the operating system's default. This is already possible in Safari, and just this week a new version of Chrome shipped with this feature as well.

## Better Cover Pages
Scrolling on a cover page will now close the drawer. This makes the cover page much more useable since it will no longer confuse to new visitors. This is especially true for desktops, where swiping horizontally isn't a typical interaction pattern.
A future version of Hydejack could link the extension of the drawer the the scroll position, similar to how many marketing sites work these days.

## Better Font Loading
The awkward JS-based font loading mechanism is gone and now replaced by `font-display: swap`. Support for this in Google Fonts landed earlier this year and is now used by Hydejack. As a side effect, fonts are now properly displayed in IE11 again, greatly improving backwards compatibility of the theme.

There are many more smaller changes and bugfixes. As always, yo can read the full patch notes in the [CHANGELOG](../../CHANGELOG.md){:.heading.flip-title}.

## What's Next?
8.6 will include a rewrite of the drawer, dynamic page loading, and image lazy-loading components. These are new written with TypeScript and [LitElement](https://lit-element.polymer-project.org) for better code quality, browser integration, and future-proofness. The rewrites also include many bug fixes and performance improvements.

While I would also like to do a v9 (and accompanying price hike), most of the work I've done on it is now on the 8.5 and 8.6 tracks. 
