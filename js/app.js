"use strict"; 
var app = angular.module("whistler", ["ngRoute", 'ngMaterial']);

// GIVE CURRENT USER A VALUE ON LOGIN

let isAuth = (authFactory) => new Promise( (resolve, reject) => {
	console.log('isAuth!');
    authFactory.isAuthenticated()
    .then( (userExists) => {
        if(userExists) {
            resolve();
        } else {
            reject(); 
        }
    });
});

// PASS DATABASE CREDS

app.run (($location, fbCreds) => {
	let creds = fbCreds;
	let authConfig = {
		apiKey: creds.key,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL

	};
	firebase.initializeApp(authConfig);
});

// TELL THE PARTIALS WHAT TO DO

app.config( function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'

	})
	.when('/login', {
		templateUrl: 'views/loginHome.html',
		controller: 'loginHomeCtrl',
		resolve: {isAuth}


	})
	

});

