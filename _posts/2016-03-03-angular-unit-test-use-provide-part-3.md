---
layout: post
title: angular service test use $provide (DI p3)
date: 2016-03-03 19:31
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
After we've managed to help jasmine's spies infiltrate a 'real' service that was injected with angular's dependency-injection mechanism, it's time to mess up with the DI itself.

Until now, before each test, we've declared:

```javascript
beforeEach(angular.mock.module('MyModule'));
```

This is a call to *angular.mock* to set the "name space" for the injector.
But this might not be enough...
What if our tested service is using a module that we don't have (or don't want to have) access to in the tests?
What if we have a service in our current module that we don't want to instantiate (i.e. constructor is too heavy)?
#### Overriding dependencies
```javascript
beforeEach(angular.mock.module(function($provide) {
    $provide.value('MyDataService', spyObj);
}));
```

So, what do we have here?
We are using *$provide()*, telling angular to provide use with the *spyObj* when we ask for '*MyDataService*'.
This is not something from *ngMock*, it's core angular.

Here we are 'creating' a module configuration with angular, and registering it to the test scope using *angular.mock.module()*.
When we call it after we've called another *module()* function, we override any previous definitions of a service with the same name.
Now, our *spyObj* will be injected anywhere in the test scope, and angular won't have the delight to construct an instance of '*MyDataService*'.
Pay attentions that all *module()* functions must be called before any *inject()* functions.

<iframe width="100%" height="500" src="//jsfiddle.net/ronapelbaum/197rb26z/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

**Note**:

We used *$provide.value()*, since we've already created the service instance.

You can use also *$provide.service()*:

```javascript
beforeEach(angular.mock.module(function($provide) {
    $provide.service('MyDataService', function(){
        return spyObj;
    });
}));
```
