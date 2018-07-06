---
layout: page
title: Advanced
description: >
  This chapter covers advanced topics, such as offline support and custom JS builds. Codings skills are recommended.
redirect_from:
  - /docs/latest/advanced/
  - /docs/advanced/
---

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## Enabling offline support
Hydejack v8 introduces "cache as you go" offline support. This is implemented via the Service Worker API, a new browser standard that is now supported in the latest versions of all major browsers! However, it is a very powerful feature and should be used with a lot of care.

Hydejack's custom service worker implementation stores files for offline use on three different levels:

Shell
: The shell files are the core Hydejack files (CSS, JS) that only change between version updates.
  If you made changes to these after enabling offline support you can force an update by bumping the `cache_version`.

Assets
: **These are presumed to be immutable!** In other words, every file is cached indefinitely. If you want to update an image after enabling offline support, add the image to `assets` with a different name and change the link in the content! Alternatively, you can bump the `cache_version`, but this will remove all the other cached files from the asset cache.

Content
: The content cache exploits the fact that content can't change between builds, so that it can be stored for offline use until you upload a new build. For now, the entire content cache is discarded every time you publish a new post (future versions could cache them based on last modified dates, but that has)

Other things to note are that the implementation will always cache the pages listed under `legal`, as well as the `404.html` page, which will be shown when the user is offline. TODO: Use dedicated offline page.

***

To enable offline support in Hydejack do the following stepts:

Because Service Workers are so powerful, they are only enabled on sites that are served over HTTPS.
Unless your site is already served this way, enabling HTTPS is the first step.

Create a `sw.js` file in the root of your project and add the following content:

```js
---
---
importScripts("{\{ '/assets/js/sw.js' | relative_url }\}?t={\{ site.time | date_to_xmlschema }\}");
```

**NOTE**: You have to remove the `\` after each `{` and before each `}`!
This is to prevent Jekyll from processing the line!
{:.message}

This will load the main service worker code from your assets folder. The `site.time` part is necessary to make the service worker "byte different" to trigger a reload every time you make a new build of your site.

In your `config.yml` under the `hydejack` key, add the following:

```yml
hydejack:
  offline:
    enabled: true
    cache_version: 1
```

***

Just to be save, the current implementation will not cache resources from other domains. If you link to an image that is hosted on another domain and you would like it to be available offline, add the `sw-cache` query parameter to the URL, e.g. `https://upload.wikimedia.org/wikipedia/commons/b/b1/57_Chevy_210.jpg?sw-cache`.

Note that images stored in this way will not be updated, even if the version on the remote server changes!


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
In order to build the JavaScript you need to have [node.js](https://nodejs.org/en/) installed. Specifically, the `npm` command needs to be available, which is part of node.js.

**NOTE**: Building the JavaScript is optional! Hydejack comes with a pre-built, minified `hydejack.js` file
that you can find in part of the theme's `assets`.
{:.message}

Before you start, make sure you've copied the following files:
* `_js/`
* `package.json`
* `package-lock.json`
* `.babelrc`
* `.eslintignore`
* `.eslintrc`

When building for the first time (and after each update of Hydejack) you have to run

~~~bash
$ npm install
~~~

to fetch all dependencies (and put them in a local folder `node_modules`), lint the code and write the bundled and minified script into `assets/js/hydejack.js`.

You can re-build it with

~~~bash
$ npm run build:js
~~~

If you want to actively develop the scripts, it is better to run

~~~bash
$ npm run watch:js
~~~

which will build a non-minified version of `assets/js/hydejack.js` after each filechange.


*[FLIP]: First Last Invert Play
