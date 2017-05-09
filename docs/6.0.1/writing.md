---
layout: page
title: Writing
image: 'https://qwtel.com/hydejack/assets/img/doc.jpg'
color: '#8e5c75'
redirect_from: /docs/latest/writing/
---

Hydejack offers a few additional features to markup your markdown. Don't worry, these are merely CSS classes added via the standard `{:.my-class}` syntax, so that your posts remain compatible with other kramdown processors.

**NOTE**: For an introduction to markdown in general, see [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) and [kramdown Syntax](https://kramdown.gettalong.org/syntax.html).
{:.message}

## Table of Contents
* this unordered seed list will be replaced by toc as unordered list
{:toc}

## Adding a table of contents
You can add a generated table of contents to any page by adding `{:toc}` below a list.

Markdown:
~~~md
* this unordered seed list will be replaced by toc as unordered list
{:toc}
~~~

<!-- ## Markdown -->
## Adding message boxes
You can add a message box by adding the `message` class to a paragraph.

**NOTE**: You can add a message box.
{:.message}

Markdown:
~~~markdown
**NOTE**: You can add a message box.
{:.message}
~~~

## Adding large text
You can add large text by adding the `lead` class to the paragraph.

You can add large text.
{:.lead}

Markdown:
~~~markdown
You can add large text.
{:.lead}
~~~

## Adding large images
You can make an image span the full width by adding the `lead` class.

![Full-width image](https://placehold.it/800x100){:.lead}

Markdown:
~~~markdown
![Full-width image](https://placehold.it/800x100){:.lead}
~~~

## Adding large quotes
You can make a quote "pop out" by adding the `lead` class.

> You can make a quote "pop out".
{:.lead}

Markdown:
~~~
> You can make a quote "pop out".
{:.lead}
~~~

## Adding faded text
You can gray out text by adding the `faded` class.

Use this sparingly and for information that is not essential --- or you don't want viewers to read at all, like when you pull a line form a dirty rap song..

I'm faded, faded, faded.
{:.faded}

Markdown:
~~~md
I'm faded, faded, faded.
{:.faded}
~~~

<!-- ### Adding a figure with caption
<figure>
  <img src="https://placehold.it/400x200" />
  <figcaption>My caption</figcaption>
</figure> -->

## Adding code blocks
To add a code block without syntax highlighting, simply indent 4 spaces (regular markdown).
For code blocks with code highlighting, use `~~~<language>`. This syntax is also supported by GitHub.
For more information and a list of supported languages, see [{ Rouge }](http://rouge.jneen.net/).

~~~js
// Example can be run directly in your JavaScript console

// Create a function that takes two arguments and returns the sum of those
// arguments
var adder = new Function("a", "b", "return a + b");

// Call the function
adder(2, 6);
// > 8
~~~

Markdown:

    ~~~js
    // Example can be run directly in your JavaScript console

    // Create a function that takes two arguments and returns the sum of those
    // arguments
    var adder = new Function("a", "b", "return a + b");

    // Call the function
    adder(2, 6);
    // > 8
    ~~~

## Adding math
Hydejack supports [math blocks](https://kramdown.gettalong.org/syntax.html#math-blocks) via [KaTeX](https://khan.github.io/KaTeX/).

Why KaTeX instead of MathJax? KaTeX is faster and more lightweight at the cost of having less features, which,
for the purpose of writing blog posts, should be a favorable tradeoff.

**NOTE**: KaTeX does not support the `align` and `align*` environments.
Instead, `aligned` should be used, e.g. `\begin{aligned} ... \end{aligned}`.
{:.message}

### Inline
Inline math $$ f(x) = x^2 $$.

Markdown:
~~~md
Inline math $$ f(x) = x^2 $$.
~~~

### Block

$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$

Markdown:

~~~latex
$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$
~~~

***

Continue with [Build]({{ site.baseurl }}{% link docs/6.1.0/build.md %}){:data-flip="title"} »
{:.faded.heading}
