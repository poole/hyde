---
layout: post
title:  "Let's be more optimistic!"
date:   2017-09-20
author: "Adriel"
---
<img src="{{ site.url }}/assets/optimism.jpg">

Optimism is supposed to be good for you, right? Here's the top five benefits I found after doing a quick internet search for its benefits.

1. It builds resilience in the face of adversity.
1. It reduces the level of stress experienced.
1. Research shows that it increases longevity.
1. It makes you proactive.
1. It promotes happiness.

The list goes on and on, but they never mentioned the benefits optimism provides to software users when computers use it.

For example, let's say somebody is dragging some sort of row into a folder...

![user dropping row into folder with slow UI]({{ site.url }}/assets/slow.gif)

In the example the user drops the row into the folder, but it takes a second or two before the row actually moves places.

Why does it take so long? Well in order to move to the row into the folder, the client contacts the server and asks it to change a row attribute by specifying the new folder. Then the server makes a database change and tells the client that everything worked correctly. After receiving confirmation, the client updates the UI to show the new changes. Maybe the diagram will help explain.

![slow diagram]({{ site.url }}/assets/slowDiagram.jpg)

During this whole process, the client is waiting to hear back from the server before it updates the UI and puts the row in the folder.

In order to make the UI appear more responsive and fluid there's a little trick called optimistic update. Instead of waiting to hear back from the server, the client displays the row instantly in the folder and then sends of a request to the server to make the change permanent. In this case the client is momentarily lying to the user by showing the prematurely updated UI, but the idea is it shouldn't matter because the request will probably be successful. It's optimistic 😀.

![user dropping row into folder with slow UI]({{ site.url }}/assets/fast.gif)

Now doesn't that look much better? Probably worth a momentary lie isn't it?

Well there's some cases where the little lie is worth it and some where its not. In this case, it's not the end of the world if the request fails. Yes, the user will be confused when they refresh and see the row didn't get placed in the folder, but this operation is not terribly critical and will probably succeed 99% of the time.

On the other hand, if this operation was to do something important like purchase a flight ticket, then that little lie could have really bad consequences if the user leaves the application and then the operation failed. In that case the user might plan falsely believe they have a flight booked that never went through.

Another example of where I wouldn't want to do this is if there's a common expected failure for the operation. For example, if there were some sort of folders that were incompatible with some rows, then it might make more sense to show an updating state.