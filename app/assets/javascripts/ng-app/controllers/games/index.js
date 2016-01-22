(function() {
  'use strict';

  GamesIndexCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$state',
    'Round',
    'Game',
    'games',
    'roundFilter',
    'tournFilter'
  ];

  function GamesIndexCtrl(
    $scope,
    $stateParams,
    $rootScope,
    $state,
    Round,
    Game,
    games,
    roundFilter,
    tournFilter
  ) {

    var vm = this;
    vm.rootScope = $rootScope;
    vm.games = games;
    vm.update = update;

    vm.tournFilter = tournFilter;
    vm.selectedTourn = null;
    vm.roundFilter = roundFilter;
    vm.selectedRound = null;
    vm.selectedFilter = selectedFilter;
    vm.onSelectTournament = onSelectTournament;

    function update(game) {
      game.winner = getWinner(game);
      game.finished = game.winner ? true : false
      game.update()
        .then(function(results) {
          game.edit = false;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        });
    }

    function selectedFilter(game) {
      var tourn = true;
      var round = true;
      if (vm.selectedTourn) {
        tourn = game.tournament.id == vm.selectedTourn.id
      }
      if (vm.selectedRound) {
        round = game.round.id == vm.selectedRound.id
      }
      return tourn && round;
    }

    function getWinner(game) {
      var winner = null;
      var team1Wins = 0;
      var team2Wins = 0;

      for (var i = 0; i < game.score.length; i++) {
        var set = game.score[i];
        if (set.team1 > set.team2) {
          team1Wins += 1;
        } else if (set.team2 > set.team1) {
          team2Wins += 1;
        }
      }

      if (team1Wins > team2Wins) {
        winner = game.team1;
      } else if (team2Wins > team1Wins) {
        winner = game.team2;
      }

      return winner;
    }

    function onSelectTournament(item) {
      if (item) {
        Round.query({
            tournament_id: item.id
          })
          .then(function(response) {
            vm.roundFilter = response;
          })
      } else {
        vm.roundFilter = null;
      }
      vm.selectedRound = null;
    }

  };

  angular.module('app').controller('GamesIndexCtrl', GamesIndexCtrl);
})();
