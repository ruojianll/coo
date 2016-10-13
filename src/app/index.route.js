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
<<<<<<< HEAD
      .state('card', {
        url: '/card',
        templateUrl: 'app/card/card.html',
        controller: 'MainController',
        controllerAs: 'main'
=======
      .state('wzy.login', {
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
>>>>>>> 28045609a09e6115b7e6dfa729e569701b90d4e9
      });
    $urlRouterProvider.otherwise('/home/haoqing');
  }

})();
