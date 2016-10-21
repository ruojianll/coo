(function() {'use strict'; angular.module('coo').config(routerConfig);
  /** @ngInject */
<<<<<<< HEAD
   function routerConfig($stateProvider, $urlRouterProvider) {
  $stateProvider.state('wzy.card', {
         url: '/card',
=======
  function routerConfig($stateProvider, $urlRouterProvider){
    $stateProvider.state('card', {
        url: '/card?board_id',
>>>>>>> 27c32856cfcba7bceaf40794a128fbeaae103b3a
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
        controller: 'comder'
      }).state('wzy.yan', {
        url: '/yan',
        templateUrl: 'app/lyan/liuyan.html',
        controller: 'yan'
      }).state('wzy.machao.netwo', {
        url: '/netwo?id&name',
        templateUrl: 'app/machao/netwo.html',
        controller: 'comdersht'
      }).state('wzy.machao.neto', {
        url: '/neto',
        templateUrl: 'app/machao/newto.html',
        controller: 'comdertyu'
      })
        
    $urlRouterProvider.otherwise('/home/noloading');
  }
})();
