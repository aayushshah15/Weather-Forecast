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
	this.city = "London";
});
weather.controller('homeController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);

weather.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope,$resource,cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
	$scope.apiKey = '6d02ada16875b8cafa932b2f994360d6';
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
	$scope.weatherResult = $scope.weatherAPI.get({
		q: $scope.city, cnt: 2, APPID: $scope.apiKey
	});
}]);