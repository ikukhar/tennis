angular.module('app', [
  'ngRoute',
  'LocalStorageModule'
]);

angular.module('app').config(function($routeProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
});
