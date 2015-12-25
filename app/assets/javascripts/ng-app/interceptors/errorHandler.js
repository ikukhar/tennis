function ErrorHandlerInterceptor($q, $rootScope) {
  return {
    responseError: function(response) {
      $rootScope.$emit('responseError', response);
      return $q.reject(response);
    }
  }
}

ErrorHandlerInterceptor.$inject = ['$q', '$rootScope'];
angular.module('app').factory('ErrorHandlerInterceptor', ErrorHandlerInterceptor);
