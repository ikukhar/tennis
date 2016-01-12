(function() {
  'use strict';

  PlayersIndexCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'Tournament'];

  function PlayersIndexCtrl($scope, $stateParams, $rootScope, Tournament) {

    $scope.players = [];

    activate();

    function activate() {
      var tournamentId = parseInt($stateParams['id'])
      Tournament.getPlayers(tournamentId)
        .then(function(success) {
          $scope.players = success;
        }, function(error) {
          $rootScope.$emit('error', error)
        })
    };


  };

  angular.module('app').controller('PlayersIndexCtrl', PlayersIndexCtrl);
})();
