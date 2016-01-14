(function(){'use strict';

  var Game = function(railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/games',
        name: 'game'
      });
  };

  Game.$inject = ['railsResourceFactory'];
  angular.module('app').factory('Game', Game);
})();
