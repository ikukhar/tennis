(function() {
  'use strict';

  RoundsShowCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$state',
    'Round',
    'CONSTANTS',
    'Game'
  ];

  function RoundsShowCtrl(
    $scope,
    $stateParams,
    $rootScope,
    $state,
    Round,
    CONSTANTS,
    Game
  ) {

    var vm = this;
    vm.round = {};
    vm.championshipTable = null;
    vm.games = [];
    vm.createGames = createGames;


    activate();

    function activate() {
      var roundId = parseInt($stateParams['roundId'])
      Round.get(roundId)
        .then(function(response) {
            vm.round = response;
            vm.games = response.games;
            if (vm.round.name == CONSTANTS.ROUND.STAGES.CHAMPIONSHIP.value) {
              Round.get(roundId + '/championship_table_data')
                .then(function(response) {
                    vm.championshipTable = response
                  },
                  function(error) {
                    $rootScope.$emit('error', error.data)
                  })
            }
          },
          function(error) {
            $rootScope.$emit('error', error.data)
          })

      // Game.query({
      //     round_id: roundId
      //   })
      //   .then(function(response) {
      //     vm.games = response;
      //   }, function(error) {
      //     $rootScope.$emit('error', error.data)
      //   })
    };

    function createGames() {
      Round.$post('api/rounds/' + vm.round.id + '/createGames')
        .then(function(response) {
          vm.games = response.games;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })
        // Game.generateGame
    }

  };

  angular.module('app').controller('RoundsShowCtrl', RoundsShowCtrl);
})();
