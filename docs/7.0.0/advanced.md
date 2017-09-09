---
layout: page
title: Advanced
redirect_from:
  - /docs/latest/advanced/
  - /docs/advanced/
---

## Table of Contents
{:.no_toc}
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Adding a custom social media icon
Hydejack includes a number of social media icons by default (in fact, everything that is provided by [IcoMoon](https://icomoon.io/)), but since the landscape is always changing, it is likely that a platform that is important to you will be missing at some point.

**NOTE**: You can add any platform by simply providing a complete URL. However, a fallback icon <span class="icon-link"></span> will be used.
{:.message}

### Creating the icon font
In order to add a custom social media icon you have to use the [IcoMoon App](https://icomoon.io/app/) (free) to create a custom icon webfont. However, it is important that the generated font include all icons already in use by Hydejack. For this purpose, find the `selection.json` in [`assets/icomoon/selection.json`](https://github.com/qwtel/hydejack/blob/v6/assets/icomoon/selection.json) and upload it to the app via "Import Icons".
Then, use the app to add your icon(s).
Consult the [IcoMoon docs](https://icomoon.io/#docs) for additional help.

Once you've created and downloaded the icon font form IconMoon, replace the `icomoon` folder in `assets` in its entirety. Keep in mind that future updates of Hydejack will override this folder.

### Adding the platform's metadata
For the second step it is necessary to add the network's metadata to `_data/social.yml`.
An entry looks like:

~~~yml
deviantart:
  name: DeviantArt
  icon: icon-deviantart
  prepend: "https://"
  append: ".deviantart.com"
~~~

`name`
: The name of the network. Used for for the title attribute and screen readers.

`icon`
: The icon CSS class. Can be chosen during the IcoMoon creation process.

`prepend`
: Optional. A string that is prepended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `https://`

`append`
: Optional. A string that is appended to the username to form the link to the profile. If the final URL should be `https://<username>.deviantart.com`, this would be `.deviantart.com`.

## Building the JavaScript
**NOTE**: In order to build the JavaScript you need to have [node.js](https://nodejs.org/en/) installed. Specifically, the `npm` command needs to be available, which is part of node.js.
{:.message}

Before you start, make sure you've copied the following files:
* `_js/`
* `package.json`
* `.babelrc`
* `.eslintignore`
* `.eslintrc`

When building for the first time (and after each update of Hydejack) you have to run

~~~bash
$ npm install
~~~

This will fetch all dependencies (and put them in a local folder called `node_modules`), lint the code and write the bundled and minified script into `assets/js/hydejack.js`.

Subsequent builds are administered via

~~~bash
$ npm run build
~~~

If you want to actively develop the scripts, it is better to run

~~~bash
$ npm run watch:js
~~~

which will build a non-minified, non-transpiled (ES2016) version of `hydejack.js` after each filechange.

## How CSS works in Hydejack
Hydejack takes a quite unique, and admittedly weird, approach to CSS.
The goal is to inline essential rules in a `style` tag in the `<head/>` of the page,
(to increase the loading speed of the page) while serving the rest in a separate file.

~~~
├── hydejack
│   ├── __inline
│   ├── __link
│   ├── _base.scss
│   ├── ...
│   └── _social.scss
├── pooleparty
│   ├── __inline
│   ├── __link
│   ├── _base.scss
│   ├── ...
│   └── _type.scss
├── mixins.scss
├── my-inline.scss
├── my-style.scss
├── syntax.scss
└── variables.scss
~~~

The styles are written in SCSS and are located in the `_sass` folder.
They are organized alongside components (or rather, topics) like "sidebar" and "footer".
Further, there are two separate frameworks, "pooleparty" and "hydejack",
which grew out of the original [Poole](http://getpoole.com/) and Hyde styles.
Poole(-party) contains more general style rules, while Hyde(-jack) contains those that are specific to the theme.
However, this separation has become more blurry over time.

### Splitting the CSS
Further, you will notice `__inline` and `__link` folders.
The unfriendly names are chosen intentionally, because the contents are generated and shouldn't be modified directly.
They are marked up with special comments like `// inline` and `// link`
which tell a simple script to how to "split" the source file into.

TODO

To split the CSS once, run

~~~bash
$ npm run build:css
~~~

To rebuild on file changes, use

~~~bash
$ npm run watch:css
~~~

**NOTE**: You can use `npm run dev` to start an entire development environment,
which will run `jekyll` at port 4000 and watch for CSS and JS changes.
{:.message}


*[FLIP]: First Last Invert Play
