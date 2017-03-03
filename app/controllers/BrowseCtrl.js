"use strict";


app.controller("BrowseCtrl", function($scope, $location, PinsFactory, AuthorizeFactory, BoardsFactory) {

  $scope.pin = {};
  $scope.boards = [];
  let currentUser = AuthorizeFactory.getUser();

  BoardsFactory.getBoards(currentUser).
  then(function(boards) {
  	$scope.boards = boards;
  });

	PinsFactory.browsePins()
	.then(function(returnedPins){
		console.log('returnedPins:', returnedPins);
		$scope.pins = returnedPins;
		console.log('$scope.pins:', $scope.pins);
	});

    $scope.getPinInfo = function (thisPin) {
        console.log('thisPin =', thisPin);
        $scope.pin = thisPin;
    };

    $scope.addPin = function() {
    	if ($scope.pin.boardid === undefined) {
				$(".newBrowsePinAlert").hide().show('medium');
				return;
			}
      console.log('currentUser in addPin = ', currentUser);
      $scope.pin.uid = currentUser;
      console.log("Saving pin: ", $scope.pin);
      PinsFactory.createPin($scope.pin);
      $('#pinThisModal').modal('hide');
      $scope.pin = {};
    };

    $scope.updateSelectedPin = (board) => {
    	$scope.pin.boardid = board.id;
			$scope.CurrentPinBoardDisplay = board.title;
    };
});