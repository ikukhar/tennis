(function(){'use strict';

  var Player = function(railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/players',
        name: 'player'
      });
  };

  Player.$inject = ['railsResourceFactory'];
  angular.module('app').factory('Player', Player);
})();
