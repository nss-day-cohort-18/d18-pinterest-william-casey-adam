"use strict";

app.controller("LoginCtrl", function($scope, $location, $window, AuthorizeFactory) {

	$scope.login = function() {
		console.log("login function");
		AuthorizeFactory.authWithProvider();
		$window.location.href = "#!/browse";
	};

});