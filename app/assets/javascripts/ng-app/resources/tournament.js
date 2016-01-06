(function() {
  'use strict';

  var Tournament = function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
      url: '/api/tournaments',
      name: 'tournament',
      serializer: railsSerializer(function() {
        this.nestedAttribute('rounds');
      })
    });
  };

  Tournament.$inject = ['railsResourceFactory', 'railsSerializer'];
  angular.module('app').factory('Tournament', Tournament);
})();
