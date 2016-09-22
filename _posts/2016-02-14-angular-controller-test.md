---
layout: post
title: angular controller test
date: 2016-02-14 23:21
author: ronapelbaum
comments: true
categories: [angular-jasmine, angularjs, javascript]
---
<h3>Testing controller with controllerAs</h3>
After we've seen how to <a href="https://ronapelbaum.wordpress.com/2016/02/14/angular-jasmine-test-patterns-1/">test a service</a>, let's talk about testing a controller.

[code language="javascript" gutter="false"]
function MyController(MyService) {
 this.greetUpperCase = function(name) {
  return MyService.greet(name).toUpperCase();
 }
}
[/code]

We'd like angular's DI to inject an instance of our controller to our test, but controllers are not singltons as services.

Therefore, we will:
<ol>
	<li>inject the <a href="https://docs.angularjs.org/api/ngMock/service/$controller">$controller</a> service</li>
	<li>use it to instance a controller for us</li>
</ol>
[code language="javascript" gutter="false"]
var $controller;
beforeEach(module('MyModule'));
beforeEach(inject(function(_$controller_) {
    $controller = _$controller_; })
);
it('test greetUpperCase()', function() {
    var ctrl = $controller('MyController');
    expect(ctrl.greetUpperCase('bob')).toBe('HELLO BOB');
});
[/code]

https://jsfiddle.net/ronapelbaum/tcmsw688/
<h3>Testing controller with $scope</h3>
Now, if you're still workng with $scope:

[code language="javascript" gutter="false"]
function MyController($scope, MyService) {
 $scope.greetUpperCase = function(name) {
  return MyService.greet(name).toUpperCase();
 }
}
[/code]

Basically, when you're working with $scope, you don't really care about the controller itself, since it's doing everything on it's scope.

So, we will need to:
<ol>
	<li>inject $rootScope</li>
	<li>create a new scope</li>
	<li>inject it to a new controller</li>
	<li>test the $scope</li>
</ol>
[code language="javascript" gutter="false"]
it('test greetUpperCase()', function() {
 var myScope = $rootScope.$new();
 $controller('MyController', {
  $scope: myScope
 });
 expect(myScope .greetUpperCase('bob')).toBe('HELLO BOB');
});
[/code]
https://jsfiddle.net/ronapelbaum/pkhaxmdg/
