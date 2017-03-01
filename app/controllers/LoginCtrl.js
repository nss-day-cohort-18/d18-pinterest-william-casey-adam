"use strict";

app.controller("LoginCtrl", function($scope, $location, AuthorizeFactory) {

	$scope.login = function() {
		console.log("login function");
		AuthorizeFactory.authWithProvider();
	};

});