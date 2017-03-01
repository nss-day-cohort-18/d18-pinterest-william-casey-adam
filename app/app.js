"use strict";

// defining app (remember to assign '"app": true' in your Gruntfile.js in grunt.initConfig under 'Globals"')
let app = angular.module("Pinterest", ["ngRoute"]);

// checking if authorized inorder to see different routes in routeprovider below 
//     (in app.config under 'resolve: {Auth}')
let Auth = (AuthorizeFactory) => new Promise ( (resolve, reject) => {
	// remember to idenfity 'isAuthenticated' correctly in your factory
	AuthorizeFactory.isAuthenticated()
	.then ( (userExists) => {
		if (userExists) {
			console.log("You are Authenticated ", userExists);
			resolve();
		} else {
			console.log("You are not Authenticated");
			reject();
		}
	});
});

// passing in FBCreds inorder to hide the values from the public
// remember to include the file with the values in .gitignore
app.run(($location, FBCreds) => {
// changing to lowercase to prevent an error with calling upon variable names with the first letter capitalized
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};
	firebase.initializeApp(authConfig);
});

// displaying different routing available with which partial and controller assigned to them
app.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: "partials/list.html",
		controller: 'HomePageCtrl'
	}).
	otherwise('/');
});






