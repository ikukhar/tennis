(function() {
  'use strict';

  function TournamentsController($scope, $state, Tournaments) {
    $scope.tournaments = [];
    Tournaments.query().then(function(results) {
      $scope.tournaments = results;
    });

    $scope.create = create;

    function create() {
      new Tournaments($scope.data)
        .create()
        .then(function(results) {
          console.log(results)
          $scope.tournaments.push(results);
          $state.go('^');
        })
        .catch(function(results) {
          console.log("error saving tournament");
        });
    }
  };

  TournamentsController.$inject = ['$scope', '$state', 'Tournaments'];
  angular.module('app').controller('TournamentsController', TournamentsController);
})();
