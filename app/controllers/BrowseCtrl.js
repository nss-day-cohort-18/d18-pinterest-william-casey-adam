"use strict";

app.controller("BrowseCtrl", function($scope, $location, PinsFactory) {

console.log("Loaded a blank BrowseCtrl.js :D");

		

		PinsFactory.browsePins()
			.then(function(returnedPins){
				console.log('returnedPins:', returnedPins);
				$scope.pins = returnedPins;
				console.log('$scope.pins:', $scope.pins);
			});



});