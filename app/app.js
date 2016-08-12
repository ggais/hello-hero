angular.module('helloHero', [
'ui.router', 
'loginController',
'dashBoardController',
'authService',
'userService'
])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('home', {
              url: '/',
              templateUrl: 'components/login/signin.html',
              controller: 'LoginController'
          })
          .state('signup', {
              url: '/signup',
              templateUrl: 'components/login/signup.html',
              controller: 'LoginController'
          })
          .state('dashBoard', {
              url: '/dashBoard',
              templateUrl: 'components/dashBoard/dashBoard.html',
              controller: 'DashBoardController'
          });
    }]);