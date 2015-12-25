(function() {
  'use strict';

  function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', home)
      .state('tournaments', tournaments)
      .state('tournaments.new', tournaments_new)
      .state('tournaments.edit', tournaments_edit);
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
        controllerAs: 'vm',
        templateUrl: "templates/tournaments.html"
      }
    },
    resolve: {
      list: function(Tournaments) {
        return Tournaments.query()
          .then(function(results) {
            return results;
          })
      },
      current: function() { return {} }
    }
  };

  var tournaments_new = {
    url: '/new',
    ncyBreadcrumb: {
      label: 'New'
    },
    views: {
      '@tournaments': {
        controller: "TournamentsController",
        controllerAs: 'vm',
        templateUrl: "templates/tournaments_editing.html"
      },
      'rounds@tournaments.new': {
        templateUrl: "templates/tournaments_editing_rounds.html"
      }
    },
    resolve: {
      current: function(Tournaments) { return new Tournaments }
    }
  };

  var tournaments_edit = {
    url: '/edit/:id',
    ncyBreadcrumb: {
      label: 'Edit'
    },
    views: {
      '@tournaments': {
        controller: "TournamentsController",
        controllerAs: 'vm',
        templateUrl: "templates/tournaments_editing.html"
      },
      'rounds@tournaments.edit': {
        templateUrl: "templates/tournaments_editing_rounds.html"
      }
    },
    resolve: {
      current: function(Tournaments, $stateParams) {
        return Tournaments.get(parseInt($stateParams['id']))
          .then(function(results) {
            return results;
          })
      }
    }
  };

  angular.module('app').config(config);
})();
