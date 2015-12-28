(function() {
  'use strict';

  TournamentAddController.$inject = ['$scope', '$state', 'usSpinnerService', 'Tournament'];

  function TournamentAddController($scope, $state, usSpinnerService, Tournament) {

    $scope.tournament = new Tournament;
    $scope.create = create;

    function create() {
      $scope.tournament
        .create()
        .then(function(results) {
          $state.go('tournaments');
        });
    };

  };

  angular.module('app').controller('TournamentAddController', TournamentAddController);
})();
