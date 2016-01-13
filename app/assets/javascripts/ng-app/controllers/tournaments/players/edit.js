(function() {
  'use strict';

  PlayersEditCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'User', 'Tournament', '$state'];

  function PlayersEditCtrl($scope, $stateParams, $rootScope, User, Tournament, $state) {

    $scope.users = [];
    $scope.selectedUsers = { list: [] };
    $scope.update = update;
    $scope.selectAll = selectAll;
    $scope.unselectAll = unselectAll;

    activate();

    function activate() {

      User.query()
        .then(function(success) {
          $scope.users = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        });

      var tournamentId = parseInt($stateParams['id'])

      Tournament.getPlayers(tournamentId)
        .then(function(success) {

          angular.forEach(success, function(value, key) {
            this.push(value['user'])
          }, $scope.selectedUsers.list);

        }, function(error) {
          $rootScope.$emit('error', error)
        })
    };

    function update() {
      var tournamentId = parseInt($stateParams['id'])
      Tournament.createPlayers(tournamentId, $scope.selectedUsers)
        .then(function(success) {
          $state.go('^')
        }, function(error) {
          $rootScope.$emit('error', error);
        })
    };

    function selectAll() {
      $scope.selectedUsers.list = angular.copy($scope.users)
    };

    function unselectAll() {
      $scope.selectedUsers.list = []
    };

  };

  angular.module('app').controller('PlayersEditCtrl', PlayersEditCtrl);
})();
