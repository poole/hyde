---
layout: post
title:  "Choose Optimism. It feels better"
date:   2117-10-25
author: "Adriel"
---
<img src="{{ site.url }}/assets/optimism.jpg">

Optimism is supposed to be good for you, right? Here's some benefits I found after doing a quick internet search for its benefits.

1. It builds resilience in the face of adversity.
1. It promotes self respect and integrity
1. It creates a sense of fulfillment and satisfaction.

The list goes on and on, but they never mentioned the benefits optimism provides to software users when computers use it.

For example, let's say somebody is dragging some sort of row into a folder...

![user dropping row into folder with slow UI]({{ site.url }}/assets/slow.gif)

In the example the user drops the row into the folder, but it takes a second or two before the row actually moves places.

Why does it take so long? Because the client makes a request to the server which then makes request to database to change a table value. After all these operations happen and the success message is sent back to the client, then the UI updates.

![slow diagram]({{ site.url }}/assets/slowUpdate.png)

In order to make the UI appear more responsive and fluid there's a little trick called optimistic update. Instead of waiting to hear back from the server, the client updates the UI instantly and sends off the API request, hoping that it will succeed.

![user dropping row into folder with slow UI]({{ site.url }}/assets/fast.gif)

Now doesn't that look much better?

Our new diagram after optimistic update looks like this...

![fast diagram]({{ site.url }}/assets/fastUpdate.png)

Now one might argue that's it's unethical to update the UI before the change has gone through. The user is being lied to before it has been confirmed that the operation succeeded.

So is it okay it lie temporarily in order to make the UI appear more response?

I'm not trying to promote lying to solve problems. What I can say is that sometimes a little lie is okay.

In this case, it's not the end of the world if the request fails. Yes, the user will be confused when they refresh and see the row didn't get placed in the folder, but this operation is not terribly critical and will probably succeed 99% of the time.

And for the 1% of the time where the request fails, we can even correct the UI to reflect that and revert the change.

![error handling diagram]({{ site.url }}/assets/updateWithErrorHandling.png)

Despite how clever optimistic update is, there are some times where we would never want to use it.

Let's say the operation was to do something important like purchase a flight ticket, then that little lie could have really bad consequences. Say the user tried to book the flight, it appeared successful in the UI, the user closes their browser, and then an error occurs on the backend. Somebody would have falsely though they booked the flight. In this case optimistic update is not suitable.

Just like optimism, optimistic update is a powerful tool. Use it to your advantage!

![optimism glass]({{ site.url }}/assets/optimismGlass.jpg)