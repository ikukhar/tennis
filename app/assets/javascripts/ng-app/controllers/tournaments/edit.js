(function() {
  'use strict';

  TournamentsEditCtrl.$inject = ['$scope', '$state', '$stateParams', 'Tournament'];

  function TournamentsEditCtrl($scope, $state, $stateParams, Tournament) {

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
      $scope.tournament
        .update()
        .then(function(results) {
          $state.go('^');
        });
    };

  };

  angular.module('app').controller('TournamentsEditCtrl', TournamentsEditCtrl);
})();
