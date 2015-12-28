(function(){'use strict';

  var Rounds = function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        url: '/api/rounds',
        name: 'round',
        serializer: railsSerializer(function () {
          //  this.nestedAttribute('rounds');
          //  this.rename('rounds', 'rounds_attributes');
        })
      });
  };

  Rounds.$inject = ['railsResourceFactory', 'railsSerializer'];
  angular.module('app').factory('Rounds', Rounds);
})();
