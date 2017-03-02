"use strict";

app.factory("BoardsFactory", function($q, $http, FBCreds) {

// get a list of boards for that user (uid)
	let getBoards = (userID) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${userID}"`)
			.then((returnedBoards) => {
				let boardsArray = returnedBoards.data;
				let boards = [];
				Object.keys(boardsArray).forEach((each) => {
					boardsArray[each].id = each;
					boards.push(boardsArray[each]);
				});
				resolve(boards);
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
				console.log("just pushed up board");
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let deleteBoard = (boardID) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/boards/${boardID}.json`)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// allows users to update their board names in firebase
	let updateBoard = (boardID, boardObj) => {
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/boards/${boardID}.json`,
			angular.toJson(boardObj))
			.then((success) => {
				resolve(success);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {getBoards, createBoard, deleteBoard, updateBoard};

});







