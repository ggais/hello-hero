angular.module('helloHero')

.directive('demoComponent', [function() {
        return {
            restrict: 'A',
            templateUrl: 'components/demoComponent/demoComponent.html'
        };
    }]);