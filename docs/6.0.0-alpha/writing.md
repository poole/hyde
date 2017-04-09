---
layout: page
title: Writing
---

Hydejack offers a few additional features to markup your markdown. Don't worry, these are merely CSS classes added via the standard `{:.my-class}` syntax, so that your posts remain compatible with other kramdown processors.

For an introduction to markdown in general, see [kramdown Syntax](https://kramdown.gettalong.org/syntax.html) or [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

<!-- ## Markdown -->
## Message boxes
You can add a message box by adding the `message` class to a paragraph.

**NOTE**: You can add a message box.
{:.message}

Markdown:
~~~markdown
**NOTE**: You can add a message box.
{:.message}
~~~

## Large text
You can add large text by adding the `lead` class to the paragraph.

You can add large text.
{:.lead}

Markdown:
~~~markdown
You can add large text.
{:.lead}
~~~

## Large image
You can make an image span the full width by adding the `lead` class.

![Full-width image](https://placehold.it/864x100){:.lead}

Markdown:
~~~markdown
![Full-width image](https://placehold.it/864x100){:.lead}
~~~

## Large quote
You can make a quote "pop out" by adding the `lead` class.

> You can make a quote "pop out".
{:.lead}

Markdown:
~~~
> You can make a quote "pop out".
{:.lead}
~~~

## Faded text
You can gray out text by adding the `faded` class.

Use this sparingly and for information that is not essential --- or you don't want viewers to read at all, like when you pull a line form a dirty rap song..

I'm faded, faded, faded.
{:.faded}

Markdown:
~~~md
I'm faded, faded, faded.
{:.faded}
~~~


<!-- ### Add a figure with caption
<figure>
  <img src="https://placehold.it/400x200" />
  <figcaption>My caption</figcaption>
</figure> -->

## Math blocks

[TODO]

## Code snippets

[TODO]
