(function() {
  'use strict';

  UsersNewCtrl.$inject = ['$scope', '$state', 'User'];

  function UsersNewCtrl($scope, $state, User) {

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
