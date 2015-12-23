(function() {'use strict';

  function TournamentsController($scope, $state, Tournaments) {
    $scope.tournaments = Tournaments.query();
  };

  TournamentsController.$inject = ['$scope', '$state', 'Tournaments'];
  angular.module('app').controller('TournamentsController', TournamentsController);
})();
