---
layout: post
title: upgrade your angular
date: 2016-08-08 10:00
author: ronapelbaum
comments: true
tags: [javascript, angularjs]
desc: let's start talking about how to upgrade your angular 1.x code into more updated code style...
---
So you've probably seen already some concepts and code examples of [angular 2](https://angular.io/). 
Maybe you've even took the [great tutorial](https://angular.io/docs/ts/latest/tutorial/).

But now you ask yourself: Can I take my current angular 1.x project and upgrade it to angular 2? How to do that?

This will probably not be easy, but here are some refactoring that you probably should do anyway...

## The Goal - class oriented code
If you take a look at the example of a service in angular 2, you'll see something like this:

```typescript
@Injectable()
export class HeroService {
    getHeroes() {
    }
}
```

It doesn't really matter if you prefer TypeScript or ES6, the main concept here is the use of **class**.

But, wait a minute!

Where is the `angular.module(...)`? What is a **class?** How is it even slightly resemble to my current angular code?

## Your code
As usual, we'll start with services.

Your current angular 1.x probably looks something like that:

```javascript
angular.module('app').service('MyService', ['OtherService', function(OtherService){
    this.foo = function(){
        OtherService.goo();
    }
}]);
```

This is a straight forward service declaration of angular 1, as we were taught at the docs. What do we have here?
1. angular, please *get* module "app".
2. please *provide* a service named "MyService".
3. when you provide this service, use this *constructor*.

Yes, the function that we are writing here is a constructor to an *instance* of an anonymous type. 
Why anonymous? because we use angular, and we trust it to manage **all** of our object instances and dependencies. 
Basically, on demand of "MyService", angular calls this constructor (once, since services are singletons) and creates a (single) instance.

## Write *function*, Think *class*
Let's try to make our code better:

```javascript
function MyService(OtherService) {
  this.foo = function () {
    OtherService.goo();
  }
}
MyService.$inject = ['OtherService'];

angular.module('app').service('MyService', MyService);
```

What do we have here?

The *function* MyService, is our constructor, and it is register to angular as a service. We can now refer to MyService as a *class*.

The class also has a static member that tells angular where to look for dependencies to inject (since you're probably minify your code on production).

## javascript modules
How do you get your javascript code into the browser? you are probably doing something like this:

```html
<script src="app.js"></script>
<script src="OtherService.js"></script>
<script src="MyService.js"></script>
```

While loading all your script to the browser like this is however a bit old fashioned it is very ok (I'll talk about javascript module loading and [webpack](https://webpack.github.io/) in the future).

The problem with our new code, that now our MyService class is on the global sopce, and this is bad for many reasons. We do not want to pollute our global scope.

What can we do about that?

## Self Invoking Function
An important pattern to use here is [self-invoking functions](http://www.w3schools.com/js/js_function_definition.asp). It means defining an anonymous function and executing it immediately:

`(function(){...})();`

Let'e see our code now:

```javascript
(function () {
    function MyService(OtherService) {
        this.foo = function () {
            OtherService.goo();
        }
    }
    MyService.$inject = ['OtherService'];

    angular.module('app').service('MyService', MyService);
})();
```

Now, the definition of MyService is *private* withing that anonymous function. Note that `angular.module(...)` refers to the angular object on the global scope.

## This is it?
For now...

This is a very simple refactoring, and I'll try to take it to the next level in the future...

But, what about controllers? and directives?

That will probably be my [next post](/2016/10/25/upgrade-your-angular-controllers/)...


