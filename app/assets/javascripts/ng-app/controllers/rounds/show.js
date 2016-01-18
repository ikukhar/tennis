(function() {
  'use strict';

  RoundsShowCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$state',
    'Round',
    'ROUND'
  ];

  function RoundsShowCtrl(
    $scope,
    $stateParams,
    $rootScope,
    $state,
    Round,
    ROUND
  ) {

    var vm = this;
    vm.round = [];
    vm.championshipTable = [];

    activate();

    function activate() {
      var roundId = parseInt($stateParams['roundId'])
      Round.get(roundId)
        .then(function(response) {
            vm.round = response;
            if (vm.round.stage = ROUND.STAGES.CHAMPIONSHIP.value) {
              Round.$get('api/rounds/'+roundId+'/championship_table_data')
                .then(function(response) {
                    vm.championshipTable = response
                  },
                  function(error) {
                    $rootScope.$emit('error', error.data)
                  })
            }},
            function(error) {
              $rootScope.$emit('error', error.data)
            })
    };

  };

  angular.module('app').controller('RoundsShowCtrl', RoundsShowCtrl);
})();
