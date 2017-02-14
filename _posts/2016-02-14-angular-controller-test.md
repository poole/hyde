---
layout: post
title: angular controller test
date: 2016-02-14 23:21
author: ronapelbaum
comments: true
tags: [angular-jasmine, angularjs, javascript]
---
### Testing controller with controllerAs
After we've seen how to [test a service](/2016/02/14/angular-service-unit-test/), let's talk about testing a controller.

```javascript
function MyController(MyService) {
 this.greetUpperCase = function(name) {
  return MyService.greet(name).toUpperCase();
 }
}
```

We'd like angular's DI to inject an instance of our controller to our test, but controllers are not singltons as services.

Therefore, we will:
- inject the [$controller](https://docs.angularjs.org/api/ngMock/service/$controller) service

- use it to instance a controller for us

```javascript
var $controller;
beforeEach(module('MyModule'));
beforeEach(inject(function(_$controller_) {
    $controller = _$controller_; })
);
it('test greetUpperCase()', function() {
    var ctrl = $controller('MyController');
    expect(ctrl.greetUpperCase('bob')).toBe('HELLO BOB');
});
```

<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/tcmsw688/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Testing controller with $scope

Now, if you're still working with $scope:

```javascript
function MyController($scope, MyService) {
 $scope.greetUpperCase = function(name) {
  return MyService.greet(name).toUpperCase();
 }
}
```

Basically, when you're working with $scope, you don't really care about the controller itself, since it's doing everything on it's scope.

So, we will need to:
1. inject $rootScope
2. create a new scope
3. inject it to a new controller
4. test the $scope

```javascript
it('test greetUpperCase()', function() {
 var myScope = $rootScope.$new();
 $controller('MyController', {
  $scope: myScope
 });
 expect(myScope .greetUpperCase('bob')).toBe('HELLO BOB');
});
```

<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/pkhaxmdg/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
