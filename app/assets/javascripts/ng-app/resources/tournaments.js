(function(){'use strict';

  var Tournaments = function($resource) {
    return $resource('/api/tournaments/:id.json', { id: '@id' },
        {
            'update': { method:'PUT' }
        });
  };

  Tournaments.$inject = ['$resource'];
  angular.module('app').factory('Tournaments', Tournaments);
})();
