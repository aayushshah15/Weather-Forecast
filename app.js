var weather = angular.module('weather', ['ngRoute', 'ngResource']);
weather.config(function ($routeProvider) {
	$routeProvider
	.when('', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
	.when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller:'forecastController'
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

weather.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope,$resource, $routeParams, cityService){
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '5';
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
	$scope.apiKey = 'YOUR API KEY';
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });
	$scope.weatherResult = $scope.weatherAPI.get({
		q: $scope.city, cnt: $scope.days, APPID: $scope.apiKey
	});
	$scope.convertToDegree = function(degk) {
		return Math.round(degk - 273.15);
	};
	$scope.convertToDate = function (date) {
		return new Date(date * 1000);
	}
}]);
