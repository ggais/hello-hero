(function () {
    'use strict';

    angular.module('homeModule', [
        'ui.bootstrap',
        'ngAnimate'
    ]);

    angular
        .module('homeModule')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$uibModal'];        

    /** @ngInject */
    function HomeController($uibModal) {
        var vm = this;
        vm.templateUrl = 'components/login/signinDialog.html';
        vm.showLoginForm = showLoginForm;

        init();

        function init() {
        }

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