---
layout: post
title: angular controller unit test with DI (p1)
date: 2016-02-21 20:45
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
After we've set-up the initial tests for our cute controllers and services, let' get to the real world. In the real world, controllers user services, and services use services, and everything is just swimming in the big browsers jacuzzi...

But we are here to make some *unit-tests*, so the question is:

#### How to reduce complexity of runtime dependencies in our test?
Lucky for us, angular is [designed](https://docs.angularjs.org/guide/unit-testing) for that, by using [dependency injection](https://docs.angularjs.org/guide/di).

### Dependency injection in 30 sec.
Let's say that we have this service:

```javascript
function MyDataService(){
    this.getName = function(){
        return 'bob';
    }
}
```

and this controller

```javascript
function MyController() {
    this.greet = function () {
        return 'hello ' + MyDataService.getName();
    }
}
```

This is an example for *bad coding*.

Why?
Because the controller is using the service directly from the global scope.
When you write good code with angular, you don't access your dependencies directly, but use angular to inject them for you.

```javascript
function MyController(MyDataService) {
    this.greet = function () {
        return 'hello ' + MyDataService.getName();
    }
}
```
the controller now expects to get the service in it's init params, and all is regieterd to angular:

```javascript
angular.module('MyModule', [])
    .service('MyDataService', MyDataService)
    .controller('MyController', ['MyDataService', MyController]);
```

### Now back to unit testing...
How do we test the controller without testing the service?

Well, jasmine here helps us with [spies](http://jasmine.github.io/2.0/introduction.html#section-Spies).
Since we are instantiating a new controller for each test, we can use angular's DI to inject a 'mock' service instead of the 'real' service:

```javascript
it("test greet() - expect spyObj.getName() to have been called", function() {
    var spyObj = jasmine.createSpyObj('MockService', ['getName']);

    var ctrl = $controller("MyController", {
        MyDataService: spyObj
    });
    ctrl.greet();
    expect(spyObj.getName).toHaveBeenCalled();
});
```

Here we are testing that our tested code, the controller, is doing as expected and calling the service.
we can also mock the output:
```javascript
it("test greet() - mock spyObj.getName() to return 'alice'", function() {
    var spyObj = jasmine.createSpyObj('MockService', ['getName']);
    spyObj.getName.and.returnValue('alice');

    var ctrl = $controller("MyController", {
        MyDataService: spyObj
    });
    expect(ctrl.greet()).toBe('hello alice');
});
```

<iframe width="100%" height="650" src="//jsfiddle.net/ronapelbaum/Luug0kd8/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
