(function() {
  'use strict';

  TournamentEditController.$inject = ['$scope', '$state', '$stateParams', 'usSpinnerService', 'Tournament'];

  function TournamentEditController($scope, $state, $stateParams, usSpinnerService, Tournament) {

    $scope.tournament = {};
    $scope.update = update;

    activate();

    function activate() {
      Tournament.get(parseInt($stateParams['id']))
        .then(function(result) {
          $scope.tournament = result;
        })
    }

    function update() {
      usSpinnerService.spin('spinner');
      $scope.tournament
        .update()
        .then(function(results) {
          $state.go('tournaments');
          usSpinnerService.stop('spinner');
        });
    };

  };

  angular.module('app').controller('TournamentEditController', TournamentEditController);
})();
