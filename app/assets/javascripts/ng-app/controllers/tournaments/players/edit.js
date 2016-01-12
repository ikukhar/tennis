(function() {
  'use strict';

  PlayersEditCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'User', 'Tournament', '$state'];

  function PlayersEditCtrl($scope, $stateParams, $rootScope, User, Tournament, $state) {

    $scope.users = [];
    $scope.selectedUsers = [];
    $scope.update = update;

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
          }, $scope.selectedUsers);

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
    }

  };

  angular.module('app').controller('PlayersEditCtrl', PlayersEditCtrl);
})();
