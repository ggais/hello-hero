(function(){
    'use strict';

    angular
        .module('profileModule', [])
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());