(function () {
    'use strict';

    angular
        .module('loginController')
        .directive('pwdCompare', pwdCompare);


    /** @ngInject */
    function pwdCompare() {
        function link(scope, element, attrs, ctrl) {
            var myValue = attrs.ngModel;
            var matchToValue = attrs.pwdCompare;

            scope.$watch('[myValue, matchToValue]', function (value) {
                ctrl.$setValidity('pwdCompare', scope[me] === scope[matchTo]);
            });
        }

        return {
            require: ngModel,
            link: link
        };
    }

} ());