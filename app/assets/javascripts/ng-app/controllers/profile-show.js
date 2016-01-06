(function() {
  'use strict';

  ProfileShowController.$inject = ['$scope', '$rootScope'];

  function ProfileShowController($scope, $rootScope) {

    $scope.user = $rootScope.current_user;

  };

  angular.module('app').controller('ProfileShowController', ProfileShowController);
})();
