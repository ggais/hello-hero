angular.module('helloHero', [
    'ui.router',
    'loginController',
    'dashBoardController',
    'authService',
    'userService',
    'homeModule',
    'layoutModule',
    'reportModule',
    'profileModule',
    'errorModule',
    'wallOfHeroesModule'
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
                .state('recognize', {
                    url: '/recognize',
                    templateUrl: 'components/dashBoard/recognize.html',
                    controller: 'DashBoardController'
                })
                .state('report', {
                    url: '/report',
                    templateUrl: 'components/reports/report.html',
                    controller: 'ReportController',
                    controllerAs: 'vm'
                })
                 .state('report2', {
                    url: '/report2',
                    templateUrl: 'components/reports/report2.html',
                    controller: 'ReportController',
                    controllerAs: 'vm'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'components/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                })
                .state('myRecognition', {
                    url: '/myRecognition',
                    templateUrl: 'components/dashBoard/myRecognition.html',
                    controller: 'DashBoardController',
                    controllerAs: 'vm'
                })
                .state('wallOfHeroes', {
                    url: '/wallOfHeroes',
                    templateUrl: 'components/wallOfHeroes/wallOfHeroes.html',
                    controller: 'WallOfHeroesController',
                    controllerAs: 'vm'
                })
                .state('error', {
                    url: '/error',
                    templateUrl: 'components/error/error.html',
                    controller: 'ErrorController',
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
                $state.go('recognize');
            }

        }
    });

    $rootScope.$on('$stateChangeError', function (event) {
        event.preventDefault();
        $state.go('error');
    });
}