(function() {
  'use strict';

  ProfileCtrl.$inject = ['$scope', '$state', '$rootScope', '$filter', '$auth', 'User'];

  function ProfileCtrl($scope, $state, $rootScope, $filter, $auth, User) {

    var vm = this;
    vm.user = {
      authorizations: []
    };
    vm.update = update;
    vm.link = link;
    vm.unlink = unlink;
    vm.have_auth = have_auth;

    activate();

    function activate() {
      User.get($auth.getPayload().user_id)
        .then(function(success) {
          vm.user = success;
        }, function(error) {
          $rootScope.$emit('error', error.data)
        })
    }

    function update() {
      vm.user
        .update()
        .then(function(success) {
          $rootScope.setUser(vm.user);
          $state.go('^')
        }, function(error) {
          $rootScope.$emit('error', error.data.message)
        })
    };

    function link(provider) {
      $auth.link(provider, {
          isLinking: true
        })
        .then(function(response) {
          vm.user.authorizations.push({
            provider: provider
          });
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    };

    function unlink(provider) {
      $auth.unlink(provider)
        .then(function(response) {
          var arr = vm.user.authorizations;
          provider = $filter('filter')(arr, {
            provider: provider
          })
          arr.splice(arr.indexOf(provider), 1)
        })
        .catch(function(response) {
          $rootScope.$emit('error', response.data);
        });
    };

    function have_auth(provider) {
      return $filter('filter')(vm.user.authorizations, {
        provider: provider
      })[0];
    }
  };

  angular.module('app').controller('ProfileCtrl', ProfileCtrl);
})();
