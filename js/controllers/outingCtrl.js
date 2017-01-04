"use strict";

angular
    .module('whistler')
    .controller('outingController', function($http, $scope, $mdSidenav, $mdDialog, $mdToast, dataFactory, authFactory) {


        // dataFactory.outingGetter().then(function(data) {
        //     console.log('data', data)
        //     $scope.outings = data;
        //     // $scope.outings = $scope.outingGetter($scope.outings);
        // });

        $scope.outingObject = {
            uid: null,
            Date: 'today',
            startTime: 'now',
            endTime: 'later',
            imWith: 'people',
            map: 'a url',
        };

        $scope.outingObject.uid = authFactory.getUser();
        dataFactory.outingGetter($scope.outingObject.uid)
            .then((outingData) => {
                console.log('outingData', outingData);
                $scope.outings = outingData;
                $scope.$apply();
            });




        $scope.buttonPost = function() {
            dataFactory.postOuting($scope.outingObject)
                .then((data) => {
                    return dataFactory.outingGetter($scope.outingObject.uid);
                })
                .then((outingData) => {
                    console.log('outingData', outingData);
                    $scope.outings = outingData;
                    $scope.$apply();
                });

        }



        var contact = {
            name: "Ryan Chenkie",
            phone: "(555) 555-5555",
            email: "ryanchenkie@gmail.com"
        }

        $scope.showToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .content(message)
                .position('top, right')
                .hideDelay(3000)
            );
        }

        $scope.openSidebar = function() {
            $scope.sidebarTitle = 'Add an Outing';
            $mdSidenav('left').open();
        }

        $scope.closeSidebar = function() {
            $scope.outing = {};
            $mdSidenav('left').close();
        }

        // $scope.saveOuting = function(outing) {
        //     if (outing) {
        //         $scope.outing.contact = contact;
        //         $scope.outings.push(outing);
        //         $scope.outing = {};
        //         console.log('outing posted');
        //         $scope.closeSidebar();
        //         buttonPost();
        //         $scope.showToast('Outing Saved');
        //     }
        // }

        $scope.editOuting = function(outing) {
            $scope.editing = true;
            $scope.openSidebar();
            $scope.outing = outing;
        }

        $scope.saveEdit = function() {
            $scope.editing = false;
            $scope.outing = {};
            $scope.closeSidebar();
            $scope.showToast('Edit Saved');
        }

        $scope.deleteOuting = function(event, outing) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete ' + outing.title + '?')
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function() {
                var index = $scope.outings.indexOf(outing);
                $scope.outings.splice(index, 1);
                console.log('delete outing', outing)
                dataFactory.deleteOuting(outing)
                .then((data) => {
                    console.log('delete worked');
                })
                $scope.showToast('Poof. Outing Deleted');
            }, function() {
                console.log('anything')
                $scope.status = outing.title + ' is still here.';
                
            });
        };





    });
