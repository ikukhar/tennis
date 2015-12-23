angular.module('app', [
  'ngRoute',
  'LocalStorageModule',
  'ngResource'
]);

angular.module('app').config(function($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
});
