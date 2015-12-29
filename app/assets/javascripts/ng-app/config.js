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
  });

var run = function($rootScope, Notification) {
  $rootScope.$on('responseError', function(event, responce) {
    console.log(responce);
    Notification.error(responce.statusText);
  });

  $rootScope.current_user = {
    signedIn: false,
    email: 'test@test.com'
  }
}

run.$inject = ['$rootScope', 'Notification'];
angular.module('app').run(run);
