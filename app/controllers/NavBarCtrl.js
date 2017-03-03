"use strict";

app.controller("NavBarCtrl", function($scope, $window, $location, AuthorizeFactory, SearchFilter) {

	$scope.SearchText = SearchFilter;
	console.log('$scope.search in nav:', $scope.search);
	$scope.isLoggedIn = false;
	$scope.showSearch = false;
	$scope.uid = null;

	firebase.auth().onAuthStateChanged( function(user){
		if (user) {
			$scope.isLoggedIn = true;
			$scope.showSearch = true;
			$scope.uid = user.uid;
			console.log("uid: ", $scope.uid, "isLoggedIn: ", $scope.isLoggedIn);
		} else {
			$scope.isLoggedIn = false;
			$scope.showSearch = false;
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

	$scope.show = () => {
		$scope.showSearch = true;
		console.log("Show Search");
	};

	console.log("show", $scope.show);

	$scope.hideSearch = () => {
		$scope.showSearch = false;
		console.log("Hide Search");
	};

	$scope.Profile = function() {
		console.log("this fired?");
		$scope.showSearch = false;
		$window.location.url = "#!/profile/{{$scope.uid}}";
	};

});