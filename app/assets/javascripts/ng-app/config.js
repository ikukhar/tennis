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

      NotificationProvider.setOptions({
        startTop: 55
      });

      //  TODO: clientId from ENV[]

      // // GitHub
      $authProvider.github({
        url: '/auth/github/callback',
        clientId: '6b3c76daf7f90ecddf66',
        redirectUri: window.location.origin + '/',
        scope: ['user:name, user:email'],
      });
      //
      // Facebook
      $authProvider.facebook({
        url: '/auth/facebook/callback',
        clientId: '542938712538069',
        redirectUri: window.location.origin + '/',
        scope: 'email'
      });

      $authProvider.oauth2({
        name: 'vkontakte',
        url: '/auth/vkontakte/callback',
        authorizationEndpoint: 'https://oauth.vk.com/authorize',
        clientId: '5215259',
        redirectUri: window.location.origin + '/',
        scope: 'email',
        display: 'popup',
        responseType: 'code',
        requiredUrlParams: ['response_type', 'client_id', 'redirect_uri', 'display', 'scope'],
        scopeDelimiter: ',',
      });


      $httpProvider.interceptors.push('ErrorHandlerInterceptor');

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
