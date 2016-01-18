(function() {
  'use strict';

  TournamentsNewCtrl.$inject =
    ['$scope', '$state', 'Tournament', 'User', 'TOURNAMENT', 'ROUND', '$rootScope'];

  function TournamentsNewCtrl($scope, $state, Tournament, User, TOURNAMENT, ROUND, $rootScope) {

    var vm = this;
    vm.tournament = new Tournament({
      status: 'Not started'
    });
    vm.users = [];
    vm.selectedPlayers = [];
    vm.teams = [];
    vm.games = [];
    vm.rounds = [];
    vm.removeRound = removeRound;
    vm.showAddingRound = false;
    vm.tmp_rounds = [];
    vm.statusButtons = statusButtons();

    vm.create = create;

    vm.selectAll = selectAll;
    vm.unselectAll = unselectAll;
    vm.onSelectTeamsType = onSelectTeamsType;

    activate();

    function activate() {

      User.query()
        .then(function(success) {
          vm.users = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        });
    };

    function create() {
      Tournament.createTournament({
          tournament: vm.tournament,
          rounds: vm.rounds,
          teams: vm.teams,
          games: vm.games
        })
        .then(function(success) {
          $state.go('tournaments');
        }, function(error){
          $rootScope.$emit('error', error.data)
        });
    };

    function setRounds(){
      vm.rounds = [];
      if(vm.tournament.roundsType == TOURNAMENT.ROUNDS_TYPES.CHAMPIONSHIP) {
        vm.rounds.push({
          stage: ROUND.STAGES['CHAMPIONSHIP'],
          sets: 1
        })
      } else if(vm.tournament.roundsType == TOURNAMENT.ROUNDS_TYPES.PLAY_OFF) {
        for (var stageName in ROUND.STAGES) {
          if (stageName == 'CHAMPIONSHIP') { continue; }
          var stage = ROUND.STAGES[stageName]
          vm.rounds.push({
            stage: stage,
            sets: 1
          })
        }
      } else if(vm.tournament.roundsType == TOURNAMENT.ROUNDS_TYPES.CHAMPIONSHIP_AND_PLAYOFF) {
        for (var stageName in ROUND.STAGES) {
          var stage = ROUND.STAGES[stageName]
          vm.rounds.push({
            stage: stage,
            sets: 1
          })
        }
      };
    };

    function removeRound(round) {
      var idx = vm.rounds.indexOf(round);
      if (idx != -1) {
        vm.rounds.splice(idx, 1)
      }
    };

    function onSelectTeamsType() {
      var teams = {
        name: 'Teams',
        state: '.teams'
      };
      var idx = 2;
      if (vm.tournament.teams_type == 'Doubles') {
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
      return [{
        name: 'Tournament',
        state: 'newTournament.tournament'
      }, {
        name: 'Rounds',
        state: 'newTournament.rounds'
      }, {
        name: 'Players',
        state: 'newTournament.players'
      }, {
        name: 'Games',
        state: 'newTournament.games'
      }, ]
    };

    function setTeams() {
      vm.teams = [];
      if (vm.tournament.teamsType == TOURNAMENT.TEAMS_TYPES.SINGLES) {
        var length = vm.selectedPlayers.length
        for (var i = 0; i < length; i++) {
          var player = vm.selectedPlayers[i];
          var team = new Team(player)
          vm.teams.push(team);
        }
      } else if (vm.tournament.teamsType == TOURNAMENT.TEAMS_TYPES.DOUBLES) {
        // TODO PLayer RATING
      };
    };

    function setGamesForFirstRound() {
      vm.games = [];
      if (vm.rounds.length > 0) {
        var round = vm.rounds[0];

        if (round.stage == ROUND.STAGES.CHAMPIONSHIP) {
          console.log('CHAMPIONSHIP');
          var length = vm.teams.length;
          for (var i = 0; i < length; i++) {
            var team1 = vm.teams[i];
            for (var j = i + 1; j < length; j++) {
              var team2 = vm.teams[j];
              var game = new Game(round, team1, team2);
              vm.games.push(game);
            }
          }
        } else {
          console.log('PLAY_OFF');
          // TODO: Более умное создание игр (в т.ч. на основании рейтинга)
          var length = round.stage.games;
          for (var i = 0; i < length; i++) {
            var team1 = vm.teams[i];
            var team2 = vm.teams[i + count_games];
            var game = new Game(round, team1, team2);
            vm.games.push(game);
          }
        }
      }
    };

    function Team(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
    };

    function Game(round, team1, team2) {
      this.round = round;
      this.team1 = team1;
      this.team2 = team2;
      this.score = [];
      for (var i = 0; i < this.round.sets; i++) {
        this.score.push({ team1: 0, team2: 0})
      }
    };

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (fromState.name == 'newTournament.tournament') {
        setRounds();
      } else if (fromState.name == 'newTournament.players') {
        setTeams();
        setGamesForFirstRound();
      }
    })

  };

  angular.module('app').controller('TournamentsNewCtrl', TournamentsNewCtrl);
})();
