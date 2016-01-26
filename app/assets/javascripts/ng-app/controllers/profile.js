(function() {
  'use strict';

  ProfileCtrl.$inject = ['$scope', '$state', '$rootScope', '$filter', '$auth', '$window'];

  function ProfileCtrl($scope, $state, $rootScope, $filter, $auth, $window) {

    $scope.user = $rootScope.currentUser;
    $scope.back = back;
    $scope.update = update;
    $scope.link = link;
    $scope.unlink = unlink;
    $scope.have_auth = have_auth;

    function back() {
      $window.history.back();
    }

    function update() {
      $scope.user
        .update()
        .then(function(success) {
          $rootScope.setUser($scope.user);
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
          $scope.user.authorizations.push({
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
          var arr = $scope.user.authorizations;
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
      return $filter('filter')($scope.user.authorizations, {
        provider: provider
      })[0];;
    }
  };

  angular.module('app').controller('ProfileCtrl', ProfileCtrl);
})();
