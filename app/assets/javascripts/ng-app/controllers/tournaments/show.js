(function() {
  'use strict';

  TournamentsShowCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$state',
    'Tournament',
    'Round',
    'Team',
    'Game'
  ];

  function TournamentsShowCtrl(
    $scope,
    $stateParams,
    $rootScope,
    $state,
    Tournament,
    Round,
    Team,
    Game
  ) {

    var vm = this;
    vm.tournament = {};
    vm.rounds = [];
    vm.teams = [];
    vm.games = [];
    vm.destroy = destroy;

    activate();

    function activate() {
      var tournament_id = parseInt($stateParams['id'])

      Tournament.get(tournament_id)
        .then(function(success) {
          vm.tournament = success;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })

      Round.query({
          tournament_id: tournament_id
        })
        .then(function(success) {
          vm.rounds = success;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })

      Team.query({
          tournament_id: tournament_id
        })
        .then(function(success) {
          vm.teams = success;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })

      Game.query({
          tournament_id: tournament_id
        })
        .then(function(success) {
          vm.games = success;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })
    };

    function destroy(tournament) {
      //TODO: Answer!
      vm.tournament
        .delete()
        .then(function() {
          $state.go('^')
        })
    };

  };

  angular.module('app').controller('TournamentsShowCtrl', TournamentsShowCtrl);
})();
