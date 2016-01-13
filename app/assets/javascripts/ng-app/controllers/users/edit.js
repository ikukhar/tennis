(function() {
  'use strict';

  UsersEditCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'User'];

  function UsersEditCtrl($scope, $rootScope, $state, $stateParams, User) {

    var vm = this;
    vm.user = {};
    vm.update = update;

    activate();

    function activate() {
      User.get(parseInt($stateParams['id']))
        .then(function(success) {
          vm.user = success;
        },function(error){
          $rootScope.$emit('error', error.data)
        })
    }

    function update() {
      vm.user
        .update()
        .then(function(success) {
          $state.go('^');
        }, function(error){
          $rootScope.$emit('error', error.data)
        });
    };

  };

  angular.module('app').controller('UsersEditCtrl', UsersEditCtrl);
})();
