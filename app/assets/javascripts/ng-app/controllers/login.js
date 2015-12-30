(function() {
  'use strict';

  LoginController.$inject = ['$scope', '$auth', '$state', '$timeout', '$rootScope'];

  function LoginController($scope, $auth, $state, $timeout, $rootScope) {

    $scope.login = function(user) {
      $auth.login(user)
        .then(function(response) {
          console.log($auth.getPayload())
          $state.go('home')
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    }

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  };

  angular.module('app').controller('LoginController', LoginController);
})();
