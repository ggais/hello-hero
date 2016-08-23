(function(){
    'use strict';

    angular
        .module('errorModule', [])
        .controller('ErrorController', ErrorController);

    /** @ngInject */
    function ErrorController(){
        var vm = this;
        vm.errorMessage = "Page not found!!!";
        init();

        function init(){
        }

    }

}());