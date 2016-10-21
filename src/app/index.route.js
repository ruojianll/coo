(function() {'use strict'; angular.module('coo').config(routerConfig);
  /** @ngInject */
   function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider.state('wzy.card', {
         url: '/card',
        templateUrl: 'app/card/card.html',
        controller: 'card',
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
        }).state('wzy.yan', {
        url: '/yan',
        templateUrl: 'app/lyan/liuyan.html',
        controller: 'yan'
        })
    $urlRouterProvider.otherwise('/home/noloading');
  }
})();
