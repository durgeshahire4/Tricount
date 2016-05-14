var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._;
}])


var myapp = angular.module('tricountApp', ['ngRoute', 'ngCookies','underscore']);

myapp.run(function ($location, $rootScope, $cookieStore) {

	$rootScope.globals = $cookieStore.get('globals') || {};
	if ($rootScope.globals.currentUser) {
		$location.url('/Home');
	} else {
		$location.url('/Login');
	}
	
});

myapp.config(['$routeProvider',function($routeProvider) {
 $routeProvider.when('/Login', {
 	templateUrl : 'Login/login.html',
 	controller: 'LoginController'
 }).when('/Home', {
 	templateUrl : 'Home/index.html',
 	controller: 'HomeController'
 })
}]); 