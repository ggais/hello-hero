(function(){
    'use strict';

    angular
        .module('profileModule', [])
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['User', 'Auth'];

    /** @ngInject */
    function ProfileController(User, Auth){
        var vm = this;
        vm.userName = '';
        vm.user = null;
        init();

        function init(){
            vm.userName = Auth.userName();
            loadUser();
        }

        function loadUser(){
           vm.user = User.getUser(vm.userName);
        }
    }

}());