(function() {
  'use strict';

  TournamentsEditCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'Tournament'];

  function TournamentsEditCtrl($scope, $rootScope, $state, $stateParams, Tournament) {

    var vm = this;
    vm.tournament = {};
    vm.update = update;

    activate();

    function activate() {
      Tournament.get(parseInt($stateParams['id']))
        .then(function(result) {
          vm.tournament = result;
        })
    }

    function update() {
      vm.tournament
        .update()
        .then(function(results) {
          $state.go('showTournament', vm.tournament);
        }, function(error) {
          $rootScope.$emit('error', error.data)
        });
    };

  };

  angular.module('app').controller('TournamentsEditCtrl', TournamentsEditCtrl);
})();
