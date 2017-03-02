"use strict";

app.controller("LoginCtrl", function($scope, $location, $window, AuthorizeFactory) {

	$scope.login = function() {
		console.log("login function");
		$window.location.href = "#!/browse";
		AuthorizeFactory.authWithProvider();
	};


});


