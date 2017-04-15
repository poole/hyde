---
layout: about
title: About
menu: true
order: 7
---

## Hydejack
{:.sr-only}

~~~
 __  __                __                                     __         
/\ \/\ \              /\ \             __                    /\ \        
\ \ \_\ \   __  __    \_\ \      __   /\_\      __       ___ \ \ \/'\    
 \ \  _  \ /\ \/\ \   /'_` \   /'__`\ \/\ \   /'__`\    /'___\\ \ , <    
  \ \ \ \ \\ \ \_\ \ /\ \L\ \ /\  __/  \ \ \ /\ \L\.\_ /\ \__/ \ \ \\`\  
   \ \_\ \_\\/`____ \\ \___,_\\ \____\ _\ \ \\ \__/.\_\\ \____\ \ \_\ \_\
    \/_/\/_/ `/___/> \\/__,_ / \/____//\ \_\ \\/__/\/_/ \/____/  \/_/\/_/
                /\___/                \ \____/                           
                \/__/                  \/___/                            
~~~

Hydejack is a complete, interactive, configureable, responsive, reactive[^r], mobile-first, touch-enabled, animated, jankfree, printable, tab-able, fast[^1], search engine-friendly and robust [Jekyll](http://jekyllrb.com/) theme that feels like a modern web app, while preserving what is great about *web pages*: Working URLs, hyperlinks, a working back button, a working refresh button and less than 50MB of JavaScript (tongue-in-cheek).

It can be hosted on GitHub Pages, where it has support for categories and tags, math blocks via KaTeX,
opt-in comments via Disqus, multiple authors [enumerate more features] and that's just the free version[^3].
[TODO]

The site works all the way down to IE10; IE9 if you don't need fancy animations, and IE5 if you don't need fancy anything.
Rumor has it, you can even view it via [`lynx`](http://lynx.browser.org/).

## Image Credit

Sidebar (default)
: [Napoleon Crossing the Alps ](https://en.wikipedia.org/wiki/Napoleon_Crossing_the_Alps#/media/File:Jacques_Louis_David_-_Bonaparte_franchissant_le_Grand_Saint-Bernard,_20_mai_1800_-_Google_Art_Project.jpg)

Sidebar (Documentation)
: [Annie Spratt](https://unsplash.com/search/library?photo=lIWF2uHxs0Q)


[^1]: Perceived speed: Latency hidden through complex pre-fetching logic and animations. Load speed: Inlining styles and removing other requests from the critical rendering path.
[^r]: I felt that using `RxJS` was reason enough to give it the "reactive" label.
[^3]: The "PRO" version offers what you would need for a professional web presence: A [projects page]({{ site.baseurl }}/projects/) with [detail view]({{ site.baseurl }}/projects/hydejack-v6), a [welcome page]({{ site.baseurl }}/welcome) that highlights your favorite projects and posts, and a [resume]({{ site.baseurl }}/resume).
[jankfree]: http://jankfree.org/
