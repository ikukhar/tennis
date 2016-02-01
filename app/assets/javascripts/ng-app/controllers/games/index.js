(function() {
  'use strict';

  GamesIndexCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$state',
    'Round',
    'Game',
    'query_filter',
    'roundFilter',
    'tournFilter',
    'statusFilter',
    'CONSTANTS',
    'title'
  ];

  function GamesIndexCtrl(
    $scope,
    $stateParams,
    $rootScope,
    $state,
    Round,
    Game,
    query_filter,
    roundFilter,
    tournFilter,
    statusFilter,
    CONSTANTS,
    title
  ) {

    var vm = this;
    vm.rootScope = $rootScope;
    vm.games = [];
    vm.update = update;

    vm.tournFilter = tournFilter;
    vm.selectedTourn = null;
    vm.roundFilter = roundFilter;
    vm.selectedRound = null;
    vm.statusFilter = statusFilter;
    vm.selectedStatus = null;
    vm.selectedFilter = selectedFilter;
    vm.onSelectTournament = onSelectTournament;
    vm.title = title;
    vm.onSelectFilter = onSelectFilter;
    vm.onPagination = onPagination;


    vm.total_count = 0;
    vm.itemsPerPage = 8;
    vm.current_page = 1;
    vm.search = '';

    vm.getData = function(newPageNumber){

      query_filter.itemsPerPage = vm.itemsPerPage;
      query_filter.pageNumber = newPageNumber ? newPageNumber : vm.current_page;

      Game.query(query_filter)
        .then(function(response){
          vm.games = response;
          vm.total_count = response.total_count;
      });
    };
    vm.getData();


    function update(game) {
      console.log(game)
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
      var status = true;
      if (vm.selectedTourn) {
        tourn = game.tournament.id == vm.selectedTourn.id
      }
      if (vm.selectedRound) {
        round = game.round.id == vm.selectedRound.id
      }
      if (vm.selectedStatus) {
        if (vm.selectedStatus == CONSTANTS.GAME.STATUSES.FINISHED) {
          status = game.finished
        }else {
          status = !game.finished
        }
      }
      return tourn && round && status;
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

    function onSelectTournament(mode) {
      if (mode) {
        Round.query({
            tournament_id: vm.selectedTourn.id
          })
          .then(function(response) {
            vm.roundFilter = response;
          })
      } else {
        vm.roundFilter = null;
      }
      vm.selectedRound = null;
    }

    function onSelectFilter() {
      vm.current_page = 1

      if (vm.tournFilter) {
        if (vm.selectedTourn) {
          query_filter.tournament_id = vm.selectedTourn.id;
        } else {
          delete query_filter.tournament_id
        }
      }

      if (vm.roundFilter) {
        if (vm.selectedRound) {
          query_filter.round_id = vm.selectedRound.id;
        } else {
          delete query_filter.round_id
        }
      }

      if (vm.statusFilter) {
        if (vm.selectedStatus) {
          query_filter.status = vm.selectedStatus;
        } else {
          delete query_filter.status
        }
      }

      if (vm.search.length > 0){
        query_filter.search = vm.search
      } else {
        delete query_filter.search
      }

      vm.getData()
    }

    function onPagination(newPageNumber) {
      vm.getData(newPageNumber)
    }

  };

  angular.module('app').controller('GamesIndexCtrl', GamesIndexCtrl);
})();
