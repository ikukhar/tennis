(function() {
  'use strict';

  RoundsShowCtrl.$inject = ['$scope', '$stateParams', 'Round'];

  function RoundsShowCtrl($scope, $stateParams, Round) {

    $scope.round = {};

    activate();

    function activate() {
      Round.get(parseInt($stateParams['id']))
        .then(function(result) {
          $scope.round = result;
        })
    };

  };

  angular.module('app').controller('RoundsShowCtrl', RoundsShowCtrl);
})();
