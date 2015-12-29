(function() {
  'use strict';

  LoginController.$inject = ['$scope', '$auth'];

  function LoginController($scope, $auth) {

    $scope.login = function(user) {
      $auth.login(user)
        .then(function(response) {
          // Redirect user here after a successful log in.
        })
        .catch(function(response) {
          // Handle errors here, such as displaying a notification
          // for invalid email and/or password.
        });
    }

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  };

  angular.module('app').controller('LoginController', LoginController);
})();
