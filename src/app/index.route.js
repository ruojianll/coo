(function() {
  'use strict';

  angular
    .module('coo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
<<<<<<< HEAD
    $stateProvider
      .state('home', {
        url: '/card',
        templateUrl: 'app/template_lpl/card_lpl.template.html',
        controller: 'card_lpl',
        
=======
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

>>>>>>> 9deddeeafccef4e16fc6bd2363666ea432a312eb
      });
    $urlRouterProvider.otherwise('/home/haoqing');

<<<<<<< HEAD
    $urlRouterProvider.otherwise('/card');
=======
>>>>>>> 9deddeeafccef4e16fc6bd2363666ea432a312eb
  }

})();
