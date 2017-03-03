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
	$scope.selectedPin = {}; // new object for editing pins
	$scope.boards = []; // list of boards from fb
	$scope.board = {}; // new object for creating
	$scope.selectedBoard = {}; // new object for editing boards
	$scope.slctBrdPins = [];
	$scope.CurrentPinBoardDisplay = "";
	$scope.NewPinBoardDisplay = "";

// get users to match info displayed on screen for updates
// if user does not exist with that uid create a new one
	let loadUserInfo = () => {
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
					$scope.fbUser.url = userArray[i].url;
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
	};

// load board info for displaying
	let loadBoardInfo = () => {
		BoardsFactory.getBoards(currentUser).
		then(function(boards) {
			$scope.boards = boards;
		});
	};

// loads pin info for displaying
	let loadPinInfo = () => {
		PinsFactory.getPinsForUser(currentUser).
		then(function(pins) {
			$scope.pins = pins;
		});
	};

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
			.then(function () {
				loadUserInfo();
			});
		}
	};

	$scope.updateNewPin = (board) => {
		$scope.pin.boardid = board.id;
		$scope.NewPinBoardDisplay = board.title;
	};

	$scope.updateSelectedPin = (board) => {
		$scope.selectedPin.boardid = board.id;
		$scope.CurrentPinBoardDisplay = board.title;
	};

// allow users to create a new pin
	$scope.createNewPin = function() {
		if ($scope.pin.boardid === undefined) {
			$(".newPinAlert").hide().show('medium');
			return;
		}
		console.log("Clicked to make a new pin of: ", $scope.pin);
		$scope.pin.uid = currentUser;
		PinsFactory.createPin($scope.pin).
		then(function() {
			loadPinInfo();
		});
		$scope.pin = {};
		$('#pinsModal').modal('hide');
	};

// allow users to create a new board
	$scope.createNewBoard = function() {
		$scope.board.uid = currentUser;
		console.log("Clicked to make a new board of: ", $scope.board);
		BoardsFactory.createBoard($scope.board).
		then(function() {
			loadBoardInfo();
		});
		$scope.board = {};
	};

	$scope.selectBoard = (board) => {
		$(".delete-board-alert").hide();
		$scope.slctBrdPins = [];
		$scope.selectedBoard = board;
		$scope.pins.forEach(function(each){
			if (board.id === each.boardid) {
				$scope.slctBrdPins.push(each);
			}
		});
	};

	$scope.selectPin = (pin) => {
		$scope.selectedPin = pin;
		$scope.boards.forEach(function(each){
			if (pin.boardid === each.id) {
				$scope.CurrentPinBoardDisplay = each.title;
			}
		});
	};

	$scope.editBoard = (id) => {
		BoardsFactory.updateBoard(id, $scope.selectedBoard).
		then(function() {
			loadBoardInfo();
		});
	};

	$scope.editPin = (id) => {
		PinsFactory.updatePin(id, $scope.selectedPin).
		then(function() {
			loadPinInfo();
		});
	};

	$scope.deleteBoard = (id) => {
		if ($scope.slctBrdPins.length !== 0) {
			$(".delete-board-alert").hide().show('medium');
			return;
		} else {
			console.log("deleteBoardId: ", id);
			BoardsFactory.deleteBoard(id).
			then(function() {
				loadBoardInfo();
			});
			$('#SelectedBoardsModal').modal('hide');
		}
	};

	$scope.deletePin = (id) => {
	 PinsFactory.deletePin(id).
	 then(function() {
	 	loadPinInfo();
	 });
	};

	$scope.deletePinOnBoard = (pin) => {
		PinsFactory.deletePin(pin.id).
		then(function() {
			loadPinInfo();
		});
		$scope.slctBrdPins.splice(pin, 1);
	};

	$scope.removeNewPinAlert = () => {
		$(".newPinAlert").hide();
	};

	loadUserInfo();
	loadPinInfo();
	loadBoardInfo();

});