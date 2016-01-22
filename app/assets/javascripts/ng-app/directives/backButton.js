(function() {
  'use strict';

  backButton.$inject = ['$window'];

  function backButton($window) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.bind('click', function() {
          $window.history.back();
        });
      }
    };
  };

  angular.module('app').directive('backButton', backButton);
})();
