(function() {
  'use strict';

  SignupController.$inject = ['$scope', '$auth'];

  function SignupController($scope, $auth) {

    $scope.signup = function(user) {
      $auth.signup(user)
        .then(function(response) {
          // Redirect user here to login page or perhaps some other intermediate page
          // that requires email address verification before any other part of the site
          // can be accessed.
        })
        .catch(function(response) {
          // Handle errors here.
        });
    };
  };

  angular.module('app').controller('SignupController', SignupController);
})();
