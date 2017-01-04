  "use strict";

  app.controller("userCtrl", function($scope, authFactory, $window, $http, $mdSidenav, $mdDialog, $mdToast, userFactory) {

      // userFactory.userGetter().then(function(data) {
      //     console.log('data', data)
      //     $scope.outings = data;
      //     // $scope.outings = $scope.outingGetter($scope.outings);
      // });

      $scope.openPersonalSidebar = function() {
          $scope.sidebarTitle = 'Add an Outing';
          $mdSidenav('leftUser').open();
      }

      $scope.closePersonalSidebar = function() {
          $scope.outing = {};
          $mdSidenav('leftUser').close();
      }


      $scope.userObject = {
          uid: null,
          firstName: 'Pete',
          lastName: 'Staggs',
          address: '2401 Here',
          city: 'Napa',
          state: 'CA',
          zip: '94558',
          contactOne: '+1707228999',
          contactTwo: "+1808222333 "
      };

      userFactory.userGetter(authFactory.getUser())
          .then((currentUser) => {
              if (currentUser) 
                { $scope.userObject = currentUser;
              };
          });

      // Add a UID to the Personal Info
      //$scope.userObject.uid = ;



      $scope.userObject.uid = authFactory.getUser();
      userFactory.userGetter($scope.userObject.uid)
          .then((userData) => {
              console.log('userData', userData);
              $scope.user = userData;
              $scope.$apply();
          });


      $scope.makePost = function() {
          console.log('$scope.userObject', $scope.userObject)
          if ($scope.userObject.uid == null) {
              userFactory.postUser($scope.userObject)
                  .then((userData) => {
                      console.log('userData', userData);
                      $scope.user = userData;
                      $scope.$apply();
                  });
          } else {
              userFactory.updateUser($scope.userObject)
                  .then((userData) => {
                      console.log('userData', userData);
                      $scope.user = userData;
                      $scope.$apply();

                  });
          }
      }
 



  // Update the contact information 
  // let updateUser = () => {

  //     console.log('update user ran')
  //     userFactory.updateUser($scope.userObject)
  //         .then((data) => {
  //             $scope.userObject = data;
  //         });
  // };



  });
