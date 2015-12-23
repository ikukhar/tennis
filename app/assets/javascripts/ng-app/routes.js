(function() {
  'use strict';

  function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('tournaments', {
        parent: 'home',
        url: 'tournaments',
        ncyBreadcrumb: {
          label: 'Tournaments'
        },
        views: {
          '@': {
            controller: "TournamentsController",
            templateUrl: "templates/tournaments.html",
          }
        }

      })
      .state('tournaments.new', {
        url: '/new',
        ncyBreadcrumb: {
          label: 'New'
        },
        views: {
          '@': {
            controller: "TournamentsController",
            templateUrl: "templates/tournaments_new.html",
          }
        }
      });
  };

  angular.module('app').config(config);
})();
