(function() {
  'use strict';

  angular.module('app', [
    'ui.router',
    'LocalStorageModule',
    'ngResource',
    'ncy-angular-breadcrumb',
    'rails',
    'ui-notification',
    'angularSpinner',
    'satellizer'
  ]);

  angular.module('app').config(
    function($locationProvider, $httpProvider, NotificationProvider, $authProvider) {
      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('ErrorHandlerInterceptor');

      NotificationProvider.setOptions({
        startTop: 55
      });

      // GitHub
      $authProvider.github({
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin,
        optionalUrlParams: ['scope'],
        scope: ['user:email'],
        scopeDelimiter: ' ',
        type: '2.0',
        popupOptions: {
          width: 1020,
          height: 618
        }
      });
    });


  run.$inject = ['$rootScope', 'Notification', '$state'];

  function run($rootScope, Notification, $state) {
    $rootScope.$on('responseError', function(event, responce) {
      console.log(responce);
      Notification.error(responce.statusText);
    });

    $rootScope.$on('error', function(event, message) {
      Notification.error(message);
    });

    $rootScope.$on('auth_error', function(event, message) {
      $state.go('login')
      Notification.error(message);
    });
  }

  angular.module('app').run(run);
})();
