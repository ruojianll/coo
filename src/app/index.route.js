(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
 //    $stateProvider.state('home', {
//      url: '/date',
//      templateUrl: 'app/Bootstrap/date.Bootstrap.html',
//      controller: 'date_con',
//    })
//			 .state('list', {
//      url: '/',
//
//      templateUrl: 'app/card/list.card.html',
//      controller: 'list_con',
//    });
//  $urlRouterProvider.otherwise('/');

//      templateUrl: 'app/main/main.html',
//      controller: 'MainController',
//      controllerAs: 'main'
//    })
			$stateProvider.state('card', {
        url: '/card',
        templateUrl: 'app/card/card.html',
        controller: 'MainController',
        controllerAs: 'main'
		}).state('wzy.login', {
        url: '/denglu',
        templateUrl: 'app/login/denglu.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('wzy.haoqing', {
        url: '/haoqing',
        templateUrl: 'app/haoqing/weidenglu.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'MainController'

      });
    $urlRouterProvider.otherwise('/home/haoqing');

  }

})();
