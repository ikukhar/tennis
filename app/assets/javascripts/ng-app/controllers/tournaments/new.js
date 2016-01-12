(function() {
  'use strict';

  TournamentsNewCtrl.$inject = ['$scope', '$state', 'Tournament', 'User'];

  function TournamentsNewCtrl($scope, $state, Tournament, User) {

    $scope.tournament = new Tournament({ status: 'Not started' });
    $scope.users = [];
    $scope.create = create;
    $scope.onSelectTournamentForm = onSelectTournamentForm;
    $scope.statusButtons = [
      { name: 'Tournament', state: '.tournament' },
      { name: 'Players', state: '.players' },
      { name: 'Rounds', state: '.rounds' },
      { name: 'Games', state: '.games' },
    ]

    activate();

    function activate() {

      User.query()
        .then(function(success) {
          $scope.users = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        });
    };

    function create() {
      $scope.tournament
        .create()
        .then(function(results) {
          $state.go('tournaments');
        });
    };

    function onSelectTournamentForm() {
      var teams = { name: 'Teams', state: '.teams' };
      var idx = 2;
      if ($scope.tournament.form == 'Doubles') {
        $scope.statusButtons.splice(idx, 0, teams)
      } else {
        if ($scope.statusButtons[idx]['name'] == teams['name']) {
          $scope.statusButtons.splice(idx, 1)
        }
      }
    }

  };

  angular.module('app').controller('TournamentsNewCtrl', TournamentsNewCtrl);
})();
