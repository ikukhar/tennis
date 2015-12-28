(function() {
  'use strict';

  TournamentShowController.$inject = ['$scope', '$stateParams', 'usSpinnerService', 'Tournament'];

  function TournamentShowController($scope, $stateParams, usSpinnerService, Tournament) {

    console.log('TournamentShowController')
    $scope.tournament = {};

    activate();

    function activate() {
      Tournament.get(parseInt($stateParams['id']))
        .then(function(result) {
          $scope.tournament = result;
        })
    }

  };

  angular.module('app').controller('TournamentShowController', TournamentShowController);
})();
