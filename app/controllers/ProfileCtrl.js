"use strict";

app.controller("ProfileCtrl", function($scope, $location, UserFactory, BoardsFactory, PinsFactory, AuthorizeFactory) {

// get current userId (fb name) &  uid to store values for update
	let currentUser = AuthorizeFactory.getUser();
	let currentUserId;
	$scope.fbUser = {};
	$scope.pin = {};
	$scope.board = {};

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
				return;
			}
		}
		console.log("didn't find user so making a new one");
		let newObj = {};
		newObj.uid = currentUser;
		UserFactory.createNewUser(newObj);
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
		UserFactory.updateUser(currentUserId, $scope.fbUser);
	};

// allow users to create a new pin
	$scope.createNewPin = function() {
		console.log("Clicked to make a new pin of: ", $scope.pin);
		$scope.pin = {};
	};

// allow users to create a new board
	$scope.createNewBoard = function() {
		console.log("Clicked to make a new board of: ", $scope.board);
		$scope.board = {};
	};

});