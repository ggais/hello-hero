(function(){
    'use strict';

    angular
        .module('profileModule')
        .factory('profileService', profileService);

    /** @ngInject */
    function profileService(){

        return {
            fn: fn
        };

        function fn(){
            
        }
    }

}());