(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url         : '/home',
                templateUrl : 'views/home/home.template.html',
                controller  : 'homeController',
                controllerAs: 'vm'
            });
    }

})(window.angular);
