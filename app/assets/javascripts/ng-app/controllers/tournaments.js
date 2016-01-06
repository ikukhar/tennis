(function() {
  'use strict';

  TournamentsController.$inject = ['$scope', 'usSpinnerService', 'Tournament'];

  function TournamentsController($scope, usSpinnerService, Tournament) {

    $scope.tournaments = [];
    $scope.destroy = destroy;

    activate();

    function activate() {
      usSpinnerService.spin('spinner');
      Tournament.query()
        .then(function(response) {
          $scope.tournaments = response;
          usSpinnerService.stop('spinner');
        })
        .catch(function(){
          usSpinnerService.stop('spinner');
        })
    }

    function destroy(tournament) {
      //TODO: Answer!
      usSpinnerService.spin('spinner');
      tournament
        .delete()
        .then(function() {
          $scope.tournaments.splice($scope.tournaments.indexOf(tournament), 1)
          usSpinnerService.stop('spinner');
        })
    };

  };

  angular.module('app').controller('TournamentsController', TournamentsController);
})();
