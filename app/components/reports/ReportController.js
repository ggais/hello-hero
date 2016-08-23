(function(){
    'use strict';

    angular
        .module('reportModule', [])
        .controller('ReportController', ReportController);

    /** @ngInject */
    function ReportController(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());