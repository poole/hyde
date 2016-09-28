---
layout: post
title: upgrade your angular
date: 2016-08-08 10:00
author: ronapelbaum
comments: true
categories: [javascript]
tags: [javascript, angularjs]
---
So you've probably seen already some concepts and code examples of <a href="https://angular.io/">angular 2</a>. Maybe you've even took the <a href="https://angular.io/docs/ts/latest/tutorial/">great tutorial</a>.

But now you ask yourself: Can I take my current angular 1.x project and upgrade it to angular 2? How to do that?

This will probably not be easy, but here are some refactoring that you probably should do anyway...

<!--more-->
<h2>The Goal - class oriented code</h2>
If you take a look at the example of a service in angular 2, you'll see somthing like this:

```javascript
@Injectable()
export class HeroService {
    getHeroes() {
    }
}
```

It doesn't really matter if you prefer TypeScript or ES6, the main concept here is the use of <strong>class</strong>.

But, wait a minute!

Where is the <code>angular.module(...)</code>? What is a <strong>class?</strong> How is it even slightly resemble to my current angular code?
<h2>Your code</h2>
As usual, we'll start with services.

Your current angular 1.x probably looks somthing like that:

{% gist 8f03be3b051bdfb9eaa71d4d681afd48 %}

This is a straight forward service declaration of angular 1, as we were tought at the docs. What do we have here?
<ol>
	<li>angular, please <em>get</em> module "app".</li>
	<li>please <em>provide</em> a service named "MyService".</li>
	<li>when you provide this service, use this <em>constructor</em>.</li>
</ol>
Yes, the function that we are writing here is a constructor to an <em>instance</em> of an anonymous type. Why anonymous? because we use angular, and we trust it to manage <strong><em>all</em></strong> of our object instances and dependencies. Basically, on demand of "MyService", angular calls this constructor (once, since services are singletons) and creates a (single) instance.
<h2>Write <em>function</em>, Think <em>class</em></h2>
Let's try to make our code better:

{% gist 70ed5ca295a7837e585cdbfa20e8c5c8 %}

What do we have here?

The <em>function</em> MyService, is our constructor, and it is registerd to angular as a service. We can now refer to MyService as a <em>class</em>.

The class also has a static member that tells angular where to look for dependencies to inject (since you're probably minify your code on production).
<h2>javascript modules</h2>
How do you get your javascript code into the browser? you are probably doing somthing like this:

{% gist f6ab1d527cdc8e3e58b4fdc04cda4b72 %}

While loading all your script to the borowser like this is however a bit old fashioned it is very ok (I'll talk about javascript module loading and <a href="https://webpack.github.io/">webpack </a>in the future).

The problem with our new code, that now our MyService class is on the global sopce, and this is bad for many reasons. We do not want to pollute our global scope.

What can we do about that?
<h2>Self Invoking Function</h2>
An important pattern to use here is <a href="http://www.w3schools.com/js/js_function_definition.asp">self-invoking functions</a>. It means defining an anonymouse functon and executing it immidiatly:

<code>(function(){...})();</code>

Let'e see our code now:

{% gist 41b3911721edd9f3c388278f9cdc84f3 %}

Now, the definition of MyService is <em>private</em> withing that anonymous function. Note that <em>angular.module(...)</em> refers to the angular object on the global scope.
<h2>This is it?</h2>
For now...

This is a very simple refactoring, and I'll try to take it to the next level in the future...

But, what about controllers? and directives?

That will probably be my next post...

&nbsp;
