---
layout: post
title: angular unit test with DI (Part 1)
date: 2016-02-21 20:45
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
<div>After we've set-up the initial tests for our cute controllers and services, let' get to the real world. In the real world, controllers user services, and services use services, and everything is just swimming in the big browsers jacuzzi...</div>
<div></div>
<div>But we are here to make some <i>unit-tests</i>, so the question is:</div>
<h4>How to reduce complexity of runtime dependencies in our test?</h4>
<div>Lucky for us, angular is <a href="https://docs.angularjs.org/guide/unit-testing">designed</a> for that, by using <a href="https://docs.angularjs.org/guide/di">dependency injection</a>.</div>
<div></div>
<h3><strong>Dependency injection in 30 sec.</strong></h3>
<div>Let's say that we have this service:</div>
<div></div>
```javascript
function MyDataService(){
    this.getName = function(){
        return 'bob';
    }
}
```
<div>and this controller</div>
```javascript
function MyController() {
    this.greet = function () {
        return 'hello ' + MyDataService.getName();
    }
}
```
<div>This is an example for <i>bad coding</i>.</div>
<div>Why?</div>
<div>Because the controller is using the service directly from the global scope.</div>
<div>When you write good code with angular, you don't access your dependencies directly, but use angular to inject them for you.</div>
```javascript
function MyController(MyDataService) {
    this.greet = function () {
        return 'hello ' + MyDataService.getName();
    }
}
```
<div>the controller now expects to get the service in it's init params, and all is regieterd to angular:</div>
<div>

```javascript
angular.module('MyModule', [])
    .service('MyDataService', MyDataService)
    .controller('MyController', ['MyDataService', MyController]);
```
<h3>Now back to unit testing...</h3>
<div>How do we test the controller without testing the service?</div>
<div></div>
<div>Well, jasmine here helps us with <a href="http://jasmine.github.io/2.0/introduction.html#section-Spies">spies</a>.</div>
<div>Since we are instantiating a new controller for each test, we can use angular's DI to inject a 'mock' service instead of the 'real' service:</div>
```javascript
it(&quot;test greet() - expect spyObj.getName() to have been called&quot;, function() {
    var spyObj = jasmine.createSpyObj('MockService', ['getName']);

    var ctrl = $controller(&amp;amp;quot;MyController&amp;amp;quot;, {
        MyDataService: spyObj
    });
    ctrl.greet();
    expect(spyObj.getName).toHaveBeenCalled();
});
```
<div>Here we are testing that our tested code, the controller, is doing as expected and calling the service.</div>
<div>we can also mock the output:</div>
```javascript
it(&quot;test greet() - mock spyObj.getName() to return 'alice'&quot;, function() {
    var spyObj = jasmine.createSpyObj('MockService', ['getName']);
    spyObj.getName.and.returnValue('alice');

    var ctrl = $controller(&amp;amp;quot;MyController&amp;amp;quot;, {
        MyDataService: spyObj
    });
    expect(ctrl.greet()).toBe('hello alice');
});
```
<div><a href="https://jsfiddle.net/ronapelbaum/Luug0kd8/">https://jsfiddle.net/ronapelbaum/Luug0kd8/</a></div>
</div>
