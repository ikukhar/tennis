(function() {
  'use strict';

  RatingIndexCtrl.$inject = ['$scope', '$http'];

  function RatingIndexCtrl($scope, $http) {

    var vm = this;
    vm.playerStatistic = [];

    activate();

    function activate() {
      $http.get('api/rating')
        .then(function(response) {
          vm.playerStatistic = response.data['users'];
        })
    }

  };

  angular.module('app').controller('RatingIndexCtrl', RatingIndexCtrl);
})();
