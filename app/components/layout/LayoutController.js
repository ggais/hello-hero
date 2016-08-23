(function () {
    'use strict';

    angular.module('layoutModule', [
        'ui.bootstrap',
        'ngAnimate'
    ])
    .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$uibModal', 'Auth'];

    /** @ngInject */
    function LayoutController($uibModal, Auth) {
        var vm = this;
        vm.templateUrl = 'components/login/signinDialog.html';
        vm.showLoginForm = showLoginForm;
        vm.isLoggedIn = isLoggedIn;
        vm.signOut = signOut;

        function isLoggedIn(){
            return Auth.isAuth();
        }

        function signOut(){
            Auth.signout();   
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