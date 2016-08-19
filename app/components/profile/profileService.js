(function(){
    'use strict';

    angular
        .module('profileModule')
        .profileService('profileService', profileService);

    /** @ngInject */
    function profileService(){

        return {
            fn: fn
        };

        function fn(){
            
        }
    }

}());