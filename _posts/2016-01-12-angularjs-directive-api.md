---
layout: post
title: angularjs directive api pattern
date: 2016-01-12 21:23
author: ronapelbaum
comments: true
categories: [angularjs, javascript]
tags: [angularjs, javascript]
---
suppose you're using angular and you have a directive that you pass data to:
<pre><code>&lt;my-chart data="chartData"&gt;&lt;/my-chart&gt;
</code></pre>
suppose the directive needs to perform some logic when data changes. you'll probably use $watch:
<pre><code>angular.module('app')
.controller('MainController', function($scope){
    function dataChange(){
        $scope.chartData= {...};
    }
})
.directive('myChart', function(){
    return {
        scope: {data: '='},
        link: function(scope){
            function redraw(){...}
            scope.$watch('data', redraw);
        }
    };
});
</code></pre>
the problem with this solution is that it's dependent on angular's $digest loop.

here is a way to invoke the directive's redraw() directly from the controller:
<pre><code>angular.module('app')
.controller('MainController', function($scope){
    $scope.chartApi= {};//empty object
    function dataChange(){
        $scope.chartData = {...};
        $scope.chartApi.redraw();
    }
})
.directive('myChart', function(){
    return {
        scope: {data: '=', api: '='},
        link: function(scope){
            function redraw(){...}
            scope.api.redraw = redraw;
        }
    };
});
</code></pre>
and in html:
<pre><code>&lt;my-chart data="chartData" api="chartApi"&gt;&lt;/my-chart&gt;</code></pre>
