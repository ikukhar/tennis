(function() {
  'use strict';

  var Tournament = function(railsResourceFactory, railsSerializer) {

    var resource = railsResourceFactory({
      url: '/api/tournaments',
      name: 'tournament',
      // serializer: railsSerializer(function() {
      //   this.nestedAttribute('rounds');
      // })
    });

    resource.createTournament = function(data) {
      return resource.$post('/api/tournaments', data)
    }

    return resource;
  };

  Tournament.$inject = ['railsResourceFactory', 'railsSerializer'];
  angular.module('app').factory('Tournament', Tournament);
})();
