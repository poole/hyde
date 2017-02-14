---
layout: post
title: angular Circular Dependency
date: 2016-06-14 19:00
author: ronapelbaum
comments: true
tags: [angularjs, javascript]
---
So, angular is/has a dependency injection mechanism.

It means, that it first loading the definition of all dependencies, and then instantiate and inject them on demand (angular has lazy instantiation).

Let's have a look at this code:

<script src="https://gist.github.com/ronapelbaum/110b28e47ff358f1d2a571659f627acb.js"></script> 

Well, this code will obviously get us:

> **Error: $injector:cdep -&gt; Circular Dependency**

Le'ts explain the obvious:

When angular is trying to load service A, it goes and tries to load service B, but then it tries to load service A again, and here we have our circular dependency.

## Solution: use $injector
In order to solve this, we can use the **$injector** explicitly in service B:

<script src="https://gist.github.com/ronapelbaum/f8dd3a7ada22a52ba154e59a75ba63c6.js"></script> 

Why is this working? didn't we call the injector anyway?

The answer is: No.

The $injector is trying to load service A, only at the "run" block, long after all service definitions have been loaded.

## Now seriously...
While using $injector explicitly might have some good reasons (though I doubt it), this is clearly not one of them.

Please, don't be afraid to refactor:

<script src="https://gist.github.com/ronapelbaum/9adc004af8c2a8db04c2d883f4cb5a68.js"></script> 

