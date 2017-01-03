"use strict";

angular
    .module('whistler')
    .controller('outingController', function($http, $scope, $mdSidenav, $mdDialog, $mdToast, dataFactory) {


        dataFactory.outingGetter().then(function(data) {
            console.log('data', data)
            $scope.outings = data;
            // $scope.outings = $scope.outingGetter($scope.outings);
        });



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

        $scope.saveOuting = function(outing) {
            if (outing) {
                $scope.outing.contact = contact;
                $scope.outings.push(outing);
                $scope.outing = {};
                $scope.closeSidebar();
                $scope.showToast('Outing Saved');
            }
        }

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
                $scope.showToast('Poof. Outing Deleted');
            }, function() {
                $scope.status = outing.title + ' is still here.';
            });
        };
        $scope.getCategories = function(outings) {
            console.log('get outings', outings)

            var categories = [];

            angular.forEach(outings, function(ad) {
                console.log('ad', ad)

                categories.push(ad.categories);
                console.log('categories', categories)

            });
            console.log('searchcategories', categories)

            return _.uniq(categories);
        }


    });
