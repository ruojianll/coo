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
        controller: 'accountServ'

      })
      .state('wzy.noloading', {
        url: '/noloading',
        templateUrl: 'app/noloading/weidenglu.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('wzy', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'MainController'

      });
<<<<<<< HEAD
    $urlRouterProvider.otherwise('/home/noloading');
=======
    $urlRouterProvider.otherwise('/home/haoqing');

>>>>>>> 1ed2cf9b48481bddf860e4d8a6f69e7733c3dab4
  }

})();
