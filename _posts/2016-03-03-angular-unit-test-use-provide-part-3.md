---
layout: post
title: angular unit test  – use $provide (Part 3)
date: 2016-03-03 19:31
author: ronapelbaum
comments: true
categories: [angular-jasmine, javascript]
---
After we've managed to help jasmine's spies infiltrate a 'real' service that was injected with angular's dependency-injection mechanism, it's time to mess up with the DI itself.

Until now, before each test, we've declared:

[code language="javascript" gutter="false"]
beforeEach(angular.mock.module('MyModule'));
[/code]

This is a call to <em>angular.mock</em> to set the "name space" for the injector.
But this might not be enough...
What if our tested service is using a module that we don't have (or don't want to have) access to in the tests?
What if we have a service in our current module that we don't want to instantiate (i.e. constructor is too heavy)?
<h4>Overriding dependencies</h4>
[code language="javascript" gutter="false"]
beforeEach(angular.mock.module(function($provide) {
    $provide.value('MyDataService', spyObj);
}));
[/code]

So, what do we have here?
We are using <em>$provide()</em>, telling angular to provide use with the <em>spyObj</em> when we ask for '<em>MyDataService</em>'.
This is not something from <em>ngMock</em>, it's core angular.

Here we are 'creating' a module configuration with angular, and registering it to the test scope using <em>angular.mock.module()</em>.
When we call it after we've called another <em>module()</em> function, we override any previous definitions of a service with the same name.
Now, our <em>spyObj</em> will be injected anywhere in the test scope, and angular won't have the delight to construct an instance of '<em>MyDataService</em>'.
Pay attentions that all <em>module()</em> functions must be called before any <em>inject()</em> functions.

https://jsfiddle.net/ronapelbaum/197rb26z/

<strong>Note</strong>:

We used <em>$provide.value()</em>, since we've already created the service instance.

You can use also <em>$provide.service()</em>:

[code language="javascript" gutter="false"]
beforeEach(angular.mock.module(function($provide) {
    $provide.service('MyDataService', function(){
        return spyObj;
    });
}));
[/code]
