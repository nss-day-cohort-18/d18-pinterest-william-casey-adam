"use strict";

app.factory("PinsFactory", function($q, $http, FBCreds) {

// grab the defaultPins boardId pins on the firebase object
	let browsePins = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardid"&equalTo="defaultPins"`)
			.then((returnedPins) => {
				let pinsArray = returnedPins.data;
                let pins = [];
                Object.keys(pinsArray).forEach((each) => {
                    pinsArray[each].id = each;
                    pins.push(pinsArray[each]);
                });
                resolve(pins);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let searchForPin = (titleOfPin) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="title"&equalTo="${titleOfPin}"`)
			.then((returnedPins) => {
				resolve(returnedPins);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// make a call to get all pins for one particular user
	let getPinsForUser = (userID) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${userID}"`)
			.then((returnedPins) => {
				resolve(returnedPins);
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

// create a pin within the pins object on FB
	let createPin = (pinObj) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/pins.json`,
			angular.toJson(pinObj))
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// deleting the firebase object of the pin on firebase
	let deletePin = (pinID) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/pins/${pinID}.json`)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// update the pin located on firebase
	let updatePin = (pinID, updatedPin) => {
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/pins/${pinID}.json`,
			angular.toJson(updatedPin))
			.then((success) => {
				resolve(success);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	return {browsePins, getPinsOnBoard, searchForPin, getPinsForUser, createPin, deletePin, updatePin};

});






