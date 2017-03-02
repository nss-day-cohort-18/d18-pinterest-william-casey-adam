"use strict";

app.controller("ProfileCtrl", function($scope, $location, $window, UserFactory, BoardsFactory, PinsFactory, AuthorizeFactory) {

// get current userId (fb name) &  uid to store values for update
	let currentUser = AuthorizeFactory.getUser();
	let currentUserObj = AuthorizeFactory.getUserObj();
	let currentUserId;
	let userExists = false; // indicator for user existing
	$scope.fbUser = {}; // object for personal info
	$scope.pins = []; // list of pins from fb
	$scope.pin = {}; // new object for creating
	$scope.boards = []; // list of boards from fb
	$scope.board = {}; // new object for creating

// get users to match info displayed on screen for updates
// if user does not exist with that uid create a new one
	UserFactory.getUsers().
	then(function(userArray){
		for (var i = 0; i < userArray.length; i++) {
			if (userArray[i].uid === currentUser) {
				console.log("found user in FB: ", userArray[i].uid);
				currentUserId = userArray[i].id;
				$scope.fbUser.lastName = userArray[i].lastName;
				$scope.fbUser.firstName = userArray[i].firstName;
				$scope.fbUser.userName = userArray[i].userName;
				$scope.fbUser.id = userArray[i].id;
				userExists = true;
				return;
			}
		}
		userExists = false;
		let nameArray = currentUserObj.displayName.split(" ");
		$scope.fbUser.firstName = nameArray[0];
		$scope.fbUser.lastName = nameArray[1];
		$scope.fbUser.uid = currentUser;
	});

	BoardsFactory.getBoards(currentUser).
	then(function(boards) {
		$scope.boards = boards;
		console.log("boards: ", $scope.boards);
	});

	PinsFactory.getPinsForUser(currentUser).
	then(function(pins) {
		$scope.pins = pins;
		console.log("pins: ", $scope.pins);
	});

// button toggles to show tabs at bottom of profile page
	$("#boardsBtn").click(function() {
		$("#boardsBtn").removeClass("active");
		$("#pinsBtn").addClass("active");
		$("#tab1").addClass("active");
		$("#tab2").removeClass("active");
	});

// button toggles to show tabs at bottom of profile page
	$("#pinsBtn").click(function() {
		$("#pinsBtn").removeClass("active");
		$("#boardsBtn").addClass("active");
		$("#tab1").removeClass("active");
		$("#tab2").addClass("active");
	});

// allow users to save changes they have made to their profile
	$scope.updateProfile = () => {
		console.log("User Object to update FB: ", $scope.fbUser);
		if (userExists === true) {
			UserFactory.updateUser(currentUserId, $scope.fbUser);
		} else if (userExists === false) {
			UserFactory.createNewUser($scope.fbUser)
			.then(function (result) {
				$window.location.reload(false);
			});
		}
	};

	$scope.updateNewPin = (boardid) => {
		$scope.pin.boardid = boardid;
	};

// allow users to create a new pin
	$scope.createNewPin = function() {
		console.log("Clicked to make a new pin of: ", $scope.pin);
		PinsFactory.createPin($scope.pin).
		then(function(blah) {
			$window.location.reload(false);
		});
		$scope.pin = {};
	};

// allow users to create a new board
	$scope.createNewBoard = function() {
		$scope.board.uid = currentUser;
		console.log("Clicked to make a new board of: ", $scope.board);
		BoardsFactory.createBoard($scope.board).
		then(function(blah) {
			$window.location.reload(false);
		});
		$scope.board = {};
	};

});