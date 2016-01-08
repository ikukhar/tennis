(function() {
  'use strict';

  function config($stateProvider, $urlRouterProvider) {

  //  $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', home)
      .state('tournaments', tournaments)
      .state('addTournament', addTournament)
      .state('editTournament', editTournament)
      .state('showTournament', showTournament)
      .state('login', login)
      .state('signup', signup)
      .state('profile', profile)
      .state('editProfile', editProfile)
      ;
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

  var addTournament = {
    parent: 'tournaments',
    url: '/new',
    ncyBreadcrumb: {
      label: 'New'
    },
    views: {
      '@': {
        controller: "TournamentAddController",
        templateUrl: "templates/tournament-add.html"
      }
    }
  };

  var editTournament = {
    parent: 'tournaments',
    url: '/edit/:id',
    ncyBreadcrumb: {
      label: 'Edit'
    },
    views: {
      '@': {
        controller: "TournamentEditController",
        templateUrl: "templates/tournament-edit.html"
      }
    }
  };

  var showTournament = {
    parent: 'tournaments',
    url: '/show/:id',
    ncyBreadcrumb: {
      label: 'Show'
    },
    views: {
      '@': {
        controller: "TournamentShowController",
        templateUrl: "templates/tournament-show.html"
      }
    }
  };

  var login = {
    parent: 'home',
    url: 'login',
    ncyBreadcrumb: {
      label: 'Login'
    },
    views: {
      '@': {
        controller: "LoginController",
        templateUrl: "templates/login.html"
      }
    }
  };

  var signup = {
    parent: 'home',
    url: 'signup',
    ncyBreadcrumb: {
      label: 'Sign Up'
    },
    views: {
      '@': {
        controller: "SignupController",
        templateUrl: "templates/signup.html"
      }
    }
  };

  var profile = {
    parent: 'home',
    url: 'profile',
    ncyBreadcrumb: {
      label: 'Profile'
    },
    views: {
      '@': {
        controller: "ProfileController",
        templateUrl: "templates/profile-show.html"
      }
    }
  };

  var editProfile = {
    parent: 'profile',
    url: '/edit/:id',
    ncyBreadcrumb: {
      label: 'Edit'
    },
    views: {
      '@': {
        controller: "ProfileController",
        templateUrl: "templates/profile-edit.html"
      }
    }
  };

  angular.module('app').config(config);
})();
