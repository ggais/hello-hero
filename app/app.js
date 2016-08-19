angular.module('helloHero', [
    'ui.router',
    'loginController',
    'dashBoardController',
    'authService',
    'userService',
    'homeModule',
    'layoutModule',
    'reportModule',
    'profileModule'
])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })
                .state('dashBoard', {
                    url: '/dashBoard',
                    templateUrl: 'components/dashBoard/dashBoard.html',
                    controller: 'DashBoardController'
                })
                .state('report', {
                    url: '/report',
                    templateUrl: 'components/reports/report.html',
                    controller: 'ReportController',
                    controllerAs: 'vm'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'components/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                })
                ;
        }]);

angular.module('helloHero').run(['$state', '$rootScope', 'Auth', appRun]);

function appRun($state, $rootScope, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.name === 'home') {
            if (Auth.isAuth()) {
                event.preventDefault();
                $state.go('profile');
            }

        }
    });
}