(function() {
  'use strict';

  UsersNewCtrl.$inject = ['$scope', '$state', 'User', '$rootScope'];

  function UsersNewCtrl($scope, $state, User, $rootScope) {

    var vm = this;
    vm.user = new User;
    vm.create = create;


    function create() {
      vm.user
        .create()
        .then(function(sucess) {
          $state.go('^');
        },function(error){
          $rootScope.$emit('error', error.data)
        });
    };

  };

  angular.module('app').controller('UsersNewCtrl', UsersNewCtrl);
})();
