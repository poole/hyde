---
layout: post
title: angular unit test: service test
date: 2016-02-14 22:05
author: ronapelbaum
comments: true
categories: [angular-jasmine, angularjs, javascript]
---
[gallery ids="382,383" type="rectangular"]
<div>Ok. Let's talk about javascript real unit-testing...</div>
<div></div>
<div></div>
<!--more-->
<div>Say you have a Service:</div>
<div></div>
```javascript
function MyService() {
   this.greet = function(name) {
       return 'hello ' + name;
   }
};
```
<div></div>
<div>so, in order to test it you can access it from global scope:</div>
<div></div>
```javascript
it(&amp;quot;test greet()&amp;quot;, function() {
    var myService = new MyService();
    expect(myService.greet('bob')).toBe('hello bob');
});
```
<div></div>
<div><a href="https://jsfiddle.net/ronapelbaum/4uwetpy5/" target="_blank">https://jsfiddle.net/ronapelbaum/4uwetpy5/</a></div>
<div></div>
<div></div>
<div>OK, now let's take this service, and register it to angular.</div>
<div>Now we'd like to test it, using angular's DI mechanism:</div>
<div></div>
```javascript
var MyService;

beforeEach(module('MyModule'));

beforeEach(inject(function(_MyService_) {
    MyService = _MyService_;
}));

it(&amp;quot;test greet()&amp;quot;, function() {
    expect(MyService.greet('bob')).toBe('hello bob');
});
```
<div></div>
<div><a href="https://jsfiddle.net/ronapelbaum/m6Ltvh82/">https://jsfiddle.net/ronapelbaum/m6Ltvh82/</a></div>
<div></div>
<div></div>
<div>So what do we have here?</div>
<div></div>
<div>we are using 2 method from <a href="https://docs.angularjs.org/api/ngMock" target="_blank">ngMock</a></div>
<ol>
	<li>we tell angular what is the "namespace" that we will use with <a href="https://docs.angularjs.org/api/ngMock/function/angular.mock.module" target="_blank">module()</a></li>
	<li>we inject service to our local var with <a href="https://docs.angularjs.org/api/ngMock/function/angular.mock.inject" target="_blank">inject()</a></li>
</ol>
Note that we don't need to instansiate it since angular does it for us (services are singletons in angular).
