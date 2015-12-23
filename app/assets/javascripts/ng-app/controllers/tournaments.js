(function() {'use strict';

  function TournamentsController($scope, Tournaments) {
    $scope.tournaments = Tournaments.query()
  };

  TournamentsController.$inject = ['$scope', 'Tournaments'];
  angular.module('app').controller('TournamentsController', TournamentsController);
})();
