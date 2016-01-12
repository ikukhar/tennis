(function() {
  'use strict';

  function config($stateProvider, $urlRouterProvider) {

    //  $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', home)
      .state('tournaments', tournaments)
      .state('newTournament', newTournament)
      .state('newTournament.tournament', newTournament_tournament)
      .state('newTournament.players', newTournament_players)
      .state('newTournament.rounds', newTournament_rounds)
      .state('newTournament.games', newTournament_games)
      .state('showTournament', showTournament)
      .state('showTournament.editTournament', showTournament_editTournament)
      .state('showTournament.editPlayers', showTournament_editPlayers)
      .state('login', login)
      .state('signup', signup)
      .state('profile', profile)
      .state('editProfile', editProfile);
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
        controller: "TournamentsIndexCtrl",
        templateUrl: "templates/tournaments/index.html"
      }
    }
  };

  var newTournament = {
    parent: 'tournaments',
    url: '/new',
    ncyBreadcrumb: {
      label: 'New'
    },
    views: {
      '@': {
        controller: "TournamentsNewCtrl",
        templateUrl: "templates/tournaments/new.html"
      }
    }
  };

  var newTournament_tournament = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Tournament'
    },
    templateUrl: "templates/tournaments/new-tournament.html"
  };

  var newTournament_players = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Players'
    },
    templateUrl: "templates/tournaments/new-players.html"
  };

  var newTournament_rounds = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Rounds'
    },
    templateUrl: "templates/tournaments/new-rounds.html"
  };

  var newTournament_games = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Games'
    },
    templateUrl: "templates/tournaments/new-games.html"
  };

  var showTournament = {
    parent: 'tournaments',
    url: '/show/:id',
    ncyBreadcrumb: {
      label: 'Show'
    },
    views: {
      '@': {
        templateUrl: "templates/tournaments/show.html"
      },
      'tournament@showTournament': {
        controller: "TournamentsShowCtrl",
        // templateUrl: "templates/tournaments/show.html"
      },
      'rounds@showTournament': {
        controller: "RoundsIndexCtrl",
        templateUrl: "templates/tournaments/rounds/index.html"
      },
      'players@showTournament': {
        controller: "PlayersIndexCtrl",
        templateUrl: "templates/tournaments/players/index.html"
      }
    }
  };

  var showTournament_editTournament = {
    parent: 'showTournament',
    ncyBreadcrumb: {
      label: 'Edit tournament'
    },
    views: {
      'tournament@showTournament': {
        controller: "TournamentsEditCtrl",
        templateUrl: "templates/tournaments/edit.html"
      }
    }
  };

  var showTournament_editPlayers = {
    parent: 'showTournament',
    ncyBreadcrumb: {
      label: 'Edit players'
    },
    views: {
      'players@showTournament': {
        controller: "PlayersEditCtrl",
        templateUrl: "templates/tournaments/players/edit.html"
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
        controller: "LoginCtrl",
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
        controller: "SignupCtrl",
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
        controller: "ProfileCtrl",
        templateUrl: "templates/profile/show.html"
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
        controller: "ProfileCtrl",
        templateUrl: "templates/profile/edit.html"
      }
    }
  };


  angular.module('app').config(config);
})();
