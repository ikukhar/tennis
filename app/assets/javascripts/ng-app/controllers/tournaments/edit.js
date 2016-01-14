(function() {
  'use strict';

  TournamentsEditCtrl.$inject = ['$scope', '$state', '$stateParams', 'Tournament'];

  function TournamentsEditCtrl($scope, $state, $stateParams, Tournament) {

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
        });
    };

  };

  angular.module('app').controller('TournamentsEditCtrl', TournamentsEditCtrl);
})();
