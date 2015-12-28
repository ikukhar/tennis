(function() {
  'use strict';

  var Tournament = function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
      url: '/api/tournaments',
      name: 'tournament',
      serializer: railsSerializer(function() {
        // this.resource('round', 'Rounds')
        this.nestedAttribute('rounds');
        // this.rename('rounds', 'rounds_attributes');
      })
    });
  };

  Tournament.$inject = ['railsResourceFactory', 'railsSerializer'];
  angular.module('app').factory('Tournament', Tournament);
})();
