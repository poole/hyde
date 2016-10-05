---
layout: post
title: angular service unit test
date: 2016-02-14 22:05
author: ronapelbaum
comments: true
tags: [angular-jasmine, angularjs, javascript]
---
Ok. Let's talk about javascript real unit-testing...

Say you have a Service:

```javascript
function MyService() {
   this.greet = function(name) {
       return 'hello ' + name;
   }
};
```

so, in order to test it you can access it from global scope:

```javascript
it("test greet()", function() {
    var myService = new MyService();
    expect(myService.greet('bob')).toBe('hello bob');
});
```

<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/4uwetpy5/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

OK, now let's take this service, and register it to angular.
Now we'd like to test it, using angular's DI mechanism:

```javascript
var MyService;

beforeEach(module('MyModule'));

beforeEach(inject(function(_MyService_) {
    MyService = _MyService_;
}));

it("test greet()", function() {
    expect(MyService.greet('bob')).toBe('hello bob');
});
```

<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/m6Ltvh82/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


So what do we have here?

we are using 2 method from [ngMock](https://docs.angularjs.org/api/ngMock)
- we tell angular what is the "namespace" that we will use with [module()](https://docs.angularjs.org/api/ngMock/function/angular.mock.module)
- we inject service to our local var with [inject()](https://docs.angularjs.org/api/ngMock/function/angular.mock.inject)

Note that we don't need to instansiate it since angular does it for us (services are singletons in angular).
