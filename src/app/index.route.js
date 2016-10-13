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
      .state('wzy.login', {
        url: '/denglu',
        templateUrl: 'app/login/denglu.html',
        controller: 'accountServ'

      })
      .state('wzy.noloading', {
        url: '/noloading',
        templateUrl: 'app/noloading/weidenglu.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
       .state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'MainController'
      });
    $urlRouterProvider.otherwise('/home/noloading');
  }

})();
