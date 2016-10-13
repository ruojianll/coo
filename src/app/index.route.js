(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

//  $stateProvider
//    .state('home', {
//      url: '/card',
//      templateUrl: 'app/template_lpl/card_lpl.template.html',
//      controller: 'card_lpl'
//  }) 
	
			$stateProvider
			.state('card', {
        url: '/card',
        templateUrl: 'app/card/card.html',
        controller: 'MainController'
		}).state('wzy.login', {
        url: '/denglu',
        templateUrl: 'app/login/denglu.html',
        controller: 'MainController'
      }).state('wzy.haoqing', {
        url: '/haoqing',
        templateUrl: 'app/haoqing/weidenglu.html',
        controller: 'MainController'
      }).state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'MainController'
      });
    $urlRouterProvider.otherwise('/home/haoqing');


  

  }

})();
