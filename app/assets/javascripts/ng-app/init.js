angular.module('app', [
  'ui.router',
  'LocalStorageModule',
  'ngResource',
  'ncy-angular-breadcrumb'
]);

angular.module('app').config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});
