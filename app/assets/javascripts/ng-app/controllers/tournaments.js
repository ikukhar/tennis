(function() {'use strict';

  function TournamentsController($scope, $state, Tournaments) {
    $scope.tournaments = Tournaments.query();
    $scope.create = create;

    function create() {
      console.log('TournamentsController:create');
    }
  };

  TournamentsController.$inject = ['$scope', '$state', 'Tournaments'];
  angular.module('app').controller('TournamentsController', TournamentsController);
})();
