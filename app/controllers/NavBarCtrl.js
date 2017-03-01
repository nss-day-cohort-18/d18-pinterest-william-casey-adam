"use strict";

app.controller("NavBarCtrl", function($scope, AuthorizeFactory) {
	console.log("Loaded NavBarCtrl.js :D");

	$scope.login = function() {
		console.log("login function");
		AuthorizeFactory.authWithProvider();
	};
});