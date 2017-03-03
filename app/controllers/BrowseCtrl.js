"use strict";


app.controller("BrowseCtrl", function($scope, $location, PinsFactory, AuthorizeFactory, BoardsFactory) {

  $scope.pin = {};
  $scope.boards = [];
  $scope.pins = [];
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
        $(".newBrowsePinAlert").hide();
        $scope.pin.boardid = undefined;
        Object.assign($scope.pin, thisPin);
        $scope.CurrentPinBoardDisplay = "";
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