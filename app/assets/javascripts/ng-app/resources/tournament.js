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

    resource.createPlayers = function(id, users) {
      return resource.$post('/api/tournaments/'+id+'/create_players', {users: users});
    };

    resource.getPlayers = function(id) {
      return resource.get(''+id+'/players');
    };

    resource.getRounds = function(id) {
      return resource.get(''+id+'/rounds');
    };

    return resource;
  };

  Tournament.$inject = ['railsResourceFactory', 'railsSerializer'];
  angular.module('app').factory('Tournament', Tournament);
})();
