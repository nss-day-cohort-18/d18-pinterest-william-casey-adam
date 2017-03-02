"use strict";

app.controller("LoginCtrl", function($scope, $location, $window, AuthorizeFactory) {

	$scope.login = function() {
		console.log("login function");
		AuthorizeFactory.authWithProvider()
		.then(function(){
			$window.location.href = "#!/browse";
		});
		
	};

	let logout = () => {
		console.log("logout clicked");
		AuthorizeFactory.logoutUser()
		.then(function(data){
			console.log("justlogged somebody out");
			$window.location.url = "#!/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

	//when first loaded, make sure no one is logged in
	if(AuthorizeFactory.isAuthenticated()){
		logout();
	}


});


