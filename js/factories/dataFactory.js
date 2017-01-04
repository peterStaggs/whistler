 "use strict";

 app.factory("dataFactory", function($http, authFactory, fbCreds) {

     var currentUser;

      let setUser = (toes) => {
         currentUser = toes;
     }

     let getSingleUid = () => {
        return currentUser;
     } 

     // USER POST, PUT AND GETTER
     let postOuting = (outingObject) => {
         return new Promise((resolve, reject) => {
             console.log('resolve', resolve);
             $http.post(`${fbCreds.databaseURL}/outing.json`, angular.toJson(outingObject))
                 .success((outingObject) => {
                     outingObject.id = outingObject.name;

                     console.log('outingObject name', outingObject.name)
                     resolve(outingObject);
                 })

             .error((error) => {
                 reject(error);
             });
         });
     };

     let outingGetter = (user) => {
         let outing = [];
         console.log('outing', outing)
         return new Promise((resolve, reject) => {
             $http.get(`${fbCreds.databaseURL}/outing.json?orderBy="uid"&equalTo="${user}"`)
                 .success((outingObject) => {
                     let outingInfo = outingObject;
                     Object.keys(outingInfo).forEach((key) => {
                         outingInfo[key].id = key;
                         outing.push(outingInfo[key]);

                     });
                     console.log('outinginfo', outingInfo)
                     resolve(outing);

                 })
                 .error((error) => {
                     reject(error);
                 });

         });

     };

     let editOuting = () => {

     }

     let deleteOuting = (outingID) => {
        return new Promise((resolve, reject) => { 
        $http.delete(`${fbCreds.databaseURL}/outing/${outingID}.json`)
        .success((outing) => {
            resolve(outing);
        })
    });

        
     }






     // RETURN ALL FUNCTIONS 

     return { postOuting, outingGetter, editOuting, deleteOuting, setUser, getSingleUid };

 });
