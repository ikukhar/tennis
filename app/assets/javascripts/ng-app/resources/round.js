(function(){'use strict';

  var Round = function(railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/rounds',
        name: 'round'
      });
  };

  Round.$inject = ['railsResourceFactory'];
  angular.module('app').factory('Round', Round);
})();
