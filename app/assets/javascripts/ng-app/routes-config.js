(function() {'use strict';

  function config($routeProvider) {
    $routeProvider
        .when('/tournaments', {
            templateUrl: 'templates/tournaments.html',
            controller: 'Tournaments',
            controllerAs: 'vm'
        });
  };

  angular.module('app').config(config);
})();
