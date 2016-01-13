(function() {
  'use strict';

  UsersIndexCtrl.$inject = ['$scope', 'User'];

  function UsersIndexCtrl($scope, User) {

    var vm = this;
    vm.users = [];

    activate();

    function activate() {
      User.query()
        .then(function(success) {
          vm.users = success;
        }, function(error){
          $rootScope.$emit('error', error.data)
        })
    }


  };

  angular.module('app').controller('UsersIndexCtrl', UsersIndexCtrl);
})();
