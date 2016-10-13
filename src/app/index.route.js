(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
       .state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise('/home');
  }

})();
