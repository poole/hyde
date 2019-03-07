---
layout: post
title: How to use KaTeX with Jekyll on GitHub Pages 
# image: /assets/img/blog/wade-lambert.jpg
# description: >
#   Hydejack 8.3.2 introduces new options to bring Hydejack's build time in line with other Jekyll themes. 
---

There are many ways to enable math / LaTeX support on Jekyll pages, but IMO none is quite as performant and good-looking as [KaTeX]. While KaTeX doesn't support the same feature set as MathJax, the improved performance 

Inspired by [this question on StackOverflow](https://stackoverflow.com/questions/26275645/how-to-support-latex-in-github-pages) I thought I could share the technique I use to render math in Hydejack so you can use it on your own site.

While kramdown does support KaTeX math engines by now, these haven't found their way into GitHub Pages yet. Luckily, we can work around this buy using the MathJax backend and massaging the data on the frontend, so that we can render it using KaTeX.

<!-- Let's test some inline math $$x$$, $$y$$, $$x_1$$, $$y_1$$.

Now a inline math with special character: $$|\psi\rangle$$, $$x'$$, $$x^*$$.

Test a display math:

$$
   |\psi_1\rangle = a|0\rangle + b|1\rangle
$$

Is it O.K.?

Test a display math with equation number:

$$
\begin{equation}
   |\psi_1\rangle = a|0\rangle + b|1\rangle
\end{equation}
$$

Is it O.K.?

Test a display math with equation number:

$$
\begin{aligned}
  |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
  |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{aligned}
$$

Is it O.K.?

And test a display math without equaltion number:

$$
\begin{aligned}
  |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
  |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{aligned}
$$

Is it O.K.?

Test a display math with equation number:

$$
\begin{aligned}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{aligned}
$$

Is it O.K.?

And test a display math without equaltion number:

$$
\begin{aligned}
    |\psi_1\rangle &= a|0\rangle + b|1\rangle \\\\
    |\psi_2\rangle &= c|0\rangle + d|1\rangle
\end{aligned}
$$

Is it O.K.? -->

[katex]: https://katex.org/