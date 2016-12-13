"use strict"; 

app.controller('loginCtrl', function($scope, authFactory, $window, $location){
	$scope.account = {
		email: "", 
		password: "" //could also be null
	};

	// let currentUser= null; 

	// let createUser = function(userObj) {
	// 	return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);

	// };

	

	$scope.register = () => {
		authFactory.createUser($scope.account)
		.then( (userData) => {
			$scope.login();
			console.log("user registered"); 
		});
	};
	$scope.login = (user) => {
		// currentUser = user.uid;
		authFactory.loginUser($scope.account)
		.then( (user) => {
			$window.location.href = "#/login"; 
					console.log('user logged in', user.uid);
		});
	};


		$scope.logout = () => {
		authFactory.logoutUser($scope.account)
		.then( (user) => {
			$window.location.href = "#/items/list"; 
					console.log('user logged out');
				});
			};

	$scope.loginGoogle = () => {
		console.log("you clicked login with Google");
		authFactory.authWithProvider()
		.then(function(result) {
	    	var user = result.user.uid;
	    	console.log("logged in user:", user);
	    	console.log('user logged in', user);
	    	//Once logged in, go to another view
	    	$location.path("login");
	    	$scope.$apply();
	  	}).catch(function(error) {
	    	// Handle the Errors.
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	// The email of the user's account used.
	    	var email = error.email;
	    	// The firebase.auth.AuthCredential type that was used.
	    	var credential = error.credential;
	    	// ...
	  	});
	};

}); 