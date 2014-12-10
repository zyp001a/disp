var rootApp = angular.module('rootApp', [
	'ngRoute'^^if(angularDeps)angularDeps.forEach(function(nd){$$, '^^=nd$$'^^})$$
]);


rootApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
			^^routes.forEach(function(route){$$
				^^if(route.isHome){$$
			when('/', {
				templateUrl: 'assets/partials/^^=route.name$$.html',
        controller: '^^=route.controller$$',
				access: ^^=route.access || 3$$
			}).
				^^}else if(route.param){$$
			when('/^^=route.name$$/:id', {
				templateUrl: 'assets/partials/^^=route.name$$.html',
        controller: '^^=route.controller$$',
				access: ^^=route.access || 2$$
			}).
				^^}else{$$
      when('/^^=route.name$$', {
        templateUrl: 'assets/partials/^^=route.name$$.html',
        controller: '^^=route.controller$$',
				access: ^^=route.access || 2$$
			}).
				^^}$$
			^^})$$

			otherwise({
        redirectTo: '/error'
      });
}]);



 
^^runs.forEach(function(run){$$
^^=run.content$$
^^})$$


