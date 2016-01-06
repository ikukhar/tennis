(function() {
  'use strict';

  ProfileEditController.$inject = ['$scope', '$state', '$rootScope'];

  function ProfileEditController($scope, $state, $rootScope) {

    $scope.user = $rootScope.current_user;
    $scope.update = update;

    function update() {
      $scope.user
        .update()
        .then(function(success) {
          $rootScope.setUser($scope.user);
          $state.go('^')
        }, function(error) {
          $rootScope.$emit('error', error.data.message)
        })
    }

  };

  angular.module('app').controller('ProfileEditController', ProfileEditController);
})();
