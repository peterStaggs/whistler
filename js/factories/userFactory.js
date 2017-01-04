 "use strict";

 app.factory("userFactory", function($http, authFactory, fbCreds) {


     let postUser = (userObject) => {

         return new Promise((resolve, reject) => {
             console.log('resolve', resolve);
             $http.post(`${fbCreds.databaseURL}/user.json`, angular.toJson(userObject))
                 .success((userObject) => {
                     userObject.id = userObject.name;
                     resolve(userObject);
                 })

             .error((error) => {
                 reject(error);
             });
         });
     };

     let userGetter = (user) => {
         console.log('user', user)
         let userArr = [];


         return new Promise((resolve, reject) => {
             $http.get(`${fbCreds.databaseURL}/user.json?orderBy="uid"&equalTo="${user}"`)
                 .success((userObject) => {
                     console.log('userobject from get', userObject);

                     let userInfo = userObject;
                     Object.keys(userInfo).forEach((key) => {
                         userInfo[key].id = key;
                         userArr.push(userInfo[key]);

                     });
                     console.log('userArr b4 resolve', userArr);

                     resolve(userArr[0]);
                 })

             .error((error) => {
                 reject(error);
             });

         });

     };

          let singleUserGetter = (uid) => {
         console.log('user', user)
      


         return new Promise((resolve, reject) => {
             $http.get(`${fbCreds.databaseURL}/user/${uid}.json`)
                 .success((userObject) => {
                     console.log('userobject from get', userObject);

                     let userInfo = userObject;
                     // Object.keys(userInfo).forEach((key) => {
                     //     userInfo[key].id = key;
                     //     userArr.push(userInfo[key]);

                     // });
                     console.log('userArr b4 resolve', userArr);

                     resolve(userArr[0]);
                 })

             .error((error) => {
                 reject(error);
             });

         });

     };




     let updateUser = (userObject) => {
         let currentUser = authFactory.getUser();
         return new Promise((resolve, reject) => {
             console.log('resolve', resolve);
             $http.patch(`${fbCreds.databaseURL}/user/${userObject.uid}.json`, angular.toJson(userObject))
                 .success((userObject) => {
                     resolve(userObject);
                 })

             .error((error) => {
                 reject(error);
             });
         });
     };



     // OUTING POST AND GETTER

     return { postUser, updateUser, userGetter };


 });
