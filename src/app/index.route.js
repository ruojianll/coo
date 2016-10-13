(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
       $stateProvider.state('home', {
        url: '/date',
        templateUrl: 'app/Bootstrap/date.Bootstrap.html',
        controller: 'date_con',
      })
			 $stateProvider.state('list', {
        url: '/',
        templateUrl: 'app/card/list.card.html',
        controller: 'list_con',
      });
    $urlRouterProvider.otherwise('/');
  }

})();
