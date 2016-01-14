(function() {
  'use strict';

  TournamentsIndexCtrl.$inject = ['$scope', 'usSpinnerService', 'Tournament'];

  function TournamentsIndexCtrl($scope, usSpinnerService, Tournament) {

    var vm = this;
    vm.tournaments = [];

    activate();

    function activate() {
      usSpinnerService.spin('spinner');
      Tournament.query()
        .then(function(response) {
          vm.tournaments = response;
          usSpinnerService.stop('spinner');
        })
        .catch(function(){
          usSpinnerService.stop('spinner');
        })
    }

  };

  angular.module('app').controller('TournamentsIndexCtrl', TournamentsIndexCtrl);
})();
