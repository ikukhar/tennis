(function(){'use strict';

  var Tournaments = function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        url: '/api/tournaments',
        name: 'tournament',
        serializer: railsSerializer(function () {
            this.nestedAttribute('rounds');
        })
      });
  };

  Tournaments.$inject = ['railsResourceFactory', 'railsSerializer'];
  angular.module('app').factory('Tournaments', Tournaments);
})();
