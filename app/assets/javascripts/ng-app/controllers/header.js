(function() {
  'use strict';

  HeaderController.$inject = ['$scope', '$auth', '$state'];

  function HeaderController($scope, $auth, $state) {

    $scope.payload = $auth.getPayload;
    $scope.isAuthenticated = $auth.isAuthenticated;
    $scope.logout = logout;

    function logout() {
      $auth.logout();
      $state.go('login');
    }

  };

  angular.module('app').controller('HeaderController', HeaderController);
})();
