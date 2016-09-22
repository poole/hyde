---
layout: post
title: angular unit test - use inject (Part 2)
date: 2016-02-22 09:03
author: ronapelbaum
comments: true
categories: [angular-jasmine, javascript]
---
<a href="https://ronapelbaum.wordpress.com/2016/02/21/angular-controller-test-with-dependency-injection/">Previously</a>, we've seen how to inject a jasmine spyObj as a service directly to a controller, using $controller().
This is easy, since we are creating a new controller for each test, so we can inject different spies to it.
But what about testing services?

```javascript
function MyDataService() {
    this.getName = function() {
        return 'bob';
    }
}

function MyUpperCaseService(MyDataService) {
    this.getUppercaseName = function() {
        return MyDataService.getName().toUpperCase();
    }
}
```
Here we can use $inject()..

First, we will inject the service to out testing scope.

```javascript
var MyDataService;
beforeEach(inject(function(_MyDataService_) {
    MyDataService = _MyDataService_;
}));
```
Now, we can directly spy on this service, and test the controller:

```javascript
it(&amp;amp;amp;quot;spyOn() and return 'alice'&amp;amp;amp;quot;, function () {
    spyOn(MyDataService, 'getName').and.returnValue('alice');
    expect(MyUpperCaseService.getUppercaseName()).toBe('ALICE');
});
```
Note that we are spying on the same service that is injected to our service. It's the same object instance.

https://jsfiddle.net/ronapelbaum/nt8rf1yf/
