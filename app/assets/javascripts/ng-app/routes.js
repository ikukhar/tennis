(function() {'use strict';

  function config($routeProvider) {
    $routeProvider
        .when('/tournaments', {
            templateUrl: 'templates/tournaments.html',
            controller: 'TournamentsController'
        });
  };

  angular.module('app').config(config);
})();
