(function() {
  'use strict';

  function TournamentsController($state, list, current) {

    var vm = this;
    vm.current = current;
    vm.list = list;
    vm.destroy = destroy;
    vm.state = $state;

    if ($state.is('tournaments.new')) {
      vm.submit = create
      vm.formName = "New tournament"
      vm.submitBtnName = "Create"
    } else if ($state.is('tournaments.edit')) {
      vm.submit = edit
      vm.formName = "Edit tournament"
      vm.submitBtnName = "Update"
    };

    function create() {
      vm.current
        .create()
        .then(function(results) {
          vm.list.push(vm.current)
          $state.go('^');
        });
    };

    function edit() {
      vm.current
        .update()
        .then(function(results) {
          var index = vm.list.findIndex(function(obj) {
            return obj.id == vm.current.id;
          });
          if (index != -1) {
            vm.list[index] = vm.current
          }
          $state.go('^');
        });
    };

    function destroy(tournament) {
      //TODO: Answer!
      tournament
        .delete()
        .then(function() {
          vm.list.splice(vm.list.indexOf(tournament), 1)
        })
    };
  };

  TournamentsController.$inject = ['$state', 'list', 'current'];
  angular.module('app').controller('TournamentsController', TournamentsController);
})();
