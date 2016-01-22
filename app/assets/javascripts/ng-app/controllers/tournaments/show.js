(function() {
  'use strict';

  TournamentsShowCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$state',
    'Tournament',
    'Round',
    'Team'
  ];

  function TournamentsShowCtrl(
    $scope,
    $stateParams,
    $rootScope,
    $state,
    Tournament,
    Round,
    Team
  ) {

    var vm = this;
    vm.tournament = {};
    vm.rounds = [];
    vm.teams = [];
    vm.games = [];
    vm.destroy = destroy;
    vm.calculate_players_rating = calculate_players_rating;
    vm.rating = [];
    activate();

    function calculate_players_rating() {
      Tournament.get('calculate_rating')
      .then(function(response) {
        vm.rating = response
      })
    }

    function activate() {
      var tournament_id = parseInt($stateParams['id'])

      Tournament.get(tournament_id)
        .then(function(response) {
          vm.tournament = response;
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
