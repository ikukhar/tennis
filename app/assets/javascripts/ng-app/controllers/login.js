(function() {
  'use strict';

  LoginCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope'];

  function LoginCtrl($scope, $auth, $state, $rootScope) {

    $scope.login = function(user) {
      $auth.login(user)
        .then(function(response) {
          $rootScope.$emit('auth')
          $state.go('home')
        }, function(error) {
          console.log(error);
          $rootScope.$emit('error', error.data);
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $auth.setToken(response.data.token)
          $rootScope.$emit('auth')
          $state.go('home')
        }, function(error) {
          $rootScope.$emit('error', error.data);
        });
    };
  };

  angular.module('app').controller('LoginCtrl', LoginCtrl);
})();
