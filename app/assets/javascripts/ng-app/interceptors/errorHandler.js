(function() {
  'use strict';

  function ErrorHandlerInterceptor($q, $rootScope) {
    return {
      // response: function(response) {
      //   return response;
      // },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $rootScope.$emit('auth_error', response.data);
        }
        return $q.reject(response);
      }
    }
  }

  ErrorHandlerInterceptor.$inject = ['$q', '$rootScope'];
  angular.module('app').factory('ErrorHandlerInterceptor', ErrorHandlerInterceptor);
  
})();
