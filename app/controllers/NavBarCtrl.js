"use strict";

app.controller("NavBarCtrl", function($scope, $window, $location, AuthorizeFactory) {

	$scope.isLoggedIn = false;
	$scope.uid = null;

	firebase.auth().onAuthStateChanged( function(user){
		if (user) {
			$scope.isLoggedIn = true;
			$scope.uid = user.uid;
			console.log("uid: ", $scope.uid, "isLoggedIn: ", $scope.isLoggedIn);
		} else {
			$scope.isLoggedIn = false;
			$scope.uid = null;
			console.log("logged in: ", $scope.isLoggedIn);
			$window.location.href = "#!/login";
		}
	});

	$scope.login = function() {
		console.log("login function");
		AuthorizeFactory.authWithProvider();
	};

	$scope.logout = function() {
		console.log("logout function");
		AuthorizeFactory.logoutUser()
		.then(function() {
			$scope.$apply();
		});
	};

	$scope.Profile = function() {
		$window.location.url = "#!/profile/{{$scope.uid}}";
	};


});