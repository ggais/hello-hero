angular.module('helloHero', [
'ui.router', 
'helloHero.auth',
'helloHero.services',
'helloHero.dashBoard'
])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('home', {
              url: '/',
              templateUrl: 'components/authComponent/signin.html',
              controller: 'AuthController'
          })
          .state('signup', {
              url: '/signup',
              templateUrl: 'components/authComponent/signup.html',
              controller: 'AuthController'
          })
          .state('dashBoard', {
              url: '/dashBoard',
              templateUrl: 'components/dashBoardComponent/dashBoard.html',
              controller: 'DashBoardController'
          });
    }]);