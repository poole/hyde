---
layout: post
image: /assets/img/blog/grid.jpg
description: >
  It's time to post an update on upcoming versions of Hydejack, in part to get me back into the mood for writing, as missing documentation is what's holding it up.
---

# About Upcoming Versions of Hydejack

I think it's time to post an update on upcoming versions of Hydejack, in part to get me back into the mood for writing. Missing documentation is, as always, what's holding up the release. There are currently plenty of features that would be useful to many people that simply aren't documented, including everything that is work in progress for v9. It's both the least fun and most valuable part of the project.

* toc
{:toc .large-only}

## Version 9
Version 9 is the next "major" version of Hydejack, that will once again alter its design. The reason for this is that with the current style for hyperlinks, the choice of accent colors is quite limited, as some might look good on white background, but be barely legible on dark background and vice-versa. Instead of solving this in the most complicated way possible through some advanced color arithmetic (assuming that's what it's called), I've opted to reduce the use of the accent color instead. You can see a work-in-progress on [my personal site](https://qwtel.com/). I have to say I'm quite please with the results.

## Grid Layout
Purchasers of the PRO version will have access to a new grid layout (see screenshot) that's basically a version of the project cards adapted for posts.

## Auto-Hiding Navbar
One of the annoyances of the current version of Hydejack is the inability to reach the navbar from the middle of the page. I won't be implemented a "Jump to Top" button, since I've never used one myself and wondering if anyone ever did. 

In the past I've set the header to `fixed`, but this either caused overlapping artifacts, or took away too much screen real estate when adding a background color. In V9 this is resolved by a auto-hiding navbar, that will disappear when scrolling down, and reappear when scrolling up. Obviously, this pattern is not new, but getting it work smoothly took a bit of figuring out and there are still improvements to be made, though I thik the current version is "good enough". Again, [my personal site](https://qwtel.com/) has the work-in-progress.

<!-- ## Release Date
I plan on releasing V9 in 2019 to keep the naming scheme -->

## Pricing
To state the obvious, v9 will be a paid upgrade. As before, I won't give away work for free only to have people complain that I've changed their design. Instead, v9 is a paid opt-in for those who like the new design and features. Against any economic sense, I will also release many of the behind the scenes updates as part of the 8.6 release. The details are yet to be worked out, but it will solve several of the [open issues](https://github.com/hydecorp/hydejack).

Since v9 will be a pretty small update otherwise, the cost will be something along $20 via a discount code included on the 8.6 release zip.

## PRO+
For the first time I will be offering a PRO+ Version that will include an hour of my time to be used for anything from asking questions to debugging a particular issue. In the past I've shut down many if not most support requests because I have this habit of not wanting to do professional work free of charge. 

At the same time there was no path for someone who --- quite correctly --- calculated that I could fix their particular issue in a fraction of the time they themselves or any Jekyll developer on the marketplace could. For them, as well as anyone who isn't quite as price sensitive to begin with, there will be the PRO+ option that will include a priority email to contact me. Support requests to the regular email will be discarded with no exceptions once this option is available.

## Communication
As with this post, going forward I'll be communicating in a more personal, less business-y tone. I've made the mistake of dabbling in marketing speak, even imitating Apple at times, though it is a poor fit for the product at hand. Hydejack is a very niche, very opinionated product that wouldn't even exist if I didn't want it for myself. Given that, the "broadest possible reach"-style of communication is... ineffective. If nothing else, writing bland, gentrified copy is boring and takes too long, while "thinking out loud" type of writing is both fun to write and quicker to produce.
