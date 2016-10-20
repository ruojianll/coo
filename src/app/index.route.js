(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider){
    $stateProvider.state('card', {
        url: '/card',
        templateUrl: 'app/card/card.html',
        controller: 'MainController',
        controllerAs: 'main'
		}).state('wzy.login', {
        url: '/denglu',
        templateUrl: 'app/login/denglu.html',
        controller: 'accountServ',
      })
      .state('wzy.noloading', {
        url: '/noloading',
        templateUrl: 'app/noloading/weidenglu.html',
        controller: 'noloading'
      }).state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'won'
      }).state('wzy.machao', {
        url: '/machao',
        templateUrl: 'app/machao/newkp.html',
        controller: 'MainController'
}).state('wzy.message', {
        url: '/message',
        templateUrl: 'app/message/message.html',
        controller: 'accountServ'
      });
    $urlRouterProvider.otherwise('/home/noloading');
  }
})();
