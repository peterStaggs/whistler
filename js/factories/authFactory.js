"use strict";


app.factory("authFactory", function($rootScope) {


    let createUser = function(userObj) {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);

    };

    let loginUser = function(userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);

    };

    let logoutUser = function(userObj) {
        return firebase.auth().signOut();
    };

    let isAuthenticated = function() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    $rootScope.currentUser = user.uid;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    let getUser = function() {
        return $rootScope.currentUser;
    };

    let provider = new firebase.auth.GoogleAuthProvider();

    let authWithProvider = function() {
        return firebase.auth().signInWithPopup(provider);
    };



    return { createUser, logoutUser, getUser, loginUser, isAuthenticated, authWithProvider };

});
