(function() {
  'use strict';

  TournamentsIndexCtrl.$inject = [
    '$scope',
    'Tournament',
    'CONSTANTS',
    '$rootScope',
    '$filter'
  ];

  function TournamentsIndexCtrl(
    $scope,
    Tournament,
    CONSTANTS,
    $rootScope,
    $filter
  ) {

    var vm = this;
    vm.rootScope = $rootScope;
    vm.tournaments = [];
    vm.yearFilter = null;
    vm.selectedYear = null;
    vm.statusFilter = CONSTANTS.TOURNAMENT.STATUSES;
    vm.selectedStatus = null;
    vm.selectedFilter = selectedFilter;

    activate();

    function activate() {
      Tournament.query()
        .then(function(response) {
          vm.tournaments = response;
        }, function() {
        })
      Tournament.get('years')
        .then(function(response) {
          vm.yearFilter = response;
        })
    }


    function selectedFilter(tourn) {
      var year = true;
      var status = true;
      if (vm.selectedYear) {
        year = $filter('date')(tourn.createdAt, 'yyyy') == vm.selectedYear
      }
      if (vm.selectedStatus) {
        if (vm.selectedStatus == CONSTANTS.TOURNAMENT.STATUSES.FINISHED) {
          status = tourn.finished
        } else {
          status = !tourn.finished
        }
      }
      return year && status;
    }

  };

  angular.module('app').controller('TournamentsIndexCtrl', TournamentsIndexCtrl);
})();
