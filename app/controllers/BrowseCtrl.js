"use strict";

app.controller("BrowseCtrl", function($scope, $location, PinsFactory) {
	PinsFactory.browsePins()
	.then(function(returnedPins){
		console.log('returnedPins:', returnedPins);
		$scope.pins = returnedPins.data;
		console.log('$scope.pins:', $scope.pins);
	});
    $scope.addPin = function() {
        console.log("Saving pin: ", $scope.pin);
        $scope.pin = {};
    };
});