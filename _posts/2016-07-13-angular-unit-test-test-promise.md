---
layout: post
title: angular unit test - service with $promise
date: 2016-07-13 08:39
author: ronapelbaum
comments: true
categories: [angular-jasmine, javascript]
---
Now let's talk about promises.

So you have a controller that uses a service, and that service returns a promise. How do you <em>mock</em> promises?

<!--more-->

We already know that we'de want to <em>mock</em> this service. But how should we mock the promised return?

{% gist e78e593b86a5e98db3baa0e303e69d9b %}

Let's explain, step by step.
<ol>
	<li>Mock the data service (see <a href="https://ronapelbaum.wordpress.com/2016/03/03/angular-unit-test-use-provide-part-3/">link</a>).</li>
	<li>Get the controller instance that we want to test.</li>
	<li>Set the mock service to return a promise objec. For that we've injected the <em><strong>$q</strong></em> service.</li>
	<li>Now we trigger the controller to get the promise from the DataService, which will really go to the mockService and return our defferd promise. Note at this point, the promise hasn't resolved yet, meening, that the<em><strong> then()</strong></em> funcation was't triggerd.</li>
	<li>Resolve the promise. Note that the promise wasn't resolved yet in our controller! Why is that?</li>
	<li>In angular, <em><strong>$q</strong></em> is wrapping native javascript Promise in order to tie it to the digest cycle. In the test, the digest cycle is not alive, so we need to trigger it manually with <em><strong>$digest</strong></em>. Now it works!</li>
</ol>
