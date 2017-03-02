"use strict";

app.factory("UserFactory", function($q, $http, FBCreds) {

	let getUsers = () => {
		let users = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users.json`)
			.then((results) => {
				let userArray = results.data;
				Object.keys(userArray).forEach((each) => {
					userArray[each].id = each;
					users.push(userArray[each]);
				});
				console.log("Users after filter: ", users);
				resolve(users);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	let checkIfUserExists = (userID) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userID}"`)
			.then((results) => {
				resolve(results.data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// creates a new user for the firebase object
	let createNewUser = (userObj) => {
		console.log("Creating New User", userObj);
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/users.json`,
			angular.toJson(userObj))
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// updates existing user with updated information (name, username)
	let updateUser = (userID, userObj) => {
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/users/${userID}.json`,
			angular.toJson(userObj))
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

// deletes an existing user from the firebase object
	let deleteUser = (userID) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/users/${userID}.json`).
			then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {checkIfUserExists, getUsers, updateUser, createNewUser, deleteUser};

});