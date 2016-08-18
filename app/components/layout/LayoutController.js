(function () {
    'use strict';

    angular.module('layoutModule', [
        'ui.bootstrap',
        'ngAnimate'
    ])
    .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$uibModal'];

    /** @ngInject */
    function LayoutController($uibModal) {
        var vm = this;
        vm.templateUrl = 'components/login/signinDialog.html';
        vm.showLoginForm = showLoginForm;

        // init();

        // function init() {
        // }

        function showLoginForm() {
            //Show the modal
            var loginDialog = $uibModal.open({
                templateUrl: vm.templateUrl,
                controller: 'LoginController',
                controllerAs: 'vm'
                //size: 'lg'
            });
        }
    }

} ());