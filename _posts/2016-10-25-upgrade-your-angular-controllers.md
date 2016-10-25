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
First thing you should know - they've killed the *$scope*. Well, not really killed it, you can still keep using it in angular 1.x, but it is best to use it as a service, and not as a state manager.
<br />
Assume that you have a controller, that uses a service to get more details from server:

```javascript
angular.module('app').controller('MyController', ['$scope', 'OtherService', function($scope, OtherService){
    $scope.greet = function(){
        console.log(OtherService.getDetails($scope.name));
    };
}]);
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
Your controller function is in fact a *constructor* that create controller instances.
You shouldn't depend on the $scope hierarchy as the store of all data. Instead, use the javascript scope of the controller instance:

```javascript
angular.module('app').controller('MyController', ['OtherService', function(OtherService){
    this.logDetails = function(){
        console.log(OtherService.getDetails(this.name));
    };
}]);
```

In the HTML we will use the [`controller as`](https://docs.angularjs.org/api/ng/directive/ngController) syntax:

```html
<div ng-controller="MyController as ctrl">
     <input placeholder="name" ng-model="ctrl.name"/>
     <button ng-click="ctrl.logDetails()">Log Details</button>
</div>
```

For further reading, I recommend [Todd Motto's post](https://toddmotto.com/digging-into-angulars-controller-as-syntax/).

#### Note
You can still inject and use the $scope for other purposes (i.e. `$broadcast`), but just don't use it as a state manager.
 
## class style
Now it is clear to use that the controller function is in fact a constructor function.
So let's refactor to class style:

```javascript
(function () {
    function MyController(OtherService) {
        this.logDetails = function () {
            console.log(OtherService.getDetails(this.name));
        };
    }

    MyController.$inject = ['OtherService'];

    angular.module('app').controller('MyController', MyController);

})();
```

Now, the definition of MyController is private withing that anonymous function. Note that angular.module(...) refers to the angular object on the global scope.