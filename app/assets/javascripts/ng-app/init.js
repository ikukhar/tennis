angular.module('app', [
  'ui.router',
  'LocalStorageModule',
  'ngResource',
  'ncy-angular-breadcrumb'
]);

angular.module('app').config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

var run = function($document) {
}

run.$inject = ['$document'];
angular.module('app').run(run);
