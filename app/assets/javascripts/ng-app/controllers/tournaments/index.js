(function() {
  'use strict';

  TournamentsIndexCtrl.$inject = ['$scope', 'usSpinnerService', 'Tournament'];

  function TournamentsIndexCtrl($scope, usSpinnerService, Tournament) {

    $scope.tournaments = [];

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


  };

  angular.module('app').controller('TournamentsIndexCtrl', TournamentsIndexCtrl);
})();
