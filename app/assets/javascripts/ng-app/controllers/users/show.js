(function() {
  'use strict';

  UsersShowCtrl.$inject = ['$scope', '$stateParams', '$rootScope', 'User', '$state'];

  function UsersShowCtrl($scope, $stateParams, $rootScope, User, $state) {

    var vm = this;
    vm.user = {};
    vm.destroy = destroy;

    activate();

    function activate() {
      var id = parseInt($stateParams['id'])
      User.get(id)
        .then(function(success) {
          vm.user = success;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })
    };

    function destroy() {
      //TODO: Answer!
      vm.user
        .delete()
        .then(function() {
          $state.go('^')
        },function(error){
          $rootScope.$emit('error', error.data)
        })
    };

  };

  angular.module('app').controller('UsersShowCtrl', UsersShowCtrl);
})();
