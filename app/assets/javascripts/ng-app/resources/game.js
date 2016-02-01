(function () {
  'use strict';

  var Game = function (railsResourceFactory) {
    return railsResourceFactory({
      url: '/api/games',
      name: 'game',
      interceptors: [
        {
          'response': function (response, constructor, context) {
            if (angular.isArray(response.data) && angular.isDefined(response.originalData.total_count)) {
              response.data.total_count = response.originalData.total_count
            }
            return response
          }
        }]
    })
  };


  Game.$inject = ['railsResourceFactory'];
  angular.module('app').factory('Game', Game);
})();
