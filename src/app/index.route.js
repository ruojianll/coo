(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/denglu',
        templateUrl: 'app/login/denglu.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('wzy.haoqing', {
        url: '/haoqing',
        templateUrl: 'app/haoqing/weidenglu.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
       .state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'MainController'
      });
    $urlRouterProvider.otherwise('/home/haoqing');
  }

})();
