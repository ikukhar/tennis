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
    vm.updateGame = updateGame;
    vm.equals = function(obj1, obj2) {
      return angular.equals(obj1, obj2);
    }

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

    function getWinner(game) {
      var winner = {};
      var team1Wins = 0;
      var team2Wins = 0;
      for (var i = 0; i < game.score.length; i++) {
        var set = game.score[i];
        if (set.team1 > set.team2) {
          team1Wins += 1;
        } else {
          team2Wins += 1;
        }
      }
      winner = team1Wins > team2Wins ? game.team1 : game.team2
      return winner;
    }

    function updateGame(game) {
      game.winner = getWinner(game)
      game.update()
      .then(function(results) {
        // round.competed???
        game.edit = false;
      }, function(error) {
        $rootScope.$emit('error', error.data)
      });
    }

  };

  angular.module('app').controller('TournamentsShowCtrl', TournamentsShowCtrl);
})();
