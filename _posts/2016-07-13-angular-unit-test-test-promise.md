---
layout: post
title: angular unit test - service with $promise
date: 2016-07-13 08:39
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
Now let's talk about promises.

So you have a controller that uses a service, and that service returns a promise. How do you *mock* promises?

We already know that we'de want to *mock* this service. But how should we mock the promised return?

<script src="https://gist.github.com/ronapelbaum/e78e593b86a5e98db3baa0e303e69d9b.js"></script> 

Let's explain, step by step.
1. Mock the data service (see [previouse post](/2016/03/03/angular-unit-test-use-provide-part-3/)).
2. Get the controller instance that we want to test.
3. Set the mock service to return a promise objec. For that we've injected the **$q** service.
4. Now we trigger the controller to get the promise from the DataService, which will really go to the mockService and return our defferd promise. Note at this point, the promise hasn't resolved yet, meening, that the** then()** funcation was't triggerd.
5. Resolve the promise. Note that the promise wasn't resolved yet in our controller! Why is that?
6. In angular, **$q** is wrapping native javascript Promise in order to tie it to the digest cycle. In the test, the digest cycle is not alive, so we need to trigger it manually with **$digest**. Now it works!
