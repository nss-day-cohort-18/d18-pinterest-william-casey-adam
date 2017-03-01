"use strict";

app.factory("PintFBCalls", function($q, $http, FBCreds) {

// get a list of boards for that user (uid)
	let getBoards = (userID) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${userID}"`)
			.then((returnedBoards) => {
				resolve(returnedBoards);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// get a list of pins that are on one particular board
	let getPinsOnBoard = (boardID) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardid"&equalTo="${boardID}"`)
			.then((returnedPins) => {
				resolve(returnedPins);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// create a board within the boards object on FB
	let createBoard = (boardObj) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/boards.json`,
			JSON.stringify(boardObj))
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// create a pin within the pins object on FB
	let createPin = (pinObj) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/pins.json`,
			JSON.stringify(pinObj))
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// create a user within the users object on FB
	let createUser = (userObj) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/users.json`,
			JSON.stringify(userObj))
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {getBoards, getPinsOnBoard, createBoard, createPin, createUser};

});






