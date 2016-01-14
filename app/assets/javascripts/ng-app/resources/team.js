(function(){'use strict';

  var Team = function(railsResourceFactory) {
    return railsResourceFactory({
        url: '/api/teams',
        name: 'team'
      });
  };

  Team.$inject = ['railsResourceFactory'];
  angular.module('app').factory('Team', Team);
})();
