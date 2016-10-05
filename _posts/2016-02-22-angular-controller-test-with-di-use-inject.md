---
layout: post
title: angular controller test with DI - use inject (DI p2)
date: 2016-02-22 09:03
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
[Previously](/2016/02/21/angular-controller-test-with-dependency-injection), we've seen how to inject a jasmine spyObj as a service directly to a controller, using $controller().
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
it("spyOn() and return 'alice'", function () {
    spyOn(MyDataService, 'getName').and.returnValue('alice');
    expect(MyUpperCaseService.getUppercaseName()).toBe('ALICE');
});
```
Note that we are spying on the same service that is injected to our service. It's the same object instance.

<iframe width="100%" height="650" src="//jsfiddle.net/ronapelbaum/nt8rf1yf/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
