"use strict";

app.controller("UserCtrl", function($q, $http, FBCreds) {

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

// allow users to update their url photo and name on firebase
	let updateUser = (userID, userObj) => {
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/users/${userID}.json`,
			angular.toJson(userObj))
			.then((success) => {
				resolve(success);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// delete a user within the users object on FB
	let deleteUser = (userID) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/users/${userID}.json`)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {createUser, updateUser, deleteUser};

});




