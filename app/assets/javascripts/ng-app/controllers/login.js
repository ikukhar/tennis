(function() {
  'use strict';

  LoginCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope'];

  function LoginCtrl($scope, $auth, $state, $rootScope) {

    $scope.login = function(user) {
      $auth.login(user)
        .then(function(response) {
          $rootScope.$emit('auth')
          $state.go('home')
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $auth.setToken(response.data.token)
          $rootScope.$emit('auth')
          $state.go('home')
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    };
  };

  angular.module('app').controller('LoginCtrl', LoginCtrl);
})();
