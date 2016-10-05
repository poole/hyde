---
layout: post
title: angular-jasmine 101 - course reference
date: 2016-03-30 09:28
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
publish: false
---

Reference for angular unit testing course. 

## motivation
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/m6Ltvh82/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

##### script "compile"
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/d8s1not8/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### modular code
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/y959gzeg/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

####  very fast


## jasmine
### jasmine introduction

Check out jasmine [docs](http://jasmine.github.io/)
### test a function
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/u6dLzpmc/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### test an object
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/32medvkz/6/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

### jasmine spies

#### spyOn
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/8Lsbps4u/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### spyOn and return
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/gx4Lwb48/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### createSpyObj
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/rtm3wyvm/3/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 

##### callFake + callbacks 
<iframe width="100%" height="300" src="//jsfiddle.net/ronapelbaum/ex41dsec/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe> 


## angular + jasmine
### ngMock

#### ng-mock
https://docs.angularjs.org/api/ngMock
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
