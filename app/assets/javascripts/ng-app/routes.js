(function() {
  'use strict';

  function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', home)
      .state('tournaments', tournaments)
      .state('tournaments.new', tournaments_new);
  };

  var home = {
    url: '/',
    templateUrl: "templates/home.html",
    ncyBreadcrumb: {
      label: 'Home'
    }
  };

  var tournaments = {
    parent: 'home',
    url: 'tournaments',
    ncyBreadcrumb: {
      label: 'Tournaments'
    },
    views: {
      '@': {
        controller: "TournamentsController",
        templateUrl: "templates/tournaments.html"
      }
    }
  };

  var tournaments_new = {
    url: '/new',
    ncyBreadcrumb: {
      label: 'New'
    },
    views: {
      '@': {
        controller: "TournamentsController",
        templateUrl: "templates/tournaments_new.html"
      },
      'rounds@tournaments.new': {
        templateUrl: "templates/tournaments_new_rounds.html"
      }
    }
  };

  angular.module('app').config(config);
})();
