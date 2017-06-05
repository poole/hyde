---
layout: post
title:  "Biggest Takeaways After Year 1"
author: "Adriel"
---

I’d like to share some of the key things I’ve learned during my experience as a software engineer as well as the main differences from coding in college vs. the real world.

**Know when to ask for help and when to keep trying on your own**

I often have a dilemma at work when I’m stuck on a problem. Should I ask my boss for help or keep trying to figure it out myself? It’s important for me to make the right decision and here’s why…

If I keep on trying to solve the problem by myself but I don’t know enough information to solve it, then I won’t be able to solve the problem. There’s a reason why we work together and it’s important to reach out for help when necessary. My boss knows a lot more than I do, and there’s a chance that what will take me countless hours of fruitless frustration will only take him a moment to point me in the right direction.

On the other hand, if my boss just tells me answers to all my problems then it’s an ugly situation because I interrupt my boss from his work, I don’t learn anything, and I become dependent on my boss to figure out my problems. The best way I can become a better programmer is to solve problems on my own. I only like to ask for help when the answer lies beyond my knowledge (and the knowledge of the internet).

**The best documentation for your code is the code itself**

Back in my college days I used to write a lot of comments in my code. I figured it was the best way to write code because it makes the code easier to understand when reading back over it.

As soon as I took a look over the code on my first day at the job I was surprised by the lack of comments. There were almost no comments. At first it seemed concerning. Isn’t it important to write comments to explain what you’re doing?

However, now it makes perfect sense. Instead of using comments to explain what you’re doing, the code should do that. In fact, comments are bad because they make code more verbose and they can get easily out of sync if your code changes.

Instead of using comments to explain what your code is doing, it’s important to use descriptive class, variable, and function names. These names act as signs and good ones will prevent other developers from getting lost in your code.

**Use the correct parts of speech in your code**

I never realized this in college but you can make your code a lot cleaner by using the right parts of speech in your code. Here’s the mapping:

*   Class→Singular Noun
*   Method→Verb
*   Variable→Noun

Come to think of it, I wouldn’t imagine doing it any other way. This just makes sense.

**Methods should be short**

Like 4 or 5 lines max. I remember when I used to make really big methods in college that were probably 100+ lines. By making short methods, it not only makes the code easier to read, but it makes it easier to reuse methods instead of writing duplicate code.

**Don’t write duplicate code**

By duplicate code I mean that there are multiple places in your code that do the same thing. Whenever there is duplicate code, there’s a problem. First of all, it means there is more code which is bad because it’s harder to read and it’s harder to maintain.

Secondly, if we want to change the code then we have to change it in multiple paces. On the other hand if the code only appears once , we only need to change it in one place.

**Write unit tests**

The whole field of test driven development and unit testing was foreign to me in college. Now, I can’t quite image writing code without it. Unit tests make sure that your code actually works. I think one problem I had in college is that I would write code without confidence that it does what it’s supposed to do.

Currently I only write new new code if it’s making a failing unit test pass. Also, I’m not scared that my code is broken because my green unit tests are proof to me that everything works. Unit tests are the right way to code and anybody who learns that in college will be way ahead of the game.

**Version Control is really useful**

Here is another thing that was foreign to me in college, however in the workplace it is fundamental. Version control is the system that keeps track of our code and all the changes that everyone makes to it. It is a tool that allows us to contribute to the same code base simultaneously without overwriting each other’s changes. Also it’s great because it stores all the history of our code, so if I want to see what our code looked like a week ago, I can easily do it. At our company we used to use subversion, but now we use git and I like it much better.

<img src="{{ site.url }}/assets/99problems.jpg" width="100%">
