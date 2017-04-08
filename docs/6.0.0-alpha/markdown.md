---
layout: page
title: Markdown
---

This section features non-standard markdown features of Hydejack. Don't worry, we are merely adding CSS classes via the standard `{:.my-class}` syntax, so that your posts remain compatible with other kramdown processors.

For an introduction to markdown in general, there are better guides elsewhere. See [kramdown Syntax](https://kramdown.gettalong.org/syntax.html) or [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

<!-- ## Markdown -->
## Message boxes
You can add a message box by adding the `message` class to a paragraph.

You can add a message box.
{:.message}

Markdown:
~~~markdown
You can add a message box.
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
You can make an image to span the full width by adding the `lead` class.

![Alt Text](https://placehold.it/864x100){:.lead}

Markdown:
~~~markdown
![Alt Text](https://placehold.it/864x100){:.lead}
~~~

## Large quote
You can make a quote "pop out" by adding the `lead` class.

> You can make a quote "pop out".
{:.lead}

Markdown:
~~~markdown
> You can make a quote "pop out".
{:.lead}

~~~

<!-- ### Add a figure with caption
<figure>
  <img src="https://placehold.it/400x200" />
  <figcaption>My caption</figcaption>
</figure> -->

## Math blocks
## Code snippets
