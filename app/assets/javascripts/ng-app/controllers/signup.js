(function() {
  'use strict';

  SignupController.$inject = ['$scope', '$auth', '$state', '$timeout', '$rootScope'];

  function SignupController($scope, $auth, $state, $timeout, $rootScope) {

    $scope.signup = function(user) {
      $auth.signup(user)
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

  angular.module('app').controller('SignupController', SignupController);
})();
