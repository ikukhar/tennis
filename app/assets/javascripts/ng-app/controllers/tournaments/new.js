(function() {
  'use strict';

  TournamentsNewCtrl.$inject = ['$scope', '$state', 'Tournament', 'User'];

  function TournamentsNewCtrl($scope, $state, Tournament, User) {

    var vm = this;
    vm.tournament = new Tournament({ status: 'Not started' });
    vm.users = [];
    vm.selectedPlayers = [];
    vm.teams = [];
    vm.games = [];
    vm.rounds = [];
    vm.showAddingRound = false;
    vm.tmp_rounds = [];
    vm.statusButtons = statusButtons();


    vm.createTournament = createTournament;

    vm.selectAll = selectAll;
    vm.unselectAll = unselectAll;
    vm.onSelectTournamentForm = onSelectTournamentForm;

    activate();

    function activate() {

      User.query()
        .then(function(success) {
          vm.users = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        });
    };

    function createTournament() {
      vm.tournament
        .create()
        .then(function(results) {
          $state.go('tournaments');
        });
    };

    function onSelectTournamentForm() {
      var teams = { name: 'Teams', state: '.teams' };
      var idx = 2;
      if (vm.tournament.form == 'Doubles') {
        vm.statusButtons.splice(idx, 0, teams)
      } else {
        if (vm.statusButtons[idx]['name'] == teams['name']) {
          vm.statusButtons.splice(idx, 1)
        }
      }
    };

    function selectAll() {
      vm.selectedPlayers = angular.copy(vm.users)
    };

    function unselectAll() {
      vm.selectedPlayers = angular.copy([])
    };

    function statusButtons() {
      return [
        { name: 'Tournament', state: 'newTournament.tournament' },
        { name: 'Players', state: 'newTournament.players' },
        { name: 'Rounds', state: 'newTournament.rounds' },
        { name: 'Games', state: 'newTournament.games' },
      ]
    };

    function setTeams() {
      vm.teams = [];
      if (vm.tournament.form == 'Singles') {
        var length = vm.selectedPlayers.length
        for (var i = 0; i < length; i++) {
          var player = vm.selectedPlayers[i];
          var team = new Team()
          team.players.push(player);
          vm.teams.push(team);
        }
      } else if (vm.tournament.form == 'Doubles') {
        // TODO PLayer RATING
      };
    };

    function setGamesForFirstRound() {
      vm.games = [];
      if (vm.rounds.length > 0) {
        var round = vm.rounds[0];

        if (round.form == 'Сhampionship') {
          var length = vm.teams.length;
          for (var i = 0; i < length; i++) {
            console.log(i);
            var team1 = vm.teams[i];
            for (var j = i+1; j < length; j++) {
              var team2 = vm.teams[j];
              //
              // if (team1 == team2) { continue }

              var game = new Game(round, team1, team2);
              vm.games.push(game);
            }
            // if (i == 1) {break};
          }

        } else if (round.form == 'Play off') {

        }
      }
    };

    function Team() {
      this.players = [];
    };

    function Game(round, team1, team2) {
      this.round = round;
      this.team1 = team1;
      this.team2 = team2;
    };

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if (fromState.name == 'newTournament.players') {
        setTeams();
      } else if (fromState.name == 'newTournament.rounds') {
        setGamesForFirstRound();
      }
    })

  };

  angular.module('app').controller('TournamentsNewCtrl', TournamentsNewCtrl);
})();
