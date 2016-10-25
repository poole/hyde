---
layout: post
title: upgrade your angular II - controllers
date: 2016-10-25
author: ronapelbaum
comments: true
tags: []
---

In [previous post](https://ronapelbaum.github.io/2016/08/08/upgrade-your-angular/) we've seen how to take your angular services one step into the future.
<br/>
Now, let's talk about controllers. 

## Where is my *$scope*?
First thing you should know - they've killed the `$scope`. Well, not really killed it, you can still keep using it in angular 1.x, but it is best to use it as a service, and not as a state manager.
<br />
Assume that you have a controller, that uses a service to get more details from server:

```javascript
angular.module('app')
    .controller('MyController', ['$scope', 'DetailsService', 
        function($scope, DetailsService){
            $scope.logDetails = function(){
                console.log(DetailsService.getDetails($scope.name));
            };
        }
    ]);
```

And HTML:

```html
<div ng-controller="MyController">
    <input placeholder="name" ng-model="name"/>
    <button ng-click="logDetails()">Log Details</button>
</div>
```

### controllerAs
Welcome to the real world.
<br />
Depending on the `$scope` hierarchy as the store of all data, is not a good idea. Instead, we'd like to use the javascript scope of the controller instance.
<br/>
**Controller instance?**
Yes. Your controller function is in fact a *constructor* that create controller instances.

```javascript
angular.module('app')
    .controller('MyController', ['DetailsService', 
        function(DetailsService){
            this.logDetails = function(){
                console.log(DetailsService.getDetails(this.name));
            };
        }
    ]);
```

Now the state is on the `this` of the controller instance.
<br/>
Another writing style is to use `that`:

```javascript
angular.module('app')
    .controller('MyController', ['DetailsService', 
        function(DetailsService){
            var that = this;
            that.logDetails = function(){
                console.log(DetailsService.getDetails(that.name));
            };
        }
    ]);
```

> **Tip**<br/>
> I find it very easy to refactor the code, if we just add the `var that = this;` statement at the beginning of the controller, and then just replacing (ctrl+R) all `$scope` with `that`.

In the HTML we will use the [`controller as`](https://docs.angularjs.org/api/ng/directive/ngController) syntax:

```html
<div ng-controller="MyController as ctrl">
     <input placeholder="name" ng-model="ctrl.name"/>
     <button ng-click="ctrl.logDetails()">Log Details</button>
</div>
```

For further reading, I recommend [Todd Motto's post](https://toddmotto.com/digging-into-angulars-controller-as-syntax/).

> **Note**<br/>
> You can still inject and use the $scope for other purposes (i.e. `$broadcast`), but just don't use it as a state manager.
 
## class style
Now it is clear to use that the controller function is in fact a constructor function.
So let's refactor to class style:

```javascript
(function () {
    function MyController(DetailsService) {
        this.logDetails = function () {
            console.log(DetailsService.getDetails(this.name));
        };
    }

    MyController.$inject = ['DetailsService'];

    angular.module('app').controller('MyController', MyController);

})();
```

Now, the definition of MyController is private withing that anonymous function. Note that angular.module(...) refers to the angular object on the global scope.

## class with [prototype](http://www.w3schools.com/js/js_object_prototypes.asp)
You may also write your class with `prototype`. It is considered best practice, but I find it a bit overhead...

```javascript
(function () {
    function MyController(DetailsService) {
        this.name = null;
        this.DetailsService = DetailsService;
    }

    MyController.prototype.logDetails = function () {
       console.log(this.DetailsService.getDetails(this.name));
    };
    
    MyController.$inject = ['DetailsService'];

    angular.module('app').controller('MyController', MyController);

})();
```

Let's wait for TypeScript...