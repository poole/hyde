---
layout: post
title: "Command line: terminal multiplexing"
category: articles
tags: shell intermediate
---

Terminal multiplexing means running lots of terminals within one, which is analogous to having lots of windows open on your desktop.
It's pretty much the best thing ever.

This is a slightly advanced topic in the sense that it doesn't make sense to use lots of terminals if you don't know how to use one of them.
However, I will be using multiplexed terminals in the demos and this way you will understand what is going on.

Here is a little demo showing how collections of terminals can be made and then *detached* and *reattached*.
This feature is very handy in that it allows you to "save your desktop" and return to it later, while processes continue.

<script type="text/javascript" src="https://asciinema.org/a/9146.js" id="asciicast-9146" async></script>

This demo was made using my favorite multiplexer, called [tmux](http://tmux.sourceforge.net/).
It has a number of nice features, including being able to split windows both horizontally and vertically.
The most common multiplexer is [GNU Screen](http://www.gnu.org/software/screen/).
.

* [A very nice introduction to tmux](http://tmuxp.readthedocs.org/en/latest/about_tmux.html)
* [tmux homepage](http://tmux.sourceforge.net/)
* [Screen tutorial](https://www.linux.com/learn/tutorials/285795-taking-command-of-the-terminal-with-gnu-screen-)
* [GNU Screen manual](http://www.delorie.com/gnu/docs/screen/screen_toc.html)

