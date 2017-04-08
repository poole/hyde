---
layout: page
title: Advanced
---

[TODO]

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

<!-- ## Advanced -->
## Adding a custom social media icon
Hydejack includes a number of social media icons by default (in fact, everything that is provided by [IcoMoon](https://icomoon.io/)), but since the landscape is always changing, it is likely that a platform that is important to you will be missing at some point.

**NOTE**: You can add any platform by simply providing an URL (just make sure it contains `//`). However, a fallback icon <span class="icon-link"></span> will be used instead of the platform's icon.
{:.message}

### Creating the icon font
In order to add a custom social media icon you have to use the [IcoMoon App](https://icomoon.io/app/) (free) to create a custom icon webfont. However, it is important that the generated font include all icons already in use by Hydejack. For this purpose, find the `selection.json` at [`assets/icomoon/selection.json`](https://github.com/qwtel/hydejack/blob/master/assets/icomoon/selection.json) and upload it to the app via "Import Icons".
Then, use the app to add your icon(s).
Consult the [IcoMoon docs](https://icomoon.io/#docs) for additional help.

Once you've created and downloaded the icon font form IconMoon, replace the `icomoon` folder in `assets` in it's entirety. Keep in mind that future updates of Hydejack will override this folder.

### Adding the platform's metadata
This recommended, but not strictly necessary, to add the network's metadata to `_data/social.yml`.
Create a new entry like

    deviantart:
      name: DeviantArt
      icon: icon-deviantart
      prepend: "https://"
      append: ".deviantart.com"


[TODO]


## Building the JavaScript
**NOTE**: In order to build the JavaScript you need to have [node.js](https://nodejs.org/en/) installed. Specifically, the `npm` command needs to be available, which is part of node.js.
{:.message}

When building for the first time (and after each update of Hydejack) you have to run

    $ npm install

This will fetch all dependencies (and put them in a local folder called `node_modules`), lint the code and write the bundled and minified script into `assets/js/hydejack.js`.

Subsequent builds are administered via

    $ npm run build

If you want to actively develop the scripts, it is better to run

    $ npm run dev

which will build a non-minified, non-transpiled (ES6) version of `hydejack.js` after every filechange.

## Adding a custom FLIP animation

[TODO]

*[FLIP]: First Last Invert Play
