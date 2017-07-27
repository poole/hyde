---
layout: page
title: Scripts
redirect_from:
  - /docs/latest/scripts/
  - /docs/scripts/
---

There are two ways of adding third party scripts.
[Embedding](#embedding) is ideal for one-off scripts, e.g. `widgets.js` that is part of embedded tweets (see below).
Adding [global scripts](#global-scripts) is for scripts that should be loaded on every page.

```html
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The next version of Hydejack (v6.3.0) will allow embedding 3rd party scripts, like the one that comes with this tweet for example.</p>&mdash; Florian Klampfer (@qwtel) <a href="https://twitter.com/qwtel/status/871098943505039362">June 3, 2017</a></blockquote>
```

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The next version of Hydejack (v6.3.0) will allow embedding 3rd party scripts, like the one that comes with this tweet for example.</p>&mdash; Florian Klampfer (@qwtel) <a href="https://twitter.com/qwtel/status/871098943505039362">June 3, 2017</a></blockquote>

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Embedding
Hydejack supports embedding third party scripts directly inside markdown content. This will work in most cases, except when a script can not be loaded on a page more than once (this will occur when a user navigates to the same page twice).

**NOTE**: Adding "raw" script tags will make the page slow, unless they have the `async` or `defer` attribute set. For more see [below](#async-vs-defer-vs-loadjsdeferred).
{:.message}

## Global scripts
If you have scripts that should be loaded on every page you can add them globally.
Hydejack's own script is loaded from `_includes/scripts.html`, but I'd recommend creating your own file called `my-scripts.html` (inside `_includes`).

You can put arbitrary HTML into `my-scripts.html`, but generally you'd want to add script tags. The [same rules](#async-vs-defer-vs-loadjsdeferred) apply.

**NOTE**: Upgrading to a new version of Hydejack will overwrite `scripts.html`, so you have to go in and uncomment the line again. This is due to how Jekyll includes work.
{:.message}

## `async` vs. `defer` vs. `loadJSDeferred`
I highly recommended setting the `async` or `defer` attribute on your external scripts (i.e. the ones that have a `src` attribute).
Otherwise the entire page can't finish loading until a separate HTTP request is completed, which can take a long time (this applies to the web in general, not just Hydejack).

Specific to Hydejack is the `loadJSDeferred` function, which is used to load Hydejack's own scripts. It has various advantages which are detailed in the table below.

|           | `async`     | `defer`                | `loadJSDeferred`      |
|:----------|:------------|:-----------------------|:----------------------|
| Download  | immediately | immediately            | after document `load` |
| Execution | asap        | before document `load` | after document `load` |
| Ordering  | none        | preserves order        | via callback nesting  |
| Support   | IE8+        | IE9+                   | IE5+ (Hydejack only)  |
{:.flip-table-small}

## Using `loadJSDeferred` (Hydejack only)
Using `loadJSDeferred` is slightly more work than just adding `defer` to a script tag.

```html
<script>
  loadJSDeferred('<script-src>', function () {
    // <callback code>
  });
</script>
```

If you have scripts that depend on other scripts, you can nest calls, e.g.

```html
<script>
  loadJSDeferred('<script-src-1>', function () {
    // <callback script 1>
    loadJSDeferred('<script-src-2>', function () {
      // <callback script 1 + 2>
      loadJSDeferred('<script-src-3>', function () {
        // <callback script 1 + 2 + 3>
      });
    });
  });
</script>
```

## Registering push state event listeners
When embedding scripts globally you might want to run some init code after each page load. However, the problem with push state-based page loads is that the `load` event won't fire again. Luckily, Hydejack's push state component exposes an event that you can listen to instead.

```html
<script>
  document.getElementById('_yPushState').addEventListener('y-push-state-load', function() {
    // <your init code>
  });
</script>
```

Note that the above code must only run once, so include it in your `my-scripts.html`.

Other events you can register on `_yPushState` include

`y-push-state-start`
: Occurs when clicking a link

`y-push-state-ready`
: Animation fished and response has been parsed, ready to swap out the content.

`y-push-state-after`
: The old content has been replaced with the new content.

`y-push-state-animationend`
: The animation has finished playing.

`y-push-state-progress`
: Special case when animation is finished, but no response from server has arrived yet. This is also when the spinner will appear.

`y-push-state-load`
: All embedded script tags have been inserted into the document and have finished loading.

Continue with [Build](build.md){:.heading data-flip="title"}
{:.read-more}
