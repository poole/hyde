---
layout: post
title: angular-jasmine 101 reference
date: 2016-03-30 09:28
author: ronapelbaum
comments: true
tags: [angular-jasmine, javascript]
---
[gallery ids="382,383" type="rectangular"]
<h2>motivation</h2>
<ul>
	<li>script "compile": https://jsfiddle.net/ronapelbaum/d8s1not8/</li>
	<li>modular code: https://jsfiddle.net/ronapelbaum/y959gzeg/</li>
	<li>very fast</li>
</ul>
<h1></h1>
<h2>jasmine</h2>
<h4>jasmine introduction</h4>
<ul>
	<li>http://jasmine.github.io/</li>
	<li>test a function: https://jsfiddle.net/ronapelbaum/u6dLzpmc/</li>
	<li>test an object: https://jsfiddle.net/ronapelbaum/32medvkz/6/</li>
</ul>
<h4>jasmine spies</h4>
<ul>
	<li>spyOn: https://jsfiddle.net/ronapelbaum/8Lsbps4u/</li>
	<li>spyOn and return: https://jsfiddle.net/ronapelbaum/gx4Lwb48/</li>
	<li>createSpyObj: https://jsfiddle.net/ronapelbaum/rtm3wyvm/3/</li>
	<li>callFake + callbacks : https://jsfiddle.net/ronapelbaum/ex41dsec/</li>
</ul>
<h2></h2>
<h2>angular + jasmine</h2>
<h4>ngMock</h4>
<ul>
	<li>ng-mock: https://docs.angularjs.org/api/ngMock</li>
	<li>angular.mock.module</li>
	<li>angular.mock.inject</li>
</ul>
<h4>testing services 1</h4>
<ul>
	<li>simple service test : https://jsfiddle.net/ronapelbaum/ruv0u3ef/</li>
	<li>service test with spyOn: https://jsfiddle.net/ronapelbaum/a82kkvjx/2/</li>
</ul>
<h4>testing controllers</h4>
<ul>
	<li>use $controller - controllers are NOT singleton</li>
	<li>stateless controller: https://jsfiddle.net/ronapelbaum/4hbb79rg/</li>
	<li>controller as (state on this) : https://jsfiddle.net/ronapelbaum/uneb5gu5/</li>
	<li>controller with $scope (state on scope): https://jsfiddle.net/ronapelbaum/z8g8mk3h/</li>
	<li>controller with dI (createSpyObj): https://jsfiddle.net/ronapelbaum/z8g8mk3h/7/</li>
</ul>
<h4>testing services with real DI</h4>
<ul>
	<li>service with inject(spyOn): https://jsfiddle.net/ronapelbaum/z34kyuev/4/</li>
	<li>$provide: https://docs.angularjs.org/api/auto/service/$provide</li>
	<li>service with real DI (createSpyObj): https://jsfiddle.net/ronapelbaum/cLakkvy6/</li>
</ul>
<h4>testing directives</h4>
<ul>
	<li>use $compile</li>
	<li>test element - use jqlite selectors test</li>
	<li>directive using attrs: https://jsfiddle.net/ronapelbaum/xgojw58j/</li>
	<li>directive using scope + $watch: https://jsfiddle.net/ronapelbaum/qorkcnnL/2/</li>
</ul>
<h4>other angular patterns:</h4>
<ul>
	<li>$http: https://jsfiddle.net/ronapelbaum/bhLmdkms/</li>
	<li>$timeout: https://jsfiddle.net/ronapelbaum/9mt79yaf/</li>
	<li>events: https://jsfiddle.net/ronapelbaum/9pogcprf/</li>
	<li>promise: https://jsfiddle.net/ronapelbaum/nd8t4ef0/</li>
</ul>
&nbsp;
<h3>Finally</h3>
Test writing challange:

https://github.com/ronapelbaum/mangal/tree/master

&nbsp;
