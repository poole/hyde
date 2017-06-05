---
layout: post
title:  "My Transition to a Front-End Developer"
author: "Adriel"
---
<img src="{{ site.url }}/assets/front-end-vs-backend.jpeg" width="100%">

Over the last year I switched from writing server-side Python code to building a user interface with ReactJS. I'm currently working on rewriting an application to make it faster and more pretty.

I've learned a lot over the past six months working here. It's been a bit of a different world working with new tools and focusing primarily on writing client side code. I'd like to highlight some of main things I've picked up at the new job and point out the differences from my last role.

**ReactJS is really cool**

I like to think of a React app as big lego creation where each of the lego pieces are React components. Each lego piece has a color and maybe some sort functionality and when you compose them all together you can create something beautiful. Same with React components. Each component is a standalone piece of the UI and then get all composed together to build the app.

In our team we keep all our generic components separate from our code containing business logic. For example components like buttons, combobox's, and search boxes all live in a special repository that acts as a library for reused UI components called [react storybook](https://storybook.js.org). What's great about storybook is that it allows developers to examine each component in isolation and browse the the collection.

**Redux is really cool as well and works well with ReactJS**


**Javascript and Python are surprisingly similar**

Although the syntax is different, both languages pretty much do the same thing and for the most part whatever you can do in one language you can do in the other. That being said, switching from Python to Javascript wasn't as difficult as I thought it might be. I do miss list comprehensions, but the javascript `map` function will achieve the same result.

For example, consider a line of code that finds the squares of a preexisting array of numbers. Python's `squares = [x**2 for x in numbers]` becomes `const squares = numbers.map(x => x**2);`. The syntax is different, but the concept is very similar.

**User Experience designers play an important role in software development**

Before I worked in front end development, I used to think that front end developers and designers were basically the same thing. I thought they were a single team that decides what the website should look like and how it should behave.

Since starting working on the front end, I've learned that pretty much everything about the look and feel is determined by the designer. However, it is up to the developer to point out places where he thinks the design should be improved or point out special cases where there is a piece of the design missing. This is a collaborative process that can be ongoing in order to deliver a good product.

Overall I've been very happy about taking designs and bringing them to life. I like how the design work is created by someone who is specifically trained in creating designs. I also like not having to think about how the interface should look, it allows me to focus on other things instead. Designers work very closely with tools like Photoshop or Sketch and know how to create beautiful web interfaces. It is my job to bring that beauty to life.

**Communication with the backend team is crucial**

My first goal as part of the team was to create a piece of the app that we could demo at a conference to customers. To be able to get the work done in time for the demo, we faked the data and didn't show anything from an actual database. We were able to demo a product that seemed to work, but was actually just a hollywood set.

After the demo was complete, I started wiring the app through an API to retrieve real data. I found that the API was returning data in a different form than I expected. I also noticed a bunch of bugs with the API and brought them up to the backend team who maintains it. What I found was that talking with the team helped me better understand how the application should work. Some bugs I pointed out were indeed bugs, but other bugs that I pointed out were a misunderstanding on my part of how the application should work.

**Chrome developer tools are very useful**




   