(function() {
  'use strict';

  LoginController.$inject = ['$scope', '$auth', '$state', '$rootScope', '$http'];

  function LoginController($scope, $auth, $state, $rootScope, $http) {

    $scope.login = function(user) {
      $auth.login(user)
        .then(function(response) {
          $state.go('home')
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    }

    $scope.authenticate = function(provider) {

      $auth.authenticate(provider)
        .then(function(response) {
          $auth.setToken(response.data.token)
          $state.go('home')
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    };
  };

  angular.module('app').controller('LoginController', LoginController);
})();
