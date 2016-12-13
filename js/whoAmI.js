app.controller('DemoCtrl', function($scope) {
    $scope.user = {
      userName: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: 'CA',
      biography: '',
      postalCode: ''
    };

   
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });