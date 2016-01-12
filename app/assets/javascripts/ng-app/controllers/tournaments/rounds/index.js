(function() {
  'use strict';

  RoundsIndexCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'Tournament'];

  function RoundsIndexCtrl($scope, $stateParams, $rootScope, Tournament) {

    $scope.rounds = [];

    activate();

    function activate() {
      var tournamentId = parseInt($stateParams['id'])
      Tournament.getRounds(tournamentId)
        .then(function(success) {
          $scope.rounds = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        })
    };


  };

  angular.module('app').controller('RoundsIndexCtrl', RoundsIndexCtrl);
})();
