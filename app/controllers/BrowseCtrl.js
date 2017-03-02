"use strict";

app.controller("BrowseCtrl", function($scope, $location, PinsFactory, AuthorizeFactory) {
    $scope.pin = {};
	PinsFactory.browsePins()
	.then(function(returnedPins){
		console.log('returnedPins:', returnedPins);
		$scope.pins = returnedPins.data;
		console.log('$scope.pins:', $scope.pins);
	});
    $scope.getPinInfo = function (thisPin) {
        console.log('thisPin =', thisPin);
        $scope.pin = thisPin;
    };

    $scope.addPin = function() {
        let currentUser = AuthorizeFactory.getUser();
        console.log('currentUser in addPin = ', currentUser);
        $scope.pin.uid = currentUser;
        console.log("Saving pin: ", $scope.pin);
        PinsFactory.createPin($scope.pin);
        $scope.pin = {};
    };
});