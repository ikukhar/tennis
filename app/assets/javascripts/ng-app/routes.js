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
      .state('editTournament', editTournament)

    .state('login', login)
      .state('signup', signup)
      .state('profile', profile)
      .state('editProfile', editProfile)

    .state('users', users)
      .state('newUser', newUser)
      .state('showUser', showUser)
      .state('editUser', editUser)

    .state('showTournament.showRound', showTournament_showRound)

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
        controller: "TournamentsIndexCtrl",
        controllerAs: 'vm',
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
        controllerAs: 'vm',
        templateUrl: "templates/tournaments/new/new.html"
      }
    }
  };

  var newTournament_tournament = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Tournament'
    },
    templateUrl: "templates/tournaments/new/tournament.html"
  };

  var newTournament_players = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Players'
    },
    templateUrl: "templates/tournaments/new/players.html"
  };

  var newTournament_rounds = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Rounds'
    },
    templateUrl: "templates/tournaments/new/rounds.html"
  };

  var newTournament_games = {
    url: '/tournament',
    ncyBreadcrumb: {
      label: 'Games'
    },
    templateUrl: "templates/tournaments/new/games.html"
  };

  var showTournament = {
    parent: 'tournaments',
    url: '/show/:id',
    ncyBreadcrumb: {
      label: 'Show'
    },
    views: {
      '@': {
        controller: "TournamentsShowCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/tournaments/show.html"
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
        controller: "TournamentsEditCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/tournaments/edit.html"
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

  var users = {
    parent: 'home',
    url: 'users',
    ncyBreadcrumb: {
      label: 'Users'
    },
    views: {
      '@': {
        controller: "UsersIndexCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/users/index.html"
      }
    }
  };

  var newUser = {
    parent: 'users',
    url: '/new',
    ncyBreadcrumb: {
      label: 'New'
    },
    views: {
      '@': {
        controller: "UsersNewCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/users/new.html"
      }
    }
  };

  var showUser = {
    parent: 'users',
    url: '/show/:id',
    ncyBreadcrumb: {
      label: 'Show'
    },
    views: {
      '@': {
        controller: "UsersShowCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/users/show.html"
      }
    }
  };

  var editUser = {
    parent: 'users',
    url: '/edit/:id',
    ncyBreadcrumb: {
      label: 'Edit'
    },
    views: {
      '@': {
        controller: "UsersEditCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/users/edit.html"
      }
    }
  };


  var showTournament_showRound = {
    parent: 'showTournament',
    url: '/round/:roundId',
    ncyBreadcrumb: {
      label: 'Round'
    },
    views: {
      '@': {
        controller: "RoundsShowCtrl",
        controllerAs: 'vm',
        templateUrl: "templates/rounds/show.html"
      }
    }
  };

  angular.module('app').config(config);
})();
