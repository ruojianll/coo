(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/card',
        templateUrl: 'app/template_lpl/card_lpl.template.html',
        controller: 'card_lpl',
        
      });

    $urlRouterProvider.otherwise('/card');
  }

})();
