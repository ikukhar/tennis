(function() {
  'use strict';

  SignupCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope'];

  function SignupCtrl($scope, $auth, $state, $rootScope) {

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

  angular.module('app').controller('SignupCtrl', SignupCtrl);
})();
