var weather = angular.module('weather', ['ngRoute', 'ngResource']);
weather.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
	.otherwise({
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
});
weather.service('cityService', function() {
	this.city = "New York";
});
weather.controller('homeController', ['$scope', 'cityService', function ($scope, cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);
weather.controller('forecastController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);