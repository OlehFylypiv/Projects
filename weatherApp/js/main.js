let app = angular.module("weatherApp", []);
app.controller("weatherCtrl", function($scope, $http) {
	$http.get("http://ip-api.com/json").success(function(data) {
		$scope.lat = data.lat;
		$scope.lon = data.lon;
		let apiKey = "66ec30036897f68be2a58468e5564c20";
		let openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + $scope.lat + "&lon=" + $scope.lon + "&APPID=" + apiKey;
		$http.get(openWeatherURL).success(function(data) {
			$scope.description = data.weather[0].description;
			$scope.speed = "Wind speed " + data.wind.speed + " kmph";
			$scope.name = data.name;
			$scope.temp = data.main.temp;
			$scope.cTemp = ($scope.temp - 273).toFixed(1) + " °C";
			$scope.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			$scope.country = data.sys.country;
		});
	});
	$scope.searchWeatherInDifCity = function() {
        let apiKey1 = "66ec30036897f68be2a58468e5564c20";
        let openWeatherURLSearch = "http://api.openweathermap.org/data/2.5/weather?q=" + $scope.city + "&appid=" + apiKey1;
       	$http.get(openWeatherURLSearch).success(function(data) {
			$scope.descriptionSearch = data.weather[0].description;
			$scope.speedSearch = "Wind speed " + data.wind.speed + " kmph";
			$scope.nameSearch = data.name;
			$scope.tempSearch = data.main.temp;
			$scope.cTempSearch = ($scope.tempSearch - 273).toFixed(1) + " °C";
			$scope.iconSearch = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			$scope.countrySearch = data.sys.country;
			$scope.addHeaderText = "In Search City";		
		});
    };
});