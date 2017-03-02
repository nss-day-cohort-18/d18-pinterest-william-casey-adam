"use strict";

app.controller("BrowseCtrl", function($scope, $location, PinsFactory, SearchFilter) {

console.log("Loaded a blank BrowseCtrl.js :D");

		$scope.SearchText = SearchFilter;
		console.log('$scope.search in browse:', $scope.SearchText);
		$scope.pins = [];


 

		PinsFactory.browsePins()
			.then(function(returnedPins){
				console.log('returnedPins:', returnedPins);
				angular.forEach(returnedPins.data, function(pin){
					$scope.pins.push(pin);	
				});
				 console.log('$scope.pins:', $scope.pins);
			});



});