---
layout: post
title: javascript unit test with angular 1.x (course reference)
date: 2016-03-30 09:28
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
publish: true
desc: This is a reference to the course "javascript unit-testing with angular 1.x"
---

Reference for angular unit testing course. 

# Motivation

#### script "compile"
Our javascript code never gets compiled, hence we are open to *a lot* of runtime errors.. 

<iframe width="100%" height="150" src="//jsfiddle.net/ronapelbaum/d8s1not8/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

#### testable code === modular code
When we write with angular, we often mistake with our module separation.
```javascript
angular.module('a', [])
    .service('ServiceA', function() {
        this.getName = function() {
            return 'bob';
        }
    });
angular.module('b', [])
    .service('ServiceB', ['ServiceA', function(ServiceA) {
        this.greet = function() {
            return 'Hello ' + ServiceA.getName()
        }
    }]);
angular.module("app", ['a', 'b'])
    .controller("myCtrl", function($scope, ServiceB) {
        $scope.data = ServiceB.greet();
    });
```

#### very fast
Yes.
Javascript unit testing is *much* faster than the alternative, slow UI testing.. 


# jasmine
## jasmine introduction

Check out jasmine [docs](http://jasmine.github.io/)

#### test a javascript function
<iframe width="100%" height="320" src="//jsfiddle.net/ronapelbaum/u6dLzpmc/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

#### test a javascript object
Solve this:
<iframe width="100%" height="540" src="//jsfiddle.net/ronapelbaum/32medvkz/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

[solution](http://jsfiddle.net/ronapelbaum/32medvkz/6/)

#### testable code
How can we test this?
```javascript
var Greeter = function() {
    function greet(name) {
        //TODO this is complex code
        console.log("Hello " + name);
    }
    this.greet = greet;
};
```

## jasmine spies

#### spyOn
<iframe width="100%" height="750" src="//jsfiddle.net/ronapelbaum/8Lsbps4u/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

#### dependency injection?
How can we test this?
```javascript
var LastNameService = function() {
    this.getLastName = function(firstName) {
        switch (firstName) {
            case "Bob":
                return "Marley";
            case "Phill":
                return "Collins";
        }
    }
};

var Greeter = function() {
    var dataService = new LastNameService();
    
    this.greet =  function greet(name) {
        return "Hello " + name + " " + dataService.getLastName(name);
    };
};
```

##### spyOn and return
Solve this:
<iframe width="100%" height="800" src="//jsfiddle.net/ronapelbaum/v6otvszz/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

[solution](http://jsfiddle.net/ronapelbaum/v6otvszz/3/)

##### createSpyObj
Solve this:
<iframe width="100%" height="800" src="//jsfiddle.net/ronapelbaum/v6otvszz/6/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 
[solution](http://jsfiddle.net/ronapelbaum/v6otvszz/4/)

# angular + jasmine
### [ngMock](https://docs.angularjs.org/api/ngMock)
- angular.mock.module
- angular.mock.inject

### testing services 1

##### simple service test 
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/ruv0u3ef/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### service test with spyOn
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/a82kkvjx/2/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

### testing controllers

- use $controller - controllers are NOT singleton

##### stateless controller
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/4hbb79rg/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### controller as (state on this) 
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/uneb5gu5/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### controller with $scope (state on scope)
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/z8g8mk3h/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### controller with dI (createSpyObj)
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/z8g8mk3h/7/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

### testing services with real DI

##### service with inject(spyOn)
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/z34kyuev/4/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### $provide
https://docs.angularjs.org/api/auto/service/$provide

##### service with real DI (createSpyObj)
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/cLakkvy6/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

### testing directives

- use $compile
- test element - use jqlite selectors test
##### directive using attrs
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/xgojw58j/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### directive using scope + $watch
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/qorkcnnL/2/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

### other angular patterns:

##### $http
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/bhLmdkms/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
 
##### $timeout
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/9mt79yaf/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### events
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/9pogcprf/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### promise
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/nd8t4ef0/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

### Finally
Test writing challange:

https://github.com/ronapelbaum/mangal/tree/master
