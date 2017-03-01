"use strict";

app.factory("AuthorizeFactory", function() {

// set the initial value of currentUser to be changed after login
	let currentUser = null;

// will update currentUser to prevent certain routes if user doesn't exist.
// is called within app.js
	let isAuthenticated = function() {
		return new Promise ( (resolve, reject) => {
			firebase.auth().onAuthStateChanged( (user) => {
				if (user) {
					currentUser = user.uid;
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	};

// allows other controllers/factories to retrieve the current user.
	let getUser = function() {
		console.log("Current User: ", currentUser);
		return currentUser;
	};

	let logoutUser = function() {
		console.log("logoutUser");
		return firebase.auth().signOut();
	};

// defining 'provider' to be passed in to signin window of firebase
	let provider = new firebase.auth.GoogleAuthProvider();

// calls for a new google login (usually your browser will save your previous logins)
	let authWithProvider = function() {
		return firebase.auth().signInWithPopup(provider);
	};

	return {isAuthenticated, getUser, authWithProvider, logoutUser};

});







