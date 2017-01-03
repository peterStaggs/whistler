  "use strict";

  app.controller("userCtrl", function ($scope, authFactory, dataFactory, $window) { 

  $scope.userObject = {
      uid: null,
      userName: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      biography: '',
      postalCode: '',
      contactOne: ''
  };

  // Add a UID to the Personal Info
  $scope.userObject.uid = authFactory.getUser();


  
  dataFactory.postOuting($scope.userObject)
      .then((data) => {
        console.log('dataname', data.name);
        $scope.userObject.uid = data.name;
      });

  // Update the contact information 
  let updateUser = () => {
    console.log('update user ran')
      dataFactory.updateUser($scope.userObject)
      .then((data) => {
        $scope.userObject = data; 
      }); 
  };

 
}); 
