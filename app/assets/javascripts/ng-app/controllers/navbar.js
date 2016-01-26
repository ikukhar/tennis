(function() {
  'use strict';

  NavbarCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope'];

  function NavbarCtrl($scope, $auth, $state, $rootScope) {

    var vm = this;
    vm.isAuthenticated = $auth.isAuthenticated;
    vm.logout = logout;

    function logout() {
      $auth.logout();
      $rootScope.$emit('logout');
      $state.go('login');
    }

  };

  angular.module('app').controller('NavbarCtrl', NavbarCtrl);
})();
