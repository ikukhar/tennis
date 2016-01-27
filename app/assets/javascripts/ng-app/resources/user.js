(function() {
  'use strict';

  User.$inject = ['railsResourceFactory', 'railsSerializer'];

  function User(railsResourceFactory) {
    return railsResourceFactory({
      url: '/api/users',
      name: 'user'
    });
  };

  angular.module('app').factory('User', User);
})();
