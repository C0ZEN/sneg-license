/**
 * Generated header by Cozen for sneg-license project
 * Generated file urlProvider.config on WebStorm
 *
 * Created by: Geoffrey "C0ZEN" Testelin
 * Date: 26/09/2017
 * Time: 16:54
 * Version: 1.0.0
 */
(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .config(urlRouterProviderConfig);

    urlRouterProviderConfig.$inject = [
        '$urlRouterProvider',
        'altranConfig'
    ];

    function urlRouterProviderConfig($urlRouterProvider, altranConfig) {
        $urlRouterProvider
            .otherwise('home');
    }

})(window.angular);