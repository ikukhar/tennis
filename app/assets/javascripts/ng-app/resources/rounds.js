(function(){'use strict';

  var Rounds = function($resource) {
    return $resource('/api/rounds/:id.json', { id: '@id' , tournament_id: '@tournament_id'},
        {
            'update': { method:'PUT' }
        });
  };

  Rounds.$inject = ['$resource'];
  angular.module('app').factory('Rounds', Rounds);
})();
