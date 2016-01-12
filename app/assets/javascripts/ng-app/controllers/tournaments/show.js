(function() {
  'use strict';

  TournamentsShowCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'Tournament', '$state'];

  function TournamentsShowCtrl($scope, $stateParams, $rootScope, Tournament, $state) {

    $scope.tournament = {};
    $scope.destroy = destroy;

    activate();

    function activate() {
      var tournament_id = parseInt($stateParams['id'])
      Tournament.get(tournament_id)
        .then(function(success) {
          $scope.tournament = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        })
    };

    function destroy(tournament) {
      //TODO: Answer!
      tournament
        .delete()
        .then(function() {
          $state.go('^')
        })
    };

  };

  angular.module('app').controller('TournamentsShowCtrl', TournamentsShowCtrl);
})();
