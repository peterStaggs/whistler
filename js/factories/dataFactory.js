 "use strict";

 app.factory("dataFactory", function($http, authFactory, fbCreds) {

     var currentUser;

     // USER POST, PUT AND GETTER
     let postOuting = (userObject) => {
         return new Promise((resolve, reject) => {
             console.log('resolve', resolve);
             $http.post(`${fbCreds.databaseURL}/user.json`, angular.toJson(userObject))
                 .success((userObject) => {
                     userObject.id = userObject.name;

                     console.log('userObject name', userObject.name)
                     resolve(userObject);
                 })

             .error((error) => {
                 reject(error);
             });
         });
     };

     let outingGetter = () => {
         let outing = [];
         console.log('outing', outing)
         return new Promise((resolve, reject) => {
             $http.get(`${fbCreds.databaseURL}/user.json`)
                 .success((outingObject) => {
                     let outingInfo = outingObject;
                     Object.keys(outingInfo).forEach((key) => {
                         outingInfo[key].id = key;
                         outing.push(outingInfo[key]);

                     });
                     console.log('outinginfo', outingInfo)
                     resolve(outingInfo);

                 })
                 .error((error) => {
                     reject(error);
                 });

         });

     };

     let updateUser = (userObject) => {
         currentUser = authFactory.getUser();
         return new Promise((resolve, reject) => {
             console.log('resolve', resolve);
             $http.patch(`${fbCreds.databaseURL}/user.json?orderBy='uid'&equalTo='${userObject.uid}'`, angular.toJson(userObject))
                 .success((userObject) => {
                     resolve(userObject);
                 })

             .error((error) => {
                 reject(error);
             });
         });
     };

     let setUser = (toes) => {
         currentUser = toes;
     }

     let userGetter = () => {
         let user = [];
         console.log('user', user)

         return new Promise((resolve, reject) => {
             $http.get(`${fbCreds.databaseURL}/user.json`)
                 .success((userObject) => {
                     console.log('userobject from get', userObject);
                     let userInfo = userObject;
                     Object.keys(userInfo).forEach((key) => {
                         userInfo[key].id = key;
                         user.push(userInfo[key]);

                     });
                     resolve(user);
                 })
                 .error((error) => {
                     reject(error);
                 });

         });

     };

     // OUTING POST AND GETTER

     let postUser = (outingObject) => {

         return new Promise((resolve, reject) => {
             console.log('resolve', resolve);
             $http.post(`${fbCreds.databaseURL}/outing.json`, angular.toJson(outingObject))
                 .success((outingObject) => {
                     outingObject.id = outingObject.name;
                     resolve(outingObject);
                 })

             .error((error) => {
                 reject(error);
             });
         });
     };





     // RETURN ALL FUNCTIONS 

     return { postUser, postOuting, updateUser, userGetter, outingGetter, setUser };

 });
